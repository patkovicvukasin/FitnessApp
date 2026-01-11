import axiosClient from '../axios/axiosClient';
import type { Employee, CreateEmployeeRequest } from '../types/Employee';

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await axiosClient.get<Employee[]>('/employees');
  return response.data;
};

export const createEmployee = async (data: CreateEmployeeRequest): Promise<Employee> => {
  const response = await axiosClient.post<Employee>('/employees', data);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axiosClient.delete(`/employees/${id}`);
};