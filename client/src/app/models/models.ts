export interface User {
  id: number;
  login: string;
  password: string;
}

export interface UserInfo {
  userId: number;
  name: string;
  surname: string;
  middleName: string;
  coins: string;
}

export interface Abonemets {
  userId: number;
  startDate: string;
  endDate: string;
}
