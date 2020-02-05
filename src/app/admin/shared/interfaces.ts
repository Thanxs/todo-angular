export interface User {
  email: string;
  password: string;
}

export interface Todo {
  _id?: number;
  user?: string;
  value: string;
  checked?: boolean;
  addedAt?: Date;
  updatedAt?: Date;
  priority: number;
}
