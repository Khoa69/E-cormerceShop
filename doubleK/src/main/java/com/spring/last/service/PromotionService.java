package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.Promotion;
import com.spring.last.repository.PromotionRepository;

@Service
public class PromotionService {
	@Autowired
	private PromotionRepository promotionRepository;
	public List<Promotion> getAllPromotion(){
		return promotionRepository.findAll();
	}
	
	public void save(Promotion promotion) {
		promotionRepository.save(promotion);
	}
	
	public void deletedById(long id) {
		promotionRepository.deleteById(id);
	}
}
