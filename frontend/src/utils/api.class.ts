import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import type {
  AddTodo,
  LoginData,
  LogoutData,
  RegisterData,
  UpdateDesc,
  UpdateExpIn,
  UpdateImportant,
  UpdateTitle
} from './api.types';

class Api {
  public async updateDesc(data: UpdateDesc) {
    return await axios.patch(`api/todo/updateDesc/${data.todoId}`, data.desc);
  }

  public async updateExpIn(data: UpdateExpIn) {
    return await axios.patch(`api/todo/updateExpIn/${data.todoId}`, data.expiresIn);
  }

  public async updateImportant(data: UpdateImportant) {
    return await axios.patch(`api/todo/updateImportant/${data.todoId}`, data.important);
  }

  public async updateTitle(data: UpdateTitle) {
    return await axios.patch(`api/todo/updateTitle/${data.todoId}`, data.title);
  }

  public async addTodo(data: AddTodo) {
    return await axios.post('api/todo', data);
  }

  public async removeTodo(data: number) {
    return await axios.delete(`api/todo/${data}`);
  }

  public async getTodos(): Promise<AxiosResponse> {
    const token = sessionStorage.getItem('token');

    const config = {
      headers: {
        ['x-access-token']: token
      }
    };

    return await axios.get('api/todo', config);
  }

  public async logout(data: LogoutData) {
    return await axios.post('api/auth/logout', data);
  }

  public async register(data: RegisterData) {
    return await axios.post('api/auth/register', data);
  }

  public async login(data: LoginData) {
    return await axios.post('api/auth/login', data);
  }

  public async getRefreshToken(refToken: string | null) {
    return await axios.post('api/auth/refreshToken', {
      refreshToken: refToken as AxiosRequestConfig<string>
    });
  }
}

const api = new Api();

export default api;