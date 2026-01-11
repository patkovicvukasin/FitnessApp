import axiosClient from '../axios/axiosClient';
import type { TrainingSession, CreateTrainingSessionRequest } from '../types/TrainingSession';

export const getAllTrainingSessions = async (): Promise<TrainingSession[]> => {
  const response = await axiosClient.get<TrainingSession[]>('/training-sessions');
  return response.data;
};

export const getSessionsByTrainingType = async (trainingTypeId: number): Promise<TrainingSession[]> => {
  const response = await axiosClient.get<TrainingSession[]>(`/training-sessions/by-training-type/${trainingTypeId}`);
  return response.data;
};

export const getMyTrainingSessions = async (): Promise<TrainingSession[]> => {
  const response = await axiosClient.get<TrainingSession[]>('/training-sessions/my-sessions');
  return response.data;
};

export const createTrainingSession = async (data: CreateTrainingSessionRequest): Promise<TrainingSession> => {
  const response = await axiosClient.post<TrainingSession>('/training-sessions', data);
  return response.data;
};

export const deleteTrainingSession = async (id: number): Promise<void> => {
  await axiosClient.delete(`/training-sessions/${id}`);
};