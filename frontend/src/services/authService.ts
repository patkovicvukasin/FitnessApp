import axiosClient from '../axios/axiosClient';
import type { LoginRequest, LoginResponse, UserInfo } from '../types/Auth';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const getCurrentUser = async (): Promise<UserInfo> => {
  const response = await axiosClient.get<UserInfo>('/auth/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosClient.post('/auth/logout');
};