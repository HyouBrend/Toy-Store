import ApiHelper from "../../helper/network/ApiHelper";
import { ModelFilterRequest } from "../model/ModelFilter/ModelFilterRequest";
import { Toy } from "../model/ModelToy";

interface ApiResponse {
  message: string;
  data: Toy[];
}

class ServiceHome {
  private apiHelper: ApiHelper;

  constructor(baseURL: string) {
    this.apiHelper = new ApiHelper(baseURL);
  }

  async filterToys(filterRequest: ModelFilterRequest): Promise<Toy[]> {
    try {
      const response = await this.apiHelper.post<ApiResponse>(
        "/toys/filter",
        filterRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error filtering toys:", error);
      throw error;
    }
  }
  public async deleteToy(id: number): Promise<void> {
    try {
      await this.apiHelper.delete(`/toys/detail/delete/${id}`);
    } catch (error) {
      console.error("Error deleting toy:", error);
      throw error;
    }
  }
  public async createToy(toyData: any): Promise<void> {
    try {
      await this.apiHelper.post("/toys/detail/create", toyData);
    } catch (error) {
      console.error("Error creating toy:", error);
      throw error;
    }
  }
}

export default ServiceHome;
