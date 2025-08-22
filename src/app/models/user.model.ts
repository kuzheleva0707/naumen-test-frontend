export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}


export enum UserStatus {
  active = 'active',
  inactive = 'inactive',
  all = 'all',
}
