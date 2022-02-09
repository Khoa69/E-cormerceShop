package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.Brand;
import com.spring.last.repository.BrandRepository;

@Service
public class BrandService {
	@Autowired
	BrandRepository brandRepository;
	public List<Brand> getAllBrand(){
		return brandRepository.findAll();
	}
	public void save(Brand brand) {
		brandRepository.save(brand);
	}
	
	public void deletedById(long id) {
		brandRepository.deleteById(id);
	}
}
