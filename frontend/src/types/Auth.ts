export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'MEMBER';
}