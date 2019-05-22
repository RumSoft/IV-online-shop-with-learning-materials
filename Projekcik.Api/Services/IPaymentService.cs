using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using log4net;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Projekcik.Api.Models;

namespace Projekcik.Api.Services
{
    public interface IPaymentService
    {
        string CreateOrder(Note[] notes, User user, string userIpAddress);
        void UpdateTransaction(PayUPaymentService.PaymentStatus status);
        Transaction GetTransactionDetails(Guid transId);

        void CreatePayout(User user, PayUPaymentService.PayoutParameters payoutParameters);
    }

    public class PayUPaymentService : IPaymentService
    {
        private static readonly ILog _log =
            LogManager.GetLogger(typeof(PayUPaymentService));

        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        private readonly INoteService _noteService;

        private readonly string baseUrl;
        private readonly string clientId;
        private readonly string clientSecret;
        private readonly string notifyUrl;
        private readonly string posId;
        private readonly string shopId;
        private string md5;

        public PayUPaymentService(IConfiguration configuration, DataContext context, INoteService noteService)
        {
            _configuration = configuration;
            _context = context;
            _noteService = noteService;
            baseUrl = _configuration["PayU:Url"];
            posId = _configuration["PayU:PosId"];
            clientId = _configuration["PayU:ClientId"];
            shopId = _configuration["PayU:ShopId"];
            clientSecret = _configuration["PayU:ClientSecret"];
            md5 = _configuration["PayU:Md5"];
            notifyUrl = _configuration["PayU:NotifyUrl"];
        }


        public void UpdateTransaction(PaymentStatus status)
        {
            if (!status.Order.Status.Equals("COMPLETED", StringComparison.InvariantCultureIgnoreCase))
                return;

            var transactionId = Guid.Parse(status.Order.ExtOrderId);
            var transaction = _context.Transactions.Find(transactionId);
            if (transaction == null)
                throw new Exception("transaction does not exist");

            // if completed, no more processing
            if (transaction.Status == TransactionStatus.Completed)
                return;

            var orderStatus = status.Order.Status;
            if (orderStatus.Equals("COMPLETED", StringComparison.InvariantCultureIgnoreCase))
                transaction.Status = TransactionStatus.Completed;
            _context.SaveChanges();

            // must be completed here
            if (transaction.Status != TransactionStatus.Completed)
                return;

            var userId = transaction.BuyerId;
            var user = _context.Users.Find(userId);
            if (user == null)
                throw new Exception("user does not exist");

            var noteIds = transaction.OrderedNotesIds.ToArray();
            var notes = _context.Notes.Where(x => noteIds.Contains(x.Id)).ToArray();
            if (!noteIds.Any() && notes.Length != noteIds.Length)
                throw new Exception("invalid notes selected");

            foreach (var note in notes)
                _noteService.Buy(user, note);
            _context.SaveChanges();
        }

        public void CreatePayout(User user, PayoutParameters payoutParameters)
        {
            var authToken = GetAuthToken();
            var request = PreparePayout(user, payoutParameters);
            var result = ProceedPayout(authToken, request);

            if (!result.Status.StatusCode.Equals("SUCCESS", StringComparison.InvariantCultureIgnoreCase))
                throw new Exception("error creating payout",
                    new Exception(JsonConvert.SerializeObject(result.Status)));
        }

        public string CreateOrder(Note[] notes, User user, string userIpAddress)
        {
            var authToken = GetAuthToken();
            var order = PrepareOrder(notes, user, userIpAddress);
            var result = PlaceOrder(authToken, order);

            return result.RedirectUri;
        }

        public Transaction GetTransactionDetails(Guid transId)
        {
            return _context.Transactions.Find(transId);
        }

        private PayoutRequest PreparePayout(User user, PayoutParameters payoutParameters)
        {
            return new PayoutRequest
            {
                Account = new Account {AccountNumber = payoutParameters.AccountNumber},
                CustomerAddress = new CustomerAddress {Name = $"{user.FirstName} {user.LastName}"},
                Payout = new Payout {Amount = ConvertPrice(user.Balance), Description = "Wypłata ze sklepu"},
                ShopId = shopId
            };
        }

        private PayoutResponse ProceedPayout(string authToken, PayoutRequest request)
        {
            var handler = new HttpClientHandler {AllowAutoRedirect = false};
            using (var httpClient = new HttpClient(handler) {BaseAddress = new Uri(baseUrl)})
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("authorization", $"Bearer {authToken}");

                var camelCaseSettings = new JsonSerializerSettings
                    {ContractResolver = new CamelCasePropertyNamesContractResolver()};
                var orderSerialized = JsonConvert.SerializeObject(request, Formatting.None, camelCaseSettings);

                using (var content = new StringContent(orderSerialized, Encoding.UTF8, "application/json"))
                using (var response = httpClient.PostAsync("api/v2_1/payouts/", content).Result)
                {
                    var responseData = response.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<PayoutResponse>(responseData);
                }
            }
        }

