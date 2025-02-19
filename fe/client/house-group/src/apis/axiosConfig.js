import axios from "axios";

const API_URL = "http://localhost:8080/api/houses";

export const getHouses = () => axios.get(API_URL).catch(error => {
    console.error("Lỗi khi lấy danh sách nhà:", error);
  });
  
  export const addHouse = (house) => axios.post(API_URL, house).catch(error => {
    console.error("Lỗi khi thêm nhà:", error);
  });

  export const deleteHouse = (id) => axios.delete(`${API_URL}/${id}`);

  export const updateHouse = (id, house) => axios.put(`${API_URL}/${id}`, house);

  export const getHouseById = (id) => axios.get(`${API_URL}/${id}`);