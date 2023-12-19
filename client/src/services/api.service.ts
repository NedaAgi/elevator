import axios from "axios";
import { LiftData } from "../types/LiftData.type";
import { LiftCall } from "../types/LiftCall.type";

const BASE_URL = " http://localhost:5000/api/lift";

export class ApiService {
  public static createLiftCall = async (data: LiftCall) => {
    try {
      const response = await axios.post(`${BASE_URL}/call`, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

  public static updateLiftStatus = async (data: LiftData) => {
    try {
      const response = await axios.put(`${BASE_URL}/destination`, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };
}
