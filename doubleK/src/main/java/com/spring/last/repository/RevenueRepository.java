package com.spring.last.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.Revenue;


@Repository
public interface RevenueRepository extends CrudRepository<Revenue,Long>{
	Boolean existsByMonth (int month);
	
	List<Revenue> findAll();
	
	Revenue findByMonth(int month);
}
