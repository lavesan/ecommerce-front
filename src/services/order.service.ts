import { server } from "@/config/axios.config";
import { IOrderConcludeRequest } from "@/models/IOrderConcludeRequest";
import { IOrderCreateRequest } from "@/models/IOrderCreateRequest";
import { IOrder } from "@/models/entities/IOrder";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@/models/pagination.models";

export class OrderService {
  private static INSTANCE: OrderService;

  async create(body: IOrderCreateRequest): Promise<IOrder> {
    const response = await server.post<IOrder>("/order", body);
    return response.data;
  }

  async conclude(body: IOrderConcludeRequest): Promise<boolean> {
    const response = await server.patch<boolean>("/order/mine/conclude", body);
    return response.data;
  }

  async findById(id: string): Promise<IOrder> {
    const response = await server.get<IOrder>(`/order/mine/${id}`);
    return response.data;
  }

  async paginateMine(
    params: IPaginationRequest
  ): Promise<IPaginationResponse<IOrder>> {
    const response = await server.get<IPaginationResponse<IOrder>>(
      `/order/mine/all`,
      {
        params,
      }
    );
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new OrderService();
    return this.INSTANCE;
  }
}
