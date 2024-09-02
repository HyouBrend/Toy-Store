import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type RequestConfig = AxiosRequestConfig<any>;
type Response<T = any> = AxiosResponse<T>;

class ApiHelper {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  // Fungsi GET untuk mengambil data
  async get<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<Response<T>> {
    try {
      console.log(`Sending GET request to: ${url}`);
      const response = await this.axiosInstance.get<T>(url, config);
      console.log(`Response received:`, response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Fungsi POST untuk mengirim data
  async post<T = any>(
    url: string,
    body: any,
    config?: RequestConfig
  ): Promise<Response<T>> {
    try {
      console.log(`Sending POST request to: ${url} with body:`, body);
      const response = await this.axiosInstance.post<T>(url, body, config);
      console.log(`Response received:`, response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Fungsi PATCH untuk memperbarui data
  async patch<T = any>(
    url: string,
    body: any,
    config?: RequestConfig
  ): Promise<Response<T>> {
    try {
      console.log(`Sending PATCH request to: ${url} with body:`, body);
      const response = await this.axiosInstance.patch<T>(url, body, config);
      console.log(`Response received:`, response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Fungsi DELETE untuk menghapus data
  async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<Response<T>> {
    try {
      console.log(`Sending DELETE request to: ${url}`);
      const response = await this.axiosInstance.delete<T>(url, config);
      console.log(`Response received:`, response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Fungsi untuk mengunduh URI
  async downloadUri<T = any>(
    url: string,
    body: any,
    config?: RequestConfig
  ): Promise<Response<T>> {
    try {
      console.log(`Sending DOWNLOAD request to: ${url} with body:`, body);
      const response = await this.axiosInstance.request<T>({
        url,
        method: "POST", // Assuming POST for download
        responseType: "blob", // Example for file download
        data: body,
        ...config,
      });
      console.log(`Response received:`, response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Fungsi untuk mengambil gambar
  async getImage<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<Response<T>> {
    try {
      console.log(`Sending GET IMAGE request to: ${url}`);
      const response = await this.axiosInstance.get<T>(url, {
        responseType: "blob", // Example for image download
        ...config,
      });
      console.log(`Response received:`, response.data);
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Penanganan kesalahan
  private handleError(error: any): void {
    if (error.response) {
      console.error(`AxiosError: ${error.response.status} - ${error.message}`);
      console.error(`Response data:`, error.response.data);
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
}

export default ApiHelper;
