import autoBind from "auto-bind";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AppError } from "../models/error.model";

class BaseHttpService<T> {
  protected baseURL = "";

  constructor(baseURL = "") {
    this.baseURL = baseURL;
    autoBind(this);
  }

  public async post(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    const data = await this.request(HttpMethod.POST, url, options);
    return data;
  }

  public async get(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    const data = await this.request(HttpMethod.GET, url, options);
    return data;
  }

  public async put(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    const data = await this.request(HttpMethod.PUT, url, options);
    return data;
  }

  public async delete(
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const data = await this.request(HttpMethod.DELETE, url, options);
    return data;
  }

  public async request(
    method: HttpMethod,
    url: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response = await axios.request<T>({
        method,
        baseURL: this.getBaseURL(),
        url,
        ...options,
      });
      return response.data;
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      if (error.response) {
        throw new AppError(error.response.data.message);
      } else {
        throw axiosError;
      }
    }
  }

  protected getBaseURL(): string {
    return "";
  }
}

enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default BaseHttpService;
