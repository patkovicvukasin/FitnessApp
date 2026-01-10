export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface CreateLocationRequest {
  name: string;
  address: string;
}