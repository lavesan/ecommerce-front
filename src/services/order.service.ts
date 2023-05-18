import { server } from "@/config/axios.config";
import { IOrderCreateRequest } from "@/models/IOrderCreateRequest";
import { IPaginateOrderFilter } from "@/models/IPaginateOrderFilter";
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

  async findById(id: string): Promise<IOrder> {
    const response = await server.get<IOrder>(`/order/${id}`);
    return response.data;
  }

  async paginate(
    params: IPaginationRequest & IPaginateOrderFilter
  ): Promise<IPaginationResponse<IOrder>> {
    const response = await server.get<IPaginationResponse<IOrder>>(`/order`, {
      params,
    });
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new OrderService();
    return this.INSTANCE;
  }
}
