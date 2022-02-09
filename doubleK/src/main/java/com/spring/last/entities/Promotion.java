package com.spring.last.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Promotion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name="promotionId")
	private long promotionId;
	
	@Column(name="Date_beggin")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateBegin;
	
	@Column(name="Date_end")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateEnd;
	
	@JsonIgnore
	@OneToMany(mappedBy = "promotion")
	private List<Product> product;
	
	@Column(name="saleoff")
	private Double saleOff;
	
	@Column(name="content")
	private String content;

	public long getPromotionId() {
		return promotionId;
	}

	public void setPromotionId(long promotionId) {
		this.promotionId = promotionId;
	}

	public LocalDate getDateBegin() {
		return dateBegin;
	}

	public void setDateBegin(LocalDate dateBegin) {
		this.dateBegin = dateBegin;
	}

	public LocalDate getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(LocalDate dateEnd) {
		this.dateEnd = dateEnd;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	public Double getSaleOff() {
		return saleOff;
	}

	public void setSaleOff(Double saleOff) {
		this.saleOff = saleOff;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Promotion() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
