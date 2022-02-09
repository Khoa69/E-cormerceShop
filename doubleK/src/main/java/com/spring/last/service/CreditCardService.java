package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.CreditCard;
import com.spring.last.repository.CreditCardRepository;

@Service
public class CreditCardService {
	@Autowired
	private CreditCardRepository creditCardRepository;
	
	public void save (CreditCard newCreditcard) {
		creditCardRepository.save(newCreditcard);
	}
	
	public List<CreditCard> getAllCreditCard () {
		return creditCardRepository.findAll(); 
	}
	
	public Boolean check(long numberOfCreditCard) {
		return creditCardRepository.existsByNumberOfCreditCard(numberOfCreditCard);
	}
	
	public CreditCard getCreditCardByid (long id) {
		return creditCardRepository.findById(id); 
	}
	

	public void delete (long id) {
		creditCardRepository.deleteById(id);
	}
}
