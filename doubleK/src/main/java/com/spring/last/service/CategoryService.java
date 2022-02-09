package com.spring.last.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.last.entities.Category;
import com.spring.last.repository.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;
	public List<Category> getAllCategory(){
		return categoryRepository.findAll();
	}
	public void save(Category category) {
		categoryRepository.save(category);
	}
	public void deletedById(long id) {
		categoryRepository.deleteById(id);
	}
}
