import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:5245/api";

export const getServiceCentersByPin = async (pinCode: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/service-centers/by-pin/${pinCode}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service centers.");
  }
};
