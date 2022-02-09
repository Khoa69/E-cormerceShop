package com.spring.last.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.last.entities.Revenue;
import com.spring.last.service.RevenueService;

@RestController
@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RequestMapping("api/revenue")
public class RevenueApi {
	@Autowired 
	private RevenueService revenueService;
	
	@GetMapping("/all")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Revenue> getAllRevenue(){
		return revenueService.getAll();
	}
}