        private Order PrepareOrder(Note[] notes, User user, string userIpAddress)
        {
            var transaction = new Transaction
            {
                BuyerId = user.Id,
                OrderedNotesIds = notes.Select(x => x.Id),
                Status = TransactionStatus.New
            };
            _context.Transactions.Add(transaction);
            _context.SaveChanges();

            return new Order
            {
                Buyer = new Buyer
                {
                    Email = user.EmailAddress,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                },
                Description = $"Zakup notatek: {string.Join(", ", notes.Select(x => x.Name))}",
                Products = notes.Select(x => new Product
                {
                    Name = x.Name,
                    Quantity = 1.ToString(),
                    UnitPrice = ConvertPrice(x.Price).ToString()
                }),
                TotalAmount = notes.Sum(x => ConvertPrice(x.Price)).ToString(),
                CustomerIp = userIpAddress,
                MerchantPosId = posId,
                NotifyUrl = notifyUrl,
                ContinueUrl = $"http://localhost:3000/order-details/{transaction.Id}",
                ExtOrderId = transaction.Id.ToString()
            };
        }

        private OrderResponse PlaceOrder(string authToken, Order order)
        {
            var handler = new HttpClientHandler {AllowAutoRedirect = false};
            using (var httpClient = new HttpClient(handler) {BaseAddress = new Uri(baseUrl)})
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("authorization", $"Bearer {authToken}");

                var camelCaseSettings = new JsonSerializerSettings
                    {ContractResolver = new CamelCasePropertyNamesContractResolver()};
                var orderSerialized = JsonConvert.SerializeObject(order, Formatting.None, camelCaseSettings);

                using (var content = new StringContent(orderSerialized, Encoding.UTF8, "application/json"))
                using (var response = httpClient.PostAsync("api/v2_1/orders/", content).Result)
                {
                    var responseData = response.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<OrderResponse>(responseData);
                }
            }
        }

        private string GetAuthToken()
        {
            using (var httpClient = new HttpClient {BaseAddress = new Uri(baseUrl)})
            using (var content = new StringContent(
                $"grant_type=client_credentials&client_id={clientId}&client_secret={clientSecret}",
                Encoding.Default, "application/x-www-form-urlencoded"))
            using (var response = httpClient.PostAsync("pl/standard/user/oauth/authorize", content).Result)
            {
                var responseData = response.Content.ReadAsStringAsync().Result;
                var x = JsonConvert.DeserializeObject<AuthResponse>(responseData);
                return x.AccessToken;
            }
        }

        private int ConvertPrice(decimal x)
        {
            return (int) (x * 100);
        }

        #region model

        public class PayoutParameters
        {
            public string AccountNumber { get; set; }
        }

        public class PayoutRequest
        {
            public string ShopId { get; set; }
            public Payout Payout { get; set; }
            public Account Account { get; set; }
            public CustomerAddress CustomerAddress { get; set; }
        }

        public class Payout
        {
            public int Amount { get; set; }
            public string Description { get; set; }
        }

        public class PayoutResponse
        {
            public Status Status { get; set; }
        }

        public class Account
        {
            public string AccountNumber { get; set; }
        }

        public class CustomerAddress
        {
            public string Name { get; set; }
        }

        public class PaymentStatus
        {
            public Order Order { get; set; }
            public DateTime LocalReceiptDateTime { get; set; }
            public List<Property> Properties { get; set; }
        }

        public class Property
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }

        public class AuthResponse
        {
            [JsonProperty("access_token")] public string AccessToken { get; set; }

            [JsonProperty("token_type")] public string TokenType { get; set; }

            [JsonProperty("expires_in")] public int ExpiresIn { get; set; }

            [JsonProperty("grant_type")] public string GrantType { get; set; }
        }

        public class Product
        {
            public string Name { get; set; }
            public string UnitPrice { get; set; }
            public string Quantity { get; set; }
        }

        public class Buyer
        {
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Language => "pl";
        }

        public class Order
        {
            public string NotifyUrl { get; set; }
            public string CustomerIp { get; set; }
            public string MerchantPosId { get; set; }
            public string Description { get; set; }
            public string CurrencyCode => "PLN";
            public string TotalAmount { get; set; }
            public string ExtOrderId { get; set; }
            public Buyer Buyer { get; set; }
            public string Status { get; set; }
            public string ContinueUrl { get; set; }

            public IEnumerable<Product> Products { get; set; }
        }

        public class Status
        {
            public string StatusCode { get; set; }
            public string Code { get; set; }
            public string Severity { get; set; }
            public string CodeLiteral { get; set; }
            public string StatusDesc { get; set; }
        }

        public class OrderResponse
        {
            public Status Status { get; set; }
            public string RedirectUri { get; set; }
            public string OrderId { get; set; }
            public string ExtOrderId { get; set; }
        }

        #endregion
    }
}