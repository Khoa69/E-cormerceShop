package com.spring.last.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.Brand;
@Repository
public interface BrandRepository extends CrudRepository<Brand, Long>{
	 List<Brand> findAll();
}
