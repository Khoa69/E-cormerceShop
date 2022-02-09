package com.spring.last.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.OrderDetail;
@Repository
public interface OrderDetailRepository extends CrudRepository<OrderDetail, Long>{
	 @Query(value = "select * from Order_Detail u where u.product_id = ?1", nativeQuery = true)
		List<OrderDetail> findAllByProductId(long id);
}
