package com.housegroup.housegroup.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "houses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private int rooms;
    private double price;
    private String imageUrl;
    private String status; // "Còn trống" hoặc "Đã thuê"
}
