package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.Order;
import com.spring.last.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;
	
	public List<Order> getAllOrder(){
		return orderRepository.findAll();
	}
	
	public void save (Order order) {
		orderRepository.save(order);
	}
	
	public List<Order> getAllOrderByid(long id){
		return orderRepository.findAllByUserId(id);
	}
	
	public List<Order> getAllOrderByShipperid(long id){
		return orderRepository.findAllByShipperId(id);
	}
	
	public Order getOrderByid(long id){
		return orderRepository.findByOrderId(id);
	}
	
	public void deletedByid (long id) {
		orderRepository.deleteById(id);
	}
}
