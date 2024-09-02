import ApiHelper from "../../../helper/network/ApiHelper";
import { ModelDetailDoll } from "../../model/ModelDetail/ModelDetailDoll";
import { ModelDetailElectronicToy } from "../../model/ModelDetail/ModelDetailElectronicToy";
import { Toy } from "../../model/ModelToy";
import { ModelDetailPlasticToy } from "../../model/ModelDetail/ModelDetailPlasticToy";

interface ApiResponse<T> {
  message: string;
  data: T;
}

export class ServiceDetail {
  private apiHelper: ApiHelper;

  constructor(baseUrl: string) {
    this.apiHelper = new ApiHelper(baseUrl);
  }

  public async getToyById(
    id: string
  ): Promise<
    Toy | ModelDetailDoll | ModelDetailElectronicToy | ModelDetailPlasticToy
  > {
    try {
      const response = await this.apiHelper.get<ApiResponse<Toy>>(
        `/toys/detail/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Toy not found");
      }
    } catch (error) {
      console.error("Error fetching toy details:", error);
      throw error;
    }
  }
}
