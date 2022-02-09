package com.spring.last.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long>{
	List<Order> findAll();
	
	Order findByOrderId(long id);
	
	 @Query(value = "select * from orders u where u.user_id = ?1", nativeQuery = true)
	List<Order> findAllByUserId(long id);
	 
	 @Query(value = "select * from orders u where u.shipper_id = ?1", nativeQuery = true)
		List<Order> findAllByShipperId(long id);
	 
	 @Query(value ="select * from orders u where u.date_order.getMONTH= ?1",nativeQuery = true)
	 List<Order> findAllByMonth(long id);
	 
}
