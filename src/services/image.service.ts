import { server } from "@/config/axios.config";
import { IGetImageByKeyResponse } from "@/models/IGetImageByKeyResponse";

export class ImageService {
  private static INSTANCE: ImageService;

  async getByKey(key: string): Promise<IGetImageByKeyResponse> {
    const res = await server.get<IGetImageByKeyResponse>(
      `/image/base64/${key}`
    );
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ImageService();
    return this.INSTANCE;
  }
}
