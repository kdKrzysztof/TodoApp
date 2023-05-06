export interface receivedTodos {
  userId: number;
  todoId: number;
  title: string;
  desc: string;
  important: boolean;
  createdAt: Date;
  expiresIn: Date;
}
