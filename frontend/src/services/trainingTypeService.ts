import axiosClient from '../axios/axiosClient';
import type { TrainingType, CreateTrainingTypeRequest } from '../types/TrainingType';

export const getAllTrainingTypes = async (): Promise<TrainingType[]> => {
  const response = await axiosClient.get<TrainingType[]>('/training-types');
  return response.data;
};

export const createTrainingType = async (data: CreateTrainingTypeRequest): Promise<TrainingType> => {
  const response = await axiosClient.post<TrainingType>('/training-types', data);
  return response.data;
};

export const deleteTrainingType = async (id: number): Promise<void> => {
  await axiosClient.delete(`/training-types/${id}`);
};