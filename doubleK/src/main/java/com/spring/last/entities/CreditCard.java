package com.spring.last.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class CreditCard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private long numberOfCreditCard;
	
	private long price;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="date")
	private LocalDate date;
	
	private String ownerCredit;
	
	public String getOwnerCredit() {
		return ownerCredit;
	}

	public void setOwnerCredit(String ownerCredit) {
		this.ownerCredit = ownerCredit;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getNumberOfCreditCard() {
		return numberOfCreditCard;
	}

	public void setNumberOfCreditCard(long numberOfCreditCard) {
		this.numberOfCreditCard = numberOfCreditCard;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public CreditCard() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
