import { BaseMockService } from "@/mocks/types/IMockService";
import { userMock } from "@/mocks/data/user.mock";
import { IUser } from "@/models/entities/IUser";
import { server } from "@/config/axios.config";
import { IUpdateUserRequest } from "@/models/IUpdateUserRequest";
import { ICreateUserRequest } from "@/models/ICreateUserRequest";

export class UserService extends BaseMockService {
  private static INSTANCE: UserService;
  private mockData: IUser[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...userMock];
    }
  }

  async create(user: ICreateUserRequest): Promise<IUser> {
    if (this.useMock()) {
      const newUser: IUser = {
        id: String(this.mockData.length + 1),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: undefined,
        isAdmin: false,
        ...user,
      };
      this.mockData.push(newUser);
      return newUser;
    }
    const response = await server.post<IUser>(`/users`, user);
    return response.data;
  }

  async update(id: string, user: IUpdateUserRequest): Promise<boolean> {
    if (this.useMock()) {
      const index = this.mockData.findIndex((u) => u.id === id);
      if (index === -1) return false;
      this.mockData[index] = { ...this.mockData[index], ...user };
      return true;
    }
    const response = await server.put<boolean>(`/users/${id}`, user);
    return response.data;
  }

  async delete(id: string): Promise<boolean> {
    if (this.useMock()) {
      const initialLength = this.mockData.length;
      this.mockData = this.mockData.filter((u) => u.id !== id);
      return this.mockData.length !== initialLength;
    }
    const response = await server.delete<boolean>(`/users/${id}`);
    return response.data;
  }

  async findById(id: string): Promise<IUser | null> {
    if (this.useMock()) {
      return this.mockData.find((u) => u.id === id) || null;
    }
    const response = await server.get<IUser>(`/users/${id}`);
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new UserService();
    return this.INSTANCE;
  }
}
