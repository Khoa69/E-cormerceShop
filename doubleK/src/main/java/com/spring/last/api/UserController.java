package com.spring.last.api;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.last.common.ERole;
import com.spring.last.dto.MessageResponse;
import com.spring.last.dto.PasswordDTO;
import com.spring.last.dto.ResponseObject;
import com.spring.last.dto.UserDTO;
import com.spring.last.entities.ImageUser;
import com.spring.last.entities.Order;
import com.spring.last.entities.Role;
import com.spring.last.entities.User;
import com.spring.last.repository.RoleRepository;
import com.spring.last.repository.UserRepository;
import com.spring.last.service.OrderService;
import com.spring.last.service.SendEmailService;


@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	SendEmailService sendEmailService;
	
	@GetMapping("/all")
	//@PreAuthorize("hasRole('ADMIN')")
	public List<User> getAll(){
		return userRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public User getUserByid(@PathVariable long id){
		User user = userRepository.findById(id);
		return  user;
	}
	@GetMapping("/otp/{id}")
	public ResponseObject sendOtp(@PathVariable long id){
		ResponseObject ro = new ResponseObject();
		User user = userRepository.findById(id);
		int otp =(int) Math.floor(((Math.random() * 899999) + 100000));
		
		String message="Your OTP account is: "+  otp;
		
		sendEmailService.sendEmail(user.getEmail(), message, "doubleK store");
		ro.setData(otp);
		return  ro;
	}
	@PutMapping("/forgot")
	public ResponseEntity<?> forgotPassword(@RequestBody  UserDTO user){
		
		
		Optional<User> Newuser= userRepository.findByUsername(user.getUsername());
		
		if(!Newuser.isPresent()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Incorrect username!"));
		}
		
		if(!Newuser.get().getEmail().equals(user.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Incorrect Email!"));
		}
		
		String password =RandomStringUtils.randomAscii(6);
		
		String message="Your new password account "+user.getUsername()+ " is: "+  password;
		Newuser.get().setPassword(encoder.encode(password));
		userRepository.save(Newuser.get());
		sendEmailService.sendEmail(user.getEmail(), message, "doubleK store");
		
		return ResponseEntity.ok(new MessageResponse("Your new password send success"));
	}
	@PostMapping("/save")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseObject createAccount(@ModelAttribute UserDTO newUser,HttpServletRequest request) {
		ResponseObject ro = new ResponseObject();
		User user = new User();
		
		
		User newUserUpdate = new User(newUser.getUsername(),
				newUser.getDateOfBirth(),
				newUser.getPhoneNumber(),
				newUser.getEmail(),
				encoder.encode(newUser.getPassword()),
				newUser.getFullName(),
				newUser.getGender()
				);
		List<Integer> strRoles = newUser.getRoles();
		Set<Role> roles = saveRole(strRoles);
		newUserUpdate.setListOrder(user.getListOrder());

		newUserUpdate.setRoles(roles);
		
		ImageUser image= saveImage(newUser, newUserUpdate, request);
		
		newUserUpdate.setImageUser(image);
		ro.setData(newUserUpdate);
		userRepository.save(newUserUpdate);
		String message="Create account success full with username: "+ newUserUpdate.getUsername() ;
		sendEmailService.sendEmail(newUserUpdate.getEmail(), message, "doubleK store");
		ro.setStatus("Update success");
		return ro;
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public ResponseObject updatedByID(@ModelAttribute UserDTO newUser,@PathVariable long id ,HttpServletRequest request) {
		ResponseObject ro = new ResponseObject();
		User user = userRepository.findById(id);
		
		
		User newUserUpdate = new User(user.getUsername(),
				newUser.getDateOfBirth(),
				newUser.getPhoneNumber(),
				user.getEmail(),
				user.getPassword(),
				newUser.getFullName(),
				newUser.getGender()
				);
		List<Integer> strRoles = newUser.getRoles();
		Set<Role> roles = saveRole(strRoles);
		
		newUserUpdate.setListOrder(user.getListOrder());
		newUserUpdate.setRoles(roles);
		ImageUser image= saveImage(newUser, user, request);
		newUserUpdate.setId(id);
		newUserUpdate.setImageUser(image);
		ro.setData(newUserUpdate);
		userRepository.save(newUserUpdate);
		ro.setStatus("Update success");
		return ro;
	}
	@PutMapping("/password/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('SHIPPER') or hasRole('ADMIN')")
	public ResponseEntity<?> updatedPasswordByID(@RequestBody PasswordDTO passwordDTO,@PathVariable long id ) {
		
		User user = userRepository.findById(id);
		if(!encoder.matches(passwordDTO.getOldPassword(), user.getPassword())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Incorrect Password!"));
		}
		
		User newUserUpdate = new User(user.getUsername(),
				user.getDateOfBirth(),
				user.getPhoneNumber(),
				user.getEmail(),
				encoder.encode(passwordDTO.getNewPassword()),
				user.getFullName(),
				user.getGender()
				);
		newUserUpdate.setListOrder(user.getListOrder());
		newUserUpdate.setId(id);
		newUserUpdate.setRoles(user.getRoles());
		newUserUpdate.setImageUser(user.getImageUser());
		userRepository.save(newUserUpdate);
		
		return ResponseEntity.ok(new MessageResponse("update success"));
	}
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deletedByID(@PathVariable long id) {
		ResponseObject ro = new ResponseObject();
		List<Order> listOrder = orderService.getAllOrderByid(id);
		if (!listOrder.isEmpty()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Cannot Delete because account have order "));
		}
		List<Order> listShipper = orderService.getAllOrderByShipperid(id);
		if (!listShipper.isEmpty()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error:Cannot Delete because account have order to ship"));
		}
		userRepository.deleteById(id);
		ro.setStatus("deleted success");
		return ResponseEntity.ok(new MessageResponse("deleted success"));
	}
	
	public Set<Role> saveRole(List<Integer> strRoles){
		Set<Role> roles = new HashSet<>();
		
		if (strRoles==null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(()-> new RuntimeException("Error:Role is not found."));
			roles.add(userRole);
		}
		else {
			strRoles.forEach(role ->{
				switch (role) {
				case 2:
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error : Role is not found."));
					roles.add(adminRole);
					break;
				case 3:
					Role shipperRole = roleRepository.findByName(ERole.ROLE_SHIPPER)
						.orElseThrow(() -> new RuntimeException("Error : Role is not found."));
					roles.add(shipperRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error : Role is not found."));
					roles.add(userRole);
				}
			});
		}
		return roles;
	}
	public ImageUser saveImage(UserDTO newUser,User user,HttpServletRequest request) {
		ImageUser image= new ImageUser();
		try {
			String rootDirectory = request.getServletContext().getRealPath("") +"resources\\userImages\\";
			
			MultipartFile multipartfile = newUser.getMultipartFile();
			if(multipartfile != null) {
			String fileName =String.valueOf(System.currentTimeMillis())+ multipartfile.getOriginalFilename();
				
			String path = rootDirectory+fileName;
			File file = new File(path);
				
			multipartfile.transferTo(file);
			image.setPath(fileName);	
			}else {
				image = user.getImageUser();
			}
			
			} 
			catch (Exception e) {
				e.printStackTrace();
			}
		return image;
	}
}
