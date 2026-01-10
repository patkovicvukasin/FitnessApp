export interface CreatePaymentIntentRequest {
  trainingTypeId: number;
  quantity: number;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  amount: number;
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  trainingTypeId: number;
  quantity: number;
}