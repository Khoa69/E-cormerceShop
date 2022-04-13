package com.spring.last.repository;



import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.spring.last.entities.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long>{
	
	@Query(value = "SELECT * FROM product u WHERE u.sort_delete = 0",nativeQuery = true)
	List<Product> findAllProduct();
	
	List<Product> findAll();
	Product findById(long id);
}
