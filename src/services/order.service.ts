import { server } from "@/config/axios.config";
import { IOrderConcludeRequest } from "@/models/IOrderConcludeRequest";
import { IOrderCreateRequest } from "@/models/IOrderCreateRequest";
import { IOrder } from "@/models/entities/IOrder";
import {
  IPaginationRequest,
  IPaginationResponse,
} from "@/models/pagination.models";
import { BaseMockService } from "@/mocks/types/IMockService";
import { orderMock } from "@/mocks/data/order.mock";
import { OrderStatus } from "@/enums/OrderStatus.enum";

export class OrderService extends BaseMockService {
  private static INSTANCE: OrderService;
  private mockData: IOrder[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...orderMock];
    }
  }

  async create(body: IOrderCreateRequest): Promise<IOrder> {
    if (this.useMock()) {
      const newOrder: IOrder = {
        id: String(this.mockData.length + 1),
        freightValue: body.freightValue,
        productsValue: body.productsValue,
        paymentType: body.paymentType,
        moneyExchange: 0,
        status: OrderStatus.DOING,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.mockData.push(newOrder);
      return newOrder;
    }
    const response = await server.post<IOrder>("/order", body);
    return response.data;
  }

  async conclude({ orderId }: IOrderConcludeRequest): Promise<boolean> {
    const response = await server.patch<boolean>(
      `/order/mine/conclude/${orderId}`
    );
    return response.data;
  }

  async findById(id: string): Promise<IOrder> {
    if (this.useMock()) {
      const order = this.mockData.find((o) => o.id === id);
      if (!order) throw new Error("Pedido não encontrado");
      return order;
    }
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

  async findAll(): Promise<IOrder[]> {
    if (this.useMock()) {
      return this.mockData;
    }
    const response = await server.get<IOrder[]>("/order/mine/all");
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new OrderService();
    return this.INSTANCE;
  }
}
