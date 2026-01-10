export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  locationName: string;
  locationAddress: string;
}

export interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  locationId: number;
  email: string;
  password: string;
}