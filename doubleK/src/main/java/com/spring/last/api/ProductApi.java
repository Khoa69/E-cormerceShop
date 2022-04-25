package com.spring.last.api;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.last.dto.MessageResponse;
import com.spring.last.dto.ResponseObject;
import com.spring.last.entities.Image;
import com.spring.last.entities.OrderDetail;
import com.spring.last.entities.Product;
import com.spring.last.service.OrderDetailService;
import com.spring.last.service.ProductService;

@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RestController
@RequestMapping("api/product")
public class ProductApi {
	@Autowired
	private ProductService productService;
	
	@Autowired
	private OrderDetailService orderDetailService;
	
	@GetMapping("/all")
	public List<Product> getAllProduct() {	
		List<Product> listProduct = productService.getAllProduct();
		return listProduct;
	}
	
	@GetMapping("/page/{index}")
	public Page<Product> getAllPageProduct(@PathVariable("index") long i) {	
		Page<Product> pageProduct = productService.getPageProduct(i);
		return pageProduct;
	}
	
	@PostMapping(value = "/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject addProduct(@ModelAttribute Product newProduct,HttpServletRequest request) {
		ResponseObject ro = new ResponseObject();
		
		List<Image> listImage = new ArrayList<Image>();
		listImage=saveImageProduct(newProduct, request);
		newProduct.setImagelist(listImage);
		newProduct.setMultipartFile(null);
		productService.save(newProduct);
		ro.setData(newProduct);
		ro.setStatus("success");
		return ro;
	}
	
	@GetMapping("/{id}")
	public Product getProductById(@PathVariable long id) {
		return productService.getProductById(id);
	}
	
	@DeleteMapping("/sortDelete/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> sortDeletedByID(@PathVariable long id,HttpServletRequest request) {
		ResponseObject ro = new ResponseObject();
		Product productByid =productService.getProductById(id);
		productByid.setSortDelete(true);
		productService.save(productByid);
		ro.setStatus("deleted success");
		return ResponseEntity.ok(new MessageResponse("deleted success"));
	}
	
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deletedByID(@PathVariable long id,HttpServletRequest request) {
		ResponseObject ro = new ResponseObject();
		String rootDirectory = request.getServletContext().getRealPath("") +"resources\\images\\";
		Product newProduct=  productService.getProductById(id);
		List<OrderDetail> listOrderDetails = orderDetailService.getAllOrderDetailByid(id);
		if (!listOrderDetails.isEmpty()) {
			return ResponseEntity
			.badRequest()
			.body(new MessageResponse("Error:Cannot Delete because have one order with product"));
		}
		List<Image> listImage = newProduct.getImagelist();
		ro.setData(listImage);
		for (Image image : listImage) {
			String path = rootDirectory+image.getPath();
			File file = new File(path);
			file.delete();
		}
		productService.deltedById(id);
		
		ro.setStatus("deleted success");
		return ResponseEntity.ok(new MessageResponse("deleted success"));
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject updatedByID(@ModelAttribute Product newProduct,@PathVariable long id,HttpServletRequest request) {
		ResponseObject ro = new ResponseObject();
		Product productByid =productService.getProductById(id);
		List<Image> listImage2 = productByid.getImagelist();
				newProduct.setId(id);

				List<Image> listImage = new ArrayList<Image>();
				if(newProduct.getMultipartFile()!=null) {
				listImage=saveImageProduct(newProduct, request);
				}

				if(listImage2 != null) {
				listImage.addAll(listImage2);
				}
				newProduct.setImagelist(listImage);
				newProduct.setMultipartFile(null);
				productService.save(newProduct);
				ro.setData(newProduct);
				ro.setStatus("Update success");
		return ro;
	}
	
	public List<Image> saveImageProduct(Product newProduct,HttpServletRequest request){
		List<Image> listImage = new ArrayList<Image>();
		try {
			String rootDirectory = request.getServletContext().getRealPath("") +"resources\\images\\";
			
			List<MultipartFile> multipartfile = newProduct.getMultipartFile();
			
			Image imageEntity;
			
			for (MultipartFile fi : multipartfile) {
				imageEntity = new Image();
				if(fi.getOriginalFilename().isEmpty()) continue;
				String fileName =String.valueOf(System.currentTimeMillis())+ fi.getOriginalFilename();
				
				String path = rootDirectory+fileName;
				File file = new File(path);
				
				fi.transferTo(file);
				imageEntity.setPath(fileName);
				listImage.add(imageEntity);
				
				}
			
			} 
			catch (Exception e) {
				e.printStackTrace();
			}
		return listImage;
	}
	
}
