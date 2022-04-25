package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.last.dto.ProductDTO;
import com.spring.last.entities.Product;
import com.spring.last.repository.BrandRepository;
import com.spring.last.repository.CategoryRepository;
import com.spring.last.repository.ProductRepository;
import com.spring.last.repository.PromotionRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private BrandRepository brandRepository;

	@Autowired
	private PromotionRepository promotionRepository;
	
	public List<Product> getAllProduct() {
		return productRepository.findAllProduct();
	}
	
	public Page<Product> getPageProduct(long index) {
		int start = (int) (index);
		int number = 10;
		Pageable firstPageWithTwoElements = PageRequest.of(start,number);
		return productRepository.findAll(firstPageWithTwoElements);
	}
	
	
	public Product convertFromProductDto(ProductDTO dto) {
		Product product = new Product();
		product.setProductName(dto.getProductName());
		product.setCpu(dto.getCpu());
		product.setCategory(categoryRepository.findById(dto.getCategoryId()).get());
		product.setBrand(brandRepository.findById(dto.getBrandId()).get());
		product.setPromotion(promotionRepository.findById(dto.getPromotionId()).get());
		product.setPrice(Long.parseLong(dto.getPrice()));
		product.setDescription(dto.getDescription());
		product.setScreen(dto.getScreen());
		product.setRam(dto.getRam());
		product.setQuantity(Integer.parseInt(dto.getQuantity()));
		product.setOperatingSystem(dto.getOperatingSystem());

		return product;
	}
	
	public Product saveProduct(ProductDTO dto) {
		Product product = convertFromProductDto(dto);
		
		
		productRepository.save(product);
		return product;
	}
	public void save (Product pro) {
		productRepository.save(pro);
	}
	public Product updateProduct(Product pro) {
		productRepository.save(pro);
		return pro;
	}
	public void deltedById(long id) {
	
		productRepository.deleteById(id);;

	}
	
	public Product getProductById(long id) {
		return productRepository.findById(id);
	}
}

