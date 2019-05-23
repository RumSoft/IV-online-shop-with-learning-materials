using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Projekcik.Api.Models.DTO
{
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
}