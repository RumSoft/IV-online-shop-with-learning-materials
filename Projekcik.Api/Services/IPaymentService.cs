using System;
using System.Linq;
using Projekcik.Api.Models;
using Projekcik.Api.Models.DTO;

namespace Projekcik.Api.Services
{
    // this interface is made for PayU implementation
    // this would need refactoring in case of extending with other payment service providers
    // what wouldn't happen in this project

    public interface IPaymentService
    {
        string CreateOrder(Note[] notes, User user, string userIpAddress);
        void UpdateTransaction(PaymentStatus status);
        Transaction GetTransactionDetails(Guid transId);
        IQueryable<Transaction> GetTransactionsByBuyerId(Guid userId);
        void CreatePayout(User user, PayoutParameters payoutParameters);
    }
}