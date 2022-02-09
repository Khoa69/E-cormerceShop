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
import com.spring.last.entities.Promotion;
import com.spring.last.service.PromotionService;

@RestController
@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RequestMapping("api/promotion")
public class PromotionApi {
	@Autowired
	PromotionService promotionService;
	
	@GetMapping("/all")
	public List<Promotion> getAllPromotion(){
		List<Promotion> listPromotion = promotionService.getAllPromotion();
		return listPromotion;
	}
	
	@PostMapping(value = "/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject newCategory(@RequestBody Promotion newPromotion) {
		ResponseObject ro = new ResponseObject();
		promotionService.save(newPromotion);
		ro.setData(newPromotion);
		ro.setStatus("Success");
		return ro;
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject deletedBrand(@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		promotionService.deletedById(id);
		ro.setStatus("Deleted success");
		return ro;
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject updatedByID(@RequestBody Promotion newPromotion,@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		newPromotion.setPromotionId(id);
			promotionService.save(newPromotion);
				ro.setData(newPromotion);
				ro.setStatus("success");
		return ro;
	}
}
