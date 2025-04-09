import { server } from "@/config/axios.config";
import { IProduct } from "@/models/entities/IProduct";
import { BaseMockService } from "@/mocks/types/IMockService";
import { productMock } from "@/mocks/data/product.mock";

export class ProductService extends BaseMockService {
  private static INSTANCE: ProductService;
  private mockData: IProduct[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...productMock];
    }
  }

  async findById(id: string): Promise<IProduct> {
    if (this.useMock()) {
      const product = this.mockData.find((p) => p.id === id);
      if (!product) throw new Error("Produto não encontrado");
      return product;
    }
    const response = await server.get<IProduct>(`/product/${id}`);
    return response.data;
  }

  async findAll(): Promise<IProduct[]> {
    if (this.useMock()) {
      return this.mockData;
    }
    const response = await server.get<IProduct[]>("/product");
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ProductService();
    return this.INSTANCE;
  }
}
