import APIService from './APIService';

export default class PaymentService {
  static placeOrder(noteIds) {
    return APIService.post('api/payment/pay', noteIds);
  }

  static getOrderDetails(transactionId) {
    return APIService.get(`api/payment/order-details/${transactionId}`);
  }

  static payout(bankAccountNumber) {
    return APIService.post('api/payment/payout/', {
      AccountNumber: bankAccountNumber
    });
  }

  static getPaymentHistory() {
    return APIService.get('api/Payment/paymenthistory');
  }
}
