import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const HouseCard = ({ house, onDelete, onEdit }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  // Thêm useEffect để đóng dropdown khi popup hiển thị
  useEffect(() => {
    if (showPopup) {
      setShowOptions(false);
    }
  }, [showPopup]);

  // Thêm hàm xử lý click outside để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptions && !event.target.closest('.options-container')) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(house.id);
      setShowPopup(false);
    } catch (error) {
      console.error("Lỗi khi xóa nhà", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-house/${house.id}`);
    setShowOptions(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md w-3/4 mx-auto relative">
      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="flex justify-center">
          <img src={house.imageUrl} alt={house.name} className="w-24 h-24 object-cover rounded-lg"/>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{house.name}</h3>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="text-sm">Số phòng: {house.rooms}</p>
          <p className="text-sm font-bold">{house.price.toLocaleString()} / tháng</p>
          <p className="text-sm text-gray-600">{house.address}</p>
        </div>

        <div>
          <p
            className={`text-sm font-medium ${
              house.status === "Còn trống" ? "text-green-500" : "text-red-500"
            }`}
          >
            {house.status}
          </p>
        </div>

        {/* Nút ba chấm */}
        <div className="relative flex justify-center options-container">
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions(!showOptions);
            }}
          >
            <FaEllipsisV className="text-gray-600" />
          </button>

          {/* Dropdown menu */}
          {showOptions && (
            <div className="absolute right-0 top-10 bg-white shadow-md rounded-lg w-32 z-20">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleEdit}>Sửa</button>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={() => {
                  setShowPopup(true);
                  setShowOptions(false);
                }}
              >
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popup xác nhận xóa */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-2">Xác nhận xóa</h2>
            <p>Bạn có chắc muốn xóa <strong>{house.name}</strong> không?</p>
            <div className="mt-4 flex gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 disabled:opacity-50" onClick={() => setShowPopup(false)}disabled={isDeleting}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseCard;