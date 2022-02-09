package com.spring.last.api;

import java.util.ArrayList;
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

import com.spring.last.dto.OrderDTO;
import com.spring.last.dto.OrderDetailDTO;
import com.spring.last.dto.ResponseObject;
import com.spring.last.entities.CreditCard;
import com.spring.last.entities.Order;
import com.spring.last.entities.OrderDetail;
import com.spring.last.entities.Product;
import com.spring.last.entities.Revenue;
import com.spring.last.entities.User;
import com.spring.last.repository.UserRepository;
import com.spring.last.service.CreditCardService;
import com.spring.last.service.OrderService;
import com.spring.last.service.ProductService;
import com.spring.last.service.RevenueService;
import com.spring.last.service.SendEmailService;


@RestController
@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RequestMapping("api/order")
public class OrderApi {
	@Autowired
	private OrderService orderService;
	
	@Autowired
	SendEmailService sendEmailService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RevenueService revenueService;
	
	@Autowired
	private CreditCardService creditCardService;
	
	@GetMapping("/all")
//	@PreAuthorize("hasRole('SHIPPER') or hasRole('ADMIN')")
	public List<Order> getAllOrder() {	
		List<Order> listOrder = orderService.getAllOrder();
		return listOrder;
	}
	
	@GetMapping("/{id}")         
//	@PreAuthorize("hasRole('ADMIN')")
	public Order getOrderByid(@PathVariable long id) {	
		Order Order = orderService.getOrderByid(id);
		return Order;
	}
	
	@PostMapping(value = "/save")
	@PreAuthorize("hasRole('USER')")
	public ResponseObject addOrder(@RequestBody OrderDTO newOrder) {
		ResponseObject ro = new ResponseObject();
		List<OrderDetail> listorder = new ArrayList<OrderDetail>();
		List<OrderDetailDTO> listOrder = newOrder.getOrderDetails();
		OrderDetail newOrderDetail ;
		Product product;
		long total=0;
		for (OrderDetailDTO order: listOrder) {
			newOrderDetail = new OrderDetail();
			product= new Product();
			newOrderDetail.setPrice(order.getPrice());
			newOrderDetail.setQuantity(order.getQuantity());
			newOrderDetail.setProduct(productService.getProductById(order.getProductId()));
			product=productService.getProductById(order.getProductId());
			if (product.getQuantity() >= newOrderDetail.getQuantity()) {
				product.setQuantity(product.getQuantity()-newOrderDetail.getQuantity());
				productService.save(product);
			}
			else {
				ro.setStatus("Don't have enough product");
				return ro;
			}
			total+=order.getPrice();
			listorder.add(newOrderDetail);
		}
		User orderUser = userRepository.findById(newOrder.getOrderID());
		if (newOrder.getChecked()==1) {
			String message="Your Account buy order success with total price :"+ total ;
			
			sendEmailService.sendEmail(orderUser.getEmail(), message, "doubleK store");
			int month =newOrder.getDateOrder().getMonthValue();
			Revenue revenue = new Revenue();
			if(revenueService.check(month)) {
				revenue = revenueService.findByMonth(month);
				revenue.setTotalRevenue(revenue.getTotalRevenue()+total);
			}
			else {
				
				revenue.setMonth(month);
				revenue.setTotalRevenue(total);
			}
			revenueService.save(revenue);
			
		}
		
		
		User shipperUser = userRepository.findById(newOrder.getShipperID());
		Order orderNew = new Order(newOrder.getDateOrder(),
								newOrder.getDateReceived(),
								newOrder.getStatus(),
								listorder);
		orderNew.setChecked(newOrder.getChecked());
		orderNew.setOrderUser(orderUser);
		orderNew.setPaymentId(newOrder.getPaymentID());
		orderNew.setShipper(shipperUser);
		
		orderService.save(orderNew);
		ro.setData(newOrder);
		
		ro.setStatus("success");
		return ro;
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public ResponseObject updateOrder(@RequestBody OrderDTO newOrder,@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		Order order = orderService.getOrderByid(id);
		int oldOrder= order.getChecked();
		User shipperUser = userRepository.findById(newOrder.getShipperID());
		order.setShipper(shipperUser);
		order.setChecked(newOrder.getChecked());
		order.setStatus(newOrder.getStatus());
		orderService.save(order);
		if(oldOrder==newOrder.getChecked()) {
			ro.setStatus("Don't have update");
			return ro;
		}
		List<OrderDetail> listorder = order.getOrderDetails();
		long total=0;
		if(newOrder.getChecked()==1) {
		for (OrderDetail orderDetail: listorder) {	
			total+=orderDetail.getPrice();
		}
		int month =order.getDateOrder().getMonthValue();
		Revenue revenue = new Revenue();
		if(revenueService.check(month)) {
			revenue = revenueService.findByMonth(month);
			revenue.setTotalRevenue(revenue.getTotalRevenue()+total);
		}
		else {
			
			revenue.setMonth(month);
			revenue.setTotalRevenue(total);
		}
		revenueService.save(revenue);
		}
		if(newOrder.getChecked()==2&& oldOrder==1) {
			for (OrderDetail orderDetail: listorder) {	
				total+=orderDetail.getPrice();
			}
			int month =order.getDateOrder().getMonthValue();
			Revenue revenue = new Revenue();
			if(revenueService.check(month)) {
				revenue = revenueService.findByMonth(month);
				revenue.setTotalRevenue(revenue.getTotalRevenue()-total);
			}
			else {
				
				revenue.setMonth(month);
				revenue.setTotalRevenue(total);
			}
			revenueService.save(revenue);
			if(order.getPaymentId() !=0) {
			CreditCard creditCard= creditCardService.getCreditCardByid(order.getPaymentId());
			creditCard.setPrice(total+creditCard.getPrice());
			creditCardService.save(creditCard);
			}
			Product product;
			for (OrderDetail orderDetail: listorder) {
				product= new Product();
				product = orderDetail.getProduct();
				product.setQuantity(orderDetail.getQuantity()+product.getQuantity());
				productService.save(product);
			}
			
		}
		else if(newOrder.getChecked()==2) {
			Product product;
			for (OrderDetail orderDetail: listorder) {
				product= new Product();
				product = orderDetail.getProduct();
				product.setQuantity(orderDetail.getQuantity()+product.getQuantity());
				productService.save(product);
			}
		}
		ro.setStatus("Update Success!");
		return ro;
	}
	@GetMapping("/user/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public List<Order> viewOrderid(@PathVariable long id){
		return  orderService.getAllOrderByid(id);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public ResponseObject Deleted(@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		List<OrderDetail> listorder = orderService.getOrderByid(id).getOrderDetails();
		Product product;
		for (OrderDetail order: listorder) {
			product= new Product();
			product = order.getProduct();
			product.setQuantity(order.getQuantity()+product.getQuantity());
			productService.save(product);
		}
		orderService.deletedByid(id);
		ro.setStatus("Deleted Success!");
		return ro;
	}
}

