import axiosClient from '../axios/axiosClient';
import type { EmployeeReservation, MemberReservation, CreateReservationRequest } from '../types/Reservation';

export const getMyReservations = async (): Promise<MemberReservation[]> => {
  const response = await axiosClient.get<MemberReservation[]>('/reservations/my-reservations');
  return response.data;
};

export const createReservation = async (data: CreateReservationRequest): Promise<MemberReservation> => {
  const response = await axiosClient.post<MemberReservation>('/reservations', data);
  return response.data;
};

export const cancelReservation = async (reservationId: number): Promise<void> => {
  await axiosClient.delete(`/reservations/${reservationId}`);
};

export const getAvailableSlots = async (sessionId: number): Promise<number> => {
  const response = await axiosClient.get<number>(`/reservations/available-slots/${sessionId}`);
  return response.data;
};

export const getReservationsBySession = async (sessionId: number): Promise<EmployeeReservation[]> => {
  const response = await axiosClient.get<EmployeeReservation[]>(`/reservations/by-session/${sessionId}`);
  return response.data;
};