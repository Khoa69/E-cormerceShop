package com.spring.last.api;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.last.common.ERole;
import com.spring.last.common.JwtUtils;
import com.spring.last.dto.JwtResponse;
import com.spring.last.dto.LoginRequest;
import com.spring.last.dto.MessageResponse;
import com.spring.last.dto.UserDTO;
import com.spring.last.entities.Role;
import com.spring.last.entities.User;
import com.spring.last.repository.RoleRepository;
import com.spring.last.repository.UserRepository;
import com.spring.last.service.SendEmailService;
import com.spring.last.service.UserDetailsImpl;

@CrossOrigin(origins  = {"http://localhost:3000", "http://localhost:3001","http://localhost:3003"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	SendEmailService sendEmailService;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest){
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Optional<User> user= userRepository.findById(userDetails.getId());
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		JwtResponse newJwtResponse= new JwtResponse();  
		if(user.get().getImageUser()!= null) {
			newJwtResponse= new JwtResponse (jwt, userDetails.getId()
					, userDetails.getUsername(), userDetails.getEmail(), roles,user.get().getImageUser().getPath());
		}
		else {
			newJwtResponse= new JwtResponse (jwt, userDetails.getId()
					, userDetails.getUsername(), userDetails.getEmail(), roles);
		}
		return ResponseEntity.ok(newJwtResponse);
		
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Validated @RequestBody UserDTO signUpRequest){
		if(userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}
		if(userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already taken!"));
		}
		
		User user = new User(signUpRequest.getUsername(),
				
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()),
				signUpRequest.getFullName()
				
				);
		List<Integer> strRoles = signUpRequest.getRoles();
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
		
		user.setRoles(roles);
		userRepository.save(user);
		String message="Create account success full with username: "+ signUpRequest.getUsername();
		sendEmailService.sendEmail(user.getEmail(), message, "doubleK store");
		return ResponseEntity.ok(new MessageResponse("User register successfully!"));
	}
}
