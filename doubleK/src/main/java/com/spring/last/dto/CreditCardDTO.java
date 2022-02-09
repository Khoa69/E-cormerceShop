package com.spring.last.dto;



public class CreditCardDTO {
	
	private long id;
	
	private long numberOfCreditCard;
	
	private long price;
	
	private String ownerCredit;
	
	private int month;
	
	private int year;

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

	public String getOwnerCredit() {
		return ownerCredit;
	}

	public void setOwnerCredit(String ownerCredit) {
		this.ownerCredit = ownerCredit;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public CreditCardDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreditCardDTO(long id, long numberOfCreditCard, long price, String ownerCredit, int month, int year) {
		super();
		this.id = id;
		this.numberOfCreditCard = numberOfCreditCard;
		this.price = price;
		this.ownerCredit = ownerCredit;
		this.month = month;
		this.year = year;
	}
	
	
}
