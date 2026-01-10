import axiosClient from '../axios/axiosClient';
import type { Location } from '../types/Location';

export const getAllLocations = async (): Promise<Location[]> => {
  const response = await axiosClient.get<Location[]>('/locations');
  return response.data;
};