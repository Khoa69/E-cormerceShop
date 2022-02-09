<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<style>
	.error{
		color:red;
	}
</style>
</head>
<body>
<h1>Add Product</h1>
<form:form action="doNewProduct" method="POST" modelAttribute="product">
	Name (*) : <form:input path="productName"/> 
		<br/>
	Price (*) : <form:input path="price"/> 
		<br/>
	Quantity (*) : <form:input path="quantity"/> 
		<br/>
	Description (*) : <form:input path="description"/> 
		<br/>
	Screen (*) : <form:input path="screen"/> 
		<br/>
	Operating System (*) : <form:input path="operatingSystem"/> 
		<br/>
	Cpu(*) : <form:input path="cpu"/> 
		<br/>
	Ram (*) : <form:input path="ram"/> 
		<br/>
	image (*) : <form:input path="image"/> 
		<br/>	
	Category : <form:select path="category.id">
					<form:option value="0">----Select Category----</form:option>
			<c:forEach items="${listCategory}" var="item">
				<form:option value="${item.id}">${item.category}</form:option>
			</c:forEach>
		</form:select>			
			<br/>
	Category : <form:select path="category.id">
					<form:option value="0">----Select Category----</form:option>
			<c:forEach items="${listBrand}" var="item">
				<form:option value="${item.id}">${item.brand}</form:option>
			</c:forEach>
		</form:select>			
			<br/>
	<input type="submit" value="submit"/>	
</form:form>
</body>
</html>