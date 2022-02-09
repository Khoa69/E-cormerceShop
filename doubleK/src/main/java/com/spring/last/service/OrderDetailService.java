package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.OrderDetail;
import com.spring.last.repository.OrderDetailRepository;

@Service
public class OrderDetailService {
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	public List<OrderDetail> getAllOrderDetailByid(long id){
		return orderDetailRepository.findAllByProductId(id);
	}
}
