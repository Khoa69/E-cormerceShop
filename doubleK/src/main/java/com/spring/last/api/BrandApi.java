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
import com.spring.last.entities.Brand;
import com.spring.last.service.BrandService;

@RestController
@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RequestMapping("api/brand")
public class BrandApi {
	
	@Autowired
	BrandService brandService;
	
	@GetMapping("/all")
	public List<Brand> getAllBrand() {
		
		List<Brand> listBrand = brandService.getAllBrand();
		return listBrand;
	}
	
	@PostMapping(value = "/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject newBrand(@RequestBody Brand newBrand) {
		ResponseObject ro = new ResponseObject();
		brandService.save(newBrand);
		ro.setData(newBrand);
		ro.setStatus("Success");
		return ro;
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject deletedBrand(@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		brandService.deletedById(id);
		ro.setStatus("Deleted success");
		return ro;
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject updatedByID(@RequestBody Brand newBrand,@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		newBrand.setId(id);
			brandService.save(newBrand);
				ro.setData(newBrand);
				ro.setStatus("success");
		return ro;
	}
}
