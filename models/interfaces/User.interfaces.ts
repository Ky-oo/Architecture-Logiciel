export interface IUser {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface IUserCreate {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

export interface IUserUpdate {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}
