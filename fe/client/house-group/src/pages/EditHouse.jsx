import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHouseById, updateHouse } from "../apis/axiosConfig";

const EditHouse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState({
    name: "",
    address: "",
    rooms: "",
    price: "",
    imageUrl: "",
    status: "Còn trống",
  });

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await getHouseById(id);
        setHouse(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu nhà", error);
      }
    };
    fetchHouse();
  }, [id]);

  const handleChange = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateHouse(id, house);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi cập nhật nhà", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cập nhật tòa nhà</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => navigate("/")}
      >
        Trở về
      </button>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
  <div>
    <label className="block font-semibold mb-1">Tên nhà</label>
    <input type="text" name="name" placeholder="Nhập tên nhà" className="border p-2 rounded w-full" value={house.name} onChange={handleChange} required />
  </div>

  <div>
    <label className="block font-semibold mb-1">Địa chỉ</label>
    <input type="text" name="address" placeholder="Nhập địa chỉ" className="border p-2 rounded w-full" value={house.address} onChange={handleChange} required />
  </div>

  <div>
    <label className="block font-semibold mb-1">Số phòng</label>
    <input type="number" name="rooms" placeholder="Nhập số phòng" className="border p-2 rounded w-full" value={house.rooms} onChange={handleChange} required />
  </div>

  <div>
    <label className="block font-semibold mb-1">Giá thuê (k/tháng)</label>
    <input type="number" name="price" placeholder="Nhập giá thuê" className="border p-2 rounded w-full" value={house.price} onChange={handleChange} required />
  </div>

  <div>
    <label className="block font-semibold mb-1">Link ảnh</label>
    <input type="text" name="imageUrl" placeholder="Dán link ảnh" className="border p-2 rounded w-full" value={house.imageUrl} onChange={handleChange} required />
  </div>

  <div>
    <label className="block font-semibold mb-1">Trạng thái</label>
    <select name="status" className="border p-2 rounded w-full" value={house.status} onChange={handleChange}>
      <option value="Còn trống">Còn trống</option>
      <option value="Hết phòng">Hết phòng</option>
    </select>
  </div>

  <div className="col-span-2">
    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
      Cập nhật
    </button>
  </div>
</form>
    </div>
  );
};

export default EditHouse;