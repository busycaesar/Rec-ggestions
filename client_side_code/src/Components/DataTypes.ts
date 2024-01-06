export interface NewUserData {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password2: string;
}

export interface ValidateUserData {
  userName: string;
  password: string;
}
