package com.spring.last.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.spring.last.dto.CreditCardDTO;
import com.spring.last.dto.MessageResponse;
import com.spring.last.dto.ResponseObject;
import com.spring.last.entities.CreditCard;
import com.spring.last.service.CreditCardService;

@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RestController
@RequestMapping("/api/credit")
public class CreditCardApi {
	@Autowired
	CreditCardService creditCardService;
	
	@GetMapping("/all")
	public List<CreditCard> getAllCreditCard() {	
		List<CreditCard> listCreditCard = creditCardService.getAllCreditCard();
		return listCreditCard;
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public CreditCard getCreditCardById(@PathVariable long id) {	
		CreditCard creditCard = creditCardService.getCreditCardByid(id);
		return creditCard;
	}
	
	@PostMapping("/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> saveCreditCard(@RequestBody CreditCard newCreditCard) {	
		if(creditCardService.check(newCreditCard.getNumberOfCreditCard())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:The Number of credit card is exist!"));
		}
		creditCardService.save(newCreditCard);
		
		return ResponseEntity.ok(new MessageResponse("Create success!"));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject updatedByID(@RequestBody CreditCard newCreditCard,@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		newCreditCard.setId(id);
		CreditCard creditCard = creditCardService.getCreditCardByid(id);
		newCreditCard.setNumberOfCreditCard(creditCard.getNumberOfCreditCard());
		creditCardService.save(newCreditCard);
		ro.setData(newCreditCard);
		ro.setStatus("Update success");
		return ro;
	}
	
	@PutMapping("/buy/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public ResponseEntity<?> buyItem(@PathVariable long id,@RequestBody CreditCardDTO newCreditCard) {
		CreditCard creditCard = creditCardService.getCreditCardByid(id);
		if(newCreditCard.getMonth()!=creditCard.getDate().getMonthValue()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Invalid card!"));
		}
		if(newCreditCard.getYear()!=creditCard.getDate().getYear()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Invalid card!"));
		}
		if(!newCreditCard.getOwnerCredit().equals(creditCard.getOwnerCredit())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Invalid card!"));
		}
		if (newCreditCard.getPrice()>creditCard.getPrice()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Invalid card!"));
		}
		creditCard.setPrice(creditCard.getPrice()-newCreditCard.getPrice());
		creditCardService.save(creditCard);
		return ResponseEntity.ok(new MessageResponse("Buy success!"));
	}
	
	@PutMapping("/add/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public ResponseEntity<?> inputMoney(@PathVariable long id,@RequestBody CreditCard newCreditCard) {
		CreditCard creditCard = creditCardService.getCreditCardByid(id);
		newCreditCard.setNumberOfCreditCard(creditCard.getNumberOfCreditCard());
		newCreditCard.setId(id);
		newCreditCard.setDate(creditCard.getDate());
		newCreditCard.setOwnerCredit(creditCard.getOwnerCredit());
		newCreditCard.setPrice(creditCard.getPrice()+newCreditCard.getPrice());
		creditCardService.save(newCreditCard);
		return ResponseEntity.ok(new MessageResponse("Input money to credit card success!"));
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject deletedById(@PathVariable long id){
		ResponseObject ro = new ResponseObject();
		creditCardService.delete(id);
		ro.setStatus("delete success!");
		return ro;
	}
}
