import axiosClient from '../axios/axiosClient';
import type { CreatePaymentIntentRequest, CreatePaymentIntentResponse, ConfirmPaymentRequest } from '../types/Payment';
import type { Purchase } from '../types/Purchase';

export const createPaymentIntent = async (data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> => {
  const response = await axiosClient.post<CreatePaymentIntentResponse>('/payments/create-intent', data);
  return response.data;
};

export const confirmPayment = async (data: ConfirmPaymentRequest): Promise<Purchase> => {
  const response = await axiosClient.post<Purchase>('/payments/confirm', data);
  return response.data;
};