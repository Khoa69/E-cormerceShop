package com.spring.last.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.CreditCard;

@Repository
public interface CreditCardRepository extends CrudRepository<CreditCard, Long>{
	List<CreditCard> findAll();
	CreditCard findById(long id);
	
	Boolean existsByNumberOfCreditCard (long numberOfCreditCard);
}
