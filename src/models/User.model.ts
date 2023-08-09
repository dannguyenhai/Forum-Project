export type UserModel = {
  createdAt: string
  email: string
  fullName: string
  id: string
  phoneNumber: string
  role: string
  token: string
  updatedAt: string
  username: string
}

export enum UserType {
  Normal = 'Normal',
  Admin = 'Admin'
}

export interface DeleteUserParams {
  id: string
}
