package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.Revenue;
import com.spring.last.repository.RevenueRepository;

@Service
public class RevenueService {
	@Autowired
	private RevenueRepository revenueRepository;
	
	public List<Revenue> getAll(){
		return revenueRepository.findAll();
	}
	
	public Boolean check(int month) {
		return revenueRepository.existsByMonth(month);
	}
	
	public Revenue findByMonth(int month) {
		return revenueRepository.findByMonth(month);
	}
	public void save(Revenue revenue) {
		revenueRepository.save(revenue);
	}
}
