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

export interface Lesson {
  [index: number]: string;
}

export interface Lessons {
  userId: number;
  visited: Lesson;
  missing: Lesson;
  comming: Lesson;
}

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export interface CalendarDatesList {
  [index: number]: CalendarDate;
}
