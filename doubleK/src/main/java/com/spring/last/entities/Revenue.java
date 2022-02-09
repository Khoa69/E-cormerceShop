package com.spring.last.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Revenue {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name="Id")
	private long Id;
	
	private int month;
	
	private int year;
	
	private long totalRevenue;

	public int getMonth() {
		return month;
	}
	
	public int getYear() {
		return year;
	}



	public void setYear(int year) {
		this.year = year;
	}



	public void setMonth(int month) {
		this.month = month;
	}

	public long getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(long totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public Revenue() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public Revenue(long id, int month, long totalRevenue) {
		super();
		Id = id;
		this.month = month;
		this.totalRevenue = totalRevenue;
	}

	
}
