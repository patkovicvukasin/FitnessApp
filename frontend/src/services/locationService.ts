import axiosClient from '../axios/axiosClient';
import type { Location, CreateLocationRequest } from '../types/Location';

export const getAllLocations = async (): Promise<Location[]> => {
  const response = await axiosClient.get<Location[]>('/locations');
  return response.data;
};

export const createLocation = async (data: CreateLocationRequest): Promise<Location> => {
  const response = await axiosClient.post<Location>('/locations', data);
  return response.data;
};

export const updateLocation = async (id: number, data: CreateLocationRequest): Promise<Location> => {
  const response = await axiosClient.put<Location>(`/locations/${id}`, data);
  return response.data;
};

export const deleteLocation = async (id: number): Promise<void> => {
  await axiosClient.delete(`/locations/${id}`);
};