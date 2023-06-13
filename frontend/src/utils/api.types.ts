export interface UpdateDesc {
  todoId: number;
  desc: string | undefined;
}

export interface UpdateExpIn {
  todoId: number;
  expiresIn: Date | undefined;
}

export interface UpdateImportant {
  todoId: number;
  important: boolean;
}

export interface UpdateTitle {
  todoId: number;
  title: string | undefined;
}

export interface AddTodo {
  title: string;
  desc: string;
  important: boolean;
  pickedDate: any;
}

export interface LogoutData {
  refreshToken: string | undefined;
}

export interface RegisterData {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export interface LoginData {
  email: string | undefined;
  password: string | undefined;
}
