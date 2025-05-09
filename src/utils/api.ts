import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:5245/api";

export const validateCode = async (code: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/validate-code`, { code });
    return response.data; // { dealerId, name, themeConfig, sessionToken }
  } catch (error: any) {
    throw new Error(error.response?.data || "Failed to validate code");
  }
};

// ✅ Login with sessionToken
export const login = async (email: string, password: string, sessionToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password, sessionToken });
    return response.data; // { token, dealerId }
  } catch (error: any) {
    throw new Error(error.response?.data || "Login failed");
  }
};

// ✅ Fetch service centers by pin code
export const getServiceCentersByPin = async (pinCode: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/service-centers/by-pin/${pinCode}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service centers.");
  }
};

// ✅ Fetch service types by service center ID
export const getServiceTypesByServiceCenter = async (serviceCenterId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/service-offered/by-service-center/${serviceCenterId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service types.");
  }
};

// ✅ Fetch all vehicles for a user
export const getUserVehicles = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Vehicle/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch vehicles.");
  }
};

// ✅ Fetch a specific vehicle by ID
export const getVehicleById = async (vehicleId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Vehicle/${vehicleId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch vehicle details.");
  }
};

// ✅ Add a new vehicle
export const addVehicle = async (vehicleData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Vehicle`, vehicleData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add vehicle.");
  }
};

// ✅ Update a vehicle
export const updateVehicle = async (vehicleId: number, vehicleData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Vehicle/${vehicleId}`, vehicleData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update vehicle.");
  }
};

// ✅ Delete a vehicle
export const deleteVehicle = async (vehicleId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Vehicle/${vehicleId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete vehicle.");
  }
};
export const bookAppointment = async (appointmentData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/service-appointments`, appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error posting service appointment:', error);
    throw error;
  }
};
export const fetchNotifications = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/notifications/${userId}`);
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: number) => {
  await axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`);
};
export const fetchServiceHistory = async (vehicleId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ServiceHistory/vehicle/${vehicleId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch service history");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching service history:", error);
    return [];
  }
};