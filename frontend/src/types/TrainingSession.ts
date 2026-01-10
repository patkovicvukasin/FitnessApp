export interface TrainingSession {
  id: number;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  locationName: string;
  locationAddress: string;
  trainingTypeName: string;
  employeeFirstName: string;
  employeeLastName: string;
  availableSlots: number;
}

export interface CreateTrainingSessionRequest {
  startTime: string;
  endTime: string;
  maxCapacity: number;
  locationId: number;
  trainingTypeId: number;
  employeeId: number;
}