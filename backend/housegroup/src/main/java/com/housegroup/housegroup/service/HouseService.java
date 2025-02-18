package com.housegroup.housegroup.service;

import com.housegroup.housegroup.entity.House;
import com.housegroup.housegroup.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseService {
    @Autowired
    private HouseRepository houseRepository;

    public List<House> getAllHouses() {
        return houseRepository.findAll();
    }

    public Optional<House> getHouseById(Long id) {  // 🔥 Lấy nhà theo ID
        return houseRepository.findById(id);
    }

    public House saveHouse(House house) {
        return houseRepository.save(house);
    }

    public House updateHouse(Long id, House houseDetails) {  // 🔥 Cập nhật nhà
        return houseRepository.findById(id).map(house -> {
            house.setName(houseDetails.getName());
            house.setRooms(houseDetails.getRooms());
            house.setPrice(houseDetails.getPrice());
            house.setAddress(houseDetails.getAddress());
            house.setStatus(houseDetails.getStatus());
            house.setImageUrl(houseDetails.getImageUrl());
            return houseRepository.save(house);
        }).orElse(null);
    }

    public boolean deleteHouseById(Long id) {
        Optional<House> house = houseRepository.findById(id);
        if (house.isPresent()) {
            houseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
