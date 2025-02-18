package com.housegroup.housegroup.controller;

import com.housegroup.housegroup.entity.House;
import com.housegroup.housegroup.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("/api/houses")
@CrossOrigin("*")
public class HouseController {
    @Autowired
    private HouseService houseService;

    @GetMapping
    public List<House> getAllHouses() {
        return houseService.getAllHouses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<House> getHouseById(@PathVariable Long id) {
        Optional<House> house = houseService.getHouseById(id);
        return house.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public House addHouse(@RequestBody House house) {
        return houseService.saveHouse(house);
    }

    @PutMapping("/{id}")
    public ResponseEntity<House> updateHouse(@PathVariable Long id, @RequestBody House houseDetails) {
        House updatedHouse = houseService.updateHouse(id, houseDetails);
        return updatedHouse != null ? ResponseEntity.ok(updatedHouse) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHouse(@PathVariable Long id) {
        boolean deleted = houseService.deleteHouseById(id);
        if (deleted) {
            return ResponseEntity.ok("Xóa thành công nhà có ID: " + id);
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy nhà có ID: " + id);
        }
    }
}
