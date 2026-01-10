export interface TrainingType {
  id: number;
  name: string;
  price: number;
}

export interface CreateTrainingTypeRequest {
  name: string;
  price: number;
}