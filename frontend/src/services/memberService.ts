import axiosClient from '../axios/axiosClient';
import type { Member, CreateMemberRequest } from '../types/Member';

export const getAllMembers = async (): Promise<Member[]> => {
  const response = await axiosClient.get<Member[]>('/members');
  return response.data;
};

export const createMember = async (data: CreateMemberRequest): Promise<Member> => {
  const response = await axiosClient.post<Member>('/members', data);
  return response.data;
};

export const deleteMember = async (id: number): Promise<void> => {
  await axiosClient.delete(`/members/${id}`);
};