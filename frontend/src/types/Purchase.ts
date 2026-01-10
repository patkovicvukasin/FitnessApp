export interface Purchase {
  id: number;
  trainingTypeName: string;
  trainingTypePrice: number;
  totalPrice: number;
  quantity: number;
  remaining: number;
  purchasedAt: string;
}

export interface CreatePurchaseRequest {
  memberId: number;
  trainingTypeId: number;
  quantity: number;
  stripePaymentIntentId: string;
}