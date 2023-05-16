import { server } from "@/config/axios.config";
import { IProduct } from "@/models/entities/IProduct";

export class ProductService {
  private static INSTANCE: ProductService;

  async findById(id: string): Promise<IProduct> {
    const response = await server.get<IProduct>(`/product/${id}`);
    return response.data;
  }

  async findAll(): Promise<IProduct[]> {
    const response = await server.get<IProduct[]>(`/product`);
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ProductService();
    return this.INSTANCE;
  }
}
