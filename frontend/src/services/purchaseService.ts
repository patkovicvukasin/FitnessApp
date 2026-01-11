import axiosClient from '../axios/axiosClient';
import type { Purchase } from '../types/Purchase';

export const getMyPurchases = async (): Promise<Purchase[]> => {
  const response = await axiosClient.get<Purchase[]>('/purchases/my-purchases');
  return response.data;
};