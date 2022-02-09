package com.spring.last.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.Promotion;

@Repository
public interface PromotionRepository extends CrudRepository<Promotion,Long>{
	List<Promotion> findAll();
}
