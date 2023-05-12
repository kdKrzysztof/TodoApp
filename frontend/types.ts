export interface receivedTodos {
  userId: number;
  todoId: number;
  title: string;
  desc: string;
  important: boolean;
  createdAt: Date;
  expiresIn: Date;
}

export interface RegisterData {
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  repassword: string | undefined;
}
