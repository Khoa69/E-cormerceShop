package com.spring.last.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name="Orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name="orderId")
	private long orderId;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="dateOrder")
	private LocalDate dateOrder;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name="dateReceived")
	private LocalDate dateReceived;
	
	private String status;
	
	@OneToMany(cascade= CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "order_id")
	private List<OrderDetail> orderDetails;

	@ManyToOne(optional = true)
	@JoinColumn(name = "user_id")
	private User orderUser;

	@ManyToOne(optional = true)
	@JoinColumn(name = "shipper_id")
	private User shipper;	
	
	private int checked;
	
	private int paymentId;

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public Order(long orderId, LocalDate dateOrder, LocalDate dateReceived, String status,
			List<OrderDetail> orderDetails, User orderUser, User shipper, int checked, int idPayment) {
		super();
		this.orderId = orderId;
		this.dateOrder = dateOrder;
		this.dateReceived = dateReceived;
		this.status = status;
		this.orderDetails = orderDetails;
		this.orderUser = orderUser;
		this.shipper = shipper;
		this.checked = checked;
		this.paymentId = idPayment;
	}

	public Order(long orderId, LocalDate dateOrder, LocalDate dateReceived, String status, List<OrderDetail> orderDetails,
			User orderUser, User shipper, int checked) {
		super();
		this.orderId = orderId;
		this.dateOrder = dateOrder;
		this.dateReceived = dateReceived;
		this.status = status;
		this.orderDetails = orderDetails;
		this.orderUser = orderUser;
		this.shipper = shipper;
		this.checked = checked;
	}

	public int getChecked() {
		return checked;
	}

	public void setChecked(int checked) {
		this.checked = checked;
	}

	public Order(LocalDate dateOrder, LocalDate dateReceived, String status, List<OrderDetail> orderDetails) {
		super();
		this.dateOrder = dateOrder;
		this.dateReceived = dateReceived;
		this.status = status;
		this.orderDetails = orderDetails;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public LocalDate getDateOrder() {
		return dateOrder;
	}

	public void setDateOrder(LocalDate dateOrder) {
		this.dateOrder = dateOrder;
	}

	public LocalDate getDateReceived() {
		return dateReceived;
	}

	public void setDateReceived(LocalDate dateReceived) {
		this.dateReceived = dateReceived;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getOrderUser() {
		return orderUser;
	}

	public void setOrderUser(User orderUser) {
		this.orderUser = orderUser;
	}
	
	public User getShipper() {
		return shipper;
	}

	public void setShipper(User shipper) {
		this.shipper = shipper;
	}

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	
}