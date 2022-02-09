package com.spring.last.dto;

public class OrderDetailDTO {
	private long productId;
	private int quantity;
	private long price;
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	
	public OrderDetailDTO(long productId, int quantity, long price) {
		super();
		this.productId = productId;
		this.quantity = quantity;
		this.price = price;
	}
	public OrderDetailDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
