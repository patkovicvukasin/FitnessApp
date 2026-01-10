import axiosClient from '../axios/axiosClient';
import type { TrainingType } from '../types/TrainingType';

export const getAllTrainingTypes = async (): Promise<TrainingType[]> => {
  const response = await axiosClient.get<TrainingType[]>('/training-types');
  return response.data;
};