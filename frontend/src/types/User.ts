export interface User {
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'MEMBER';
}