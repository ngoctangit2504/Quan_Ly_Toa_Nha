import React, { useState } from "react";
import { addHouse } from "../apis/axiosConfig";
const AddHouse = ({ onClose, onAddSuccess }) => {
  const [newHouse, setNewHouse] = useState({
    name: "",
    address: "",
    rooms: "",
    price: "",
    imageUrl: "",
    status: "Còn trống",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHouse(newHouse);
      // Gọi callback để load lại dữ liệu
      onAddSuccess();
      // Đóng form thêm mới
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm nhà", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thêm tòa nhà mới</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Tên nhà</label>
          <input
            type="text"
            placeholder="Nhập tên nhà"
            className="border p-2 rounded w-full"
            value={newHouse.name}
            onChange={(e) =>
              setNewHouse({ ...newHouse, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Địa chỉ</label>
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            className="border p-2 rounded w-full"
            value={newHouse.address}
            onChange={(e) =>
              setNewHouse({ ...newHouse, address: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Số phòng</label>
          <input
            type="number"
            placeholder="Nhập số phòng"
            className="border p-2 rounded w-full"
            value={newHouse.rooms}
            onChange={(e) =>
              setNewHouse({ ...newHouse, rooms: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Giá thuê (k/tháng)</label>
          <input
            type="number"
            placeholder="Nhập giá thuê"
            className="border p-2 rounded w-full"
            value={newHouse.price}
            onChange={(e) =>
              setNewHouse({ ...newHouse, price: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Link ảnh</label>
          <input
            type="text"
            placeholder="Dán link ảnh"
            className="border p-2 rounded w-full"
            value={newHouse.imageUrl}
            onChange={(e) =>
              setNewHouse({ ...newHouse, imageUrl: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Trạng thái</label>
          <select
            className="border p-2 rounded w-full"
            value={newHouse.status}
            onChange={(e) =>
              setNewHouse({ ...newHouse, status: e.target.value })
            }
          >
            <option value="Còn trống">Còn trống</option>
            <option value="Hết phòng">Hết phòng</option>
          </select>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHouse;