package com.spring.last.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint{
	
	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
		Logger.error("Unauthorized error : {}", authException.getMessage());
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Error: Unautorized");
	}
	
}
