import React, { useEffect, useState } from "react";
import { getHouses, deleteHouse } from "../apis/axiosConfig";
import HouseCard from "../components/HouseCard";
import AddHouse from "../components/AddHouse";
import { FaSearch } from "react-icons/fa";

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddHouse, setShowAddHouse] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // State để lưu trạng thái sắp xếp
  const recordsPerPage = 3;

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await getHouses();
      setHouses(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu", error);
    }
  };

  const handleDeleteHouse = async (id) => {
    try {
      const response = await deleteHouse(id);
      if (response.status === 200) {
        setHouses((prevHouses) => prevHouses.filter(house => house.id !== id));
      }
    } catch (error) {
      console.error("Lỗi khi xóa nhà", error);
      alert("Không thể xóa tòa nhà này. Vui lòng thử lại!");
    }
  };

  // Lọc danh sách theo tìm kiếm
  const filteredHouses = houses.filter(house =>
    house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp danh sách theo giá
  const sortedHouses = [...filteredHouses].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;  // Giá tăng dần
    if (sortOrder === "desc") return b.price - a.price; // Giá giảm dần
    return 0; // Không sắp xếp nếu không chọn
  });

  // Phân trang
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedHouses.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sortedHouses.length / recordsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trang quản lí thông tin tòa nhà</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowAddHouse(!showAddHouse)}
        >
          {showAddHouse ? "Hủy thêm mới" : "Thêm mới"}
        </button>
      </div>

      {!showAddHouse && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-700">Tổng số tòa nhà: {filteredHouses.length}</p>

          {/* Dropdown chọn sắp xếp */}
          <div className="flex items-center">
            <label className="mr-2 font-medium">Sắp xếp theo:</label>
            <select 
              className="border px-3 py-1 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>

          <div className="flex items-center border p-2 rounded w-1/4">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {showAddHouse ? (
        <AddHouse onClose={() => setShowAddHouse(false)} onAddSuccess={fetchHouses} />
      ) : (
        <>
          <div className="w-3/4 mx-auto">
            <div className="grid grid-cols-5 gap-4 items-center font-semibold text-gray-700">
              <div className="flex justify-center">Hình ảnh</div>
              <div>Tên</div>
              <div>Giá thuê / Địa chỉ</div>
              <div>Trạng thái</div>
            </div>
            <hr className="my-2 border-gray-400" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentRecords.length > 0 ? (
              currentRecords.map((house) => (
                <HouseCard 
                  key={house.id} 
                  house={house} 
                  onDelete={handleDeleteHouse}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Không tìm thấy tòa nhà nào.</p>
            )}
          </div>
        </>
      )}

      {/* Pagination */}
      {!showAddHouse && totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span className="px-4 py-2 border rounded bg-gray-200">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp
          </button>
        </div>
      )}
    </div>
  );
};

export default HouseList;