export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  locationName: string;
  locationAddress: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  locationId: number;
  email: string;
  password: string;
}