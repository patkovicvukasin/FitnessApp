export interface EmployeeReservation {
  id: number;
  memberFirstName: string;
  memberLastName: string;
  trainingSessionId: number;
  reservedAt: string;
}

export interface MemberReservation {
  id: number;
  trainingTypeName: string;
  sessionStartTime: string;
  sessionEndTime: string;
  employeeFirstName: string;
  employeeLastName: string;
  locationName: string;
  reservedAt: string;
}

export interface CreateReservationRequest {
  trainingSessionId: number;
}