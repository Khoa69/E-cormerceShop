package com.spring.last.api;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.last.dto.ResponseObject;
import com.spring.last.entities.Category;
import com.spring.last.service.CategoryService;
@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RestController
@RequestMapping("api/category")
public class CategoryApi {
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("/all")
	public List<Category> getAllCategory() {
		
		List<Category> listCategory = categoryService.getAllCategory();
		return listCategory;
	}
	
	@PostMapping(value = "/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject newCategory(@RequestBody Category newCategory) {
		ResponseObject ro = new ResponseObject();
		categoryService.save(newCategory);
		ro.setData(newCategory);
		ro.setStatus("Success");
		return ro;
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject deletedCategory(@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		categoryService.deletedById(id);
		ro.setStatus("Deleted success");
		return ro;
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject updatedByID(@RequestBody Category newCategory,@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
			newCategory.setId(id);
				categoryService.save(newCategory);
				ro.setData(newCategory);
				ro.setStatus("success");
		return ro;
	}
}
