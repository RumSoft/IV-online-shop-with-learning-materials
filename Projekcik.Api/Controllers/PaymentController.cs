using System;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Projekcik.Api.Helpers;
using Projekcik.Api.Models;
using Projekcik.Api.Services;

namespace Projekcik.Api.Controllers
{
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly INoteService _noteService;
        private readonly IHttpContextAccessor _user;
        private readonly IUserService _userService;
        private readonly IPaymentService _paymentService;
        private readonly DataContext _context;

        private static readonly log4net.ILog _log =
            log4net.LogManager.GetLogger(typeof(UniController));

        public PaymentController(
            IConfiguration configuration,
            INoteService noteService,
            IUserService userService,
            IHttpContextAccessor user,
            IPaymentService paymentService, DataContext context)
        {
            _configuration = configuration;
            _noteService = noteService;
            _userService = userService;
            _user = user;
            _paymentService = paymentService;
            _context = context;
        }

        [Authorize]
        [HttpPost("pay")]
        public IActionResult Pay([FromBody] Guid[] input)
        {
            var userId = _user.GetCurrentUserId();
            var user = _userService.GetById(userId);
            if (user == null)
                return Unauthorized();

            var notes = input?.Select(x => _noteService.GetNoteById(x)).Where(x => x != null).ToArray() ?? new Note[0];
            if (!notes.Any())
                return BadRequest();

            var ipAddress = HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
            if (ipAddress == "0.0.0.1")
                ipAddress = "127.0.0.1";

            try
            {
                _log.Info($"Creating payment link for user: {userId}");
                var redirect = _paymentService.CreateOrder(notes, user, ipAddress);
               return RedirectPreserveMethod(redirect);
            }
            catch (Exception e)
            {
                _log.Warn($"Couldn't create payment link, reason: {e.Message}, inner: {e.InnerException?.Message ?? "none"}\n" +
                          $"userId={userId}, " +
                          $"selectedNotes={string.Join(", ", notes.Select(x => x.Id))}");

                return BadRequest(e);
            }
        }

        [HttpPost("notify")]
        public IActionResult NotifyPaymentStatus([FromBody] object status2)
        {
            _log.Warn("### NOTIFY: ");
            _log.Warn(JsonConvert.SerializeObject(status2));

            var sandboxNotifyAddresses = new[]
            {
                "185.68.14.10",
                "185.68.14.11",
                "185.68.14.12",
                "185.68.14.26",
                "185.68.14.27",
                "185.68.14.28"
            };

            var clientIp = HttpContext.Connection.RemoteIpAddress.MapToIPv4();
            if (!sandboxNotifyAddresses.Select(IPAddress.Parse).Contains(clientIp))
                return StatusCode(418);

            try
            {
                var status = status2 as PayUPaymentService.PaymentStatus;
                _log.Info($"Updating transaction {status.Order.ExtOrderId}, status: {status.Order.Status}");
                _paymentService.UpdateTransaction(status);
            }
            catch (Exception e)
            {
                _log.Warn($"Transaction notify failed, reason: {e.Message}, inner: {e.InnerException?.Message ?? "none"}" +
                          $"\n entity:\n" +
                          $"{JsonConvert.SerializeObject(status2, Formatting.Indented)}");
            }

            return Ok();
        }
    }
}