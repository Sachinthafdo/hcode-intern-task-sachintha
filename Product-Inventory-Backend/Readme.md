# Hcode Intern Task: Product INVENTORY BACKEND

This project demonstrates a simple Product Management API using **Spring Boot** and **MySQL**.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Configuration](#configuration)
4. [Entity and DTO Details](#entity-and-dto-details)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Running the Application](#running-the-application)

---

## Prerequisites

- **Java 17 or higher**
- **MySQL Server**
- **Maven**

---

## Database Setup

1. Open your MySQL terminal or any database GUI tool.
2. Create a new database:
   ```sql
   CREATE DATABASE hcode_intern_task_sachintha;
   ```
3. Update the `application.properties` file with your MySQL credentials.

---

## Configuration

Update the configuration file located at `/src/main/resources/application.properties` with the following values:

```properties
server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/hcode_intern_task_sachintha
spring.datasource.username=root
spring.datasource.password=@Adgjmptw2004
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
```

---

## Entity and DTO Details

### **Product Entity**

The `ProductEntity` class includes the following attributes:

- `id` (Primary Key, auto-generated)
- `name` (String)
- `description` (String)
- `price` (Double)
- `quantity` (Long)
- `category` (String)

```java
@Entity
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;
    private Long quantity;
    private String category;
}
```

### **Product DTO**

The `ProductDto` class contains all the fields from the entity except `id`.

Validation checks:

- `name`: Cannot be null or empty.
- `price`: Must be greater than 0.
- `quantity`: Must be greater than or equal to 0.
- `category`: Cannot be null or empty.

---

## API Endpoints

### 1. **Get All Products**

- **Route**: `GET /products`
- **Description**: Retrieves a list of all products.
- **Response**: `200 OK` with product data.

---

### 2. **Get Product by ID**

- **Route**: `GET /products/{id}`
- **Description**: Retrieves product details by ID.
- **Response**:
  - `200 OK` with product data.
  - `404 Not Found` if the product does not exist.

---

### 3. **Add New Product**

- **Route**: `POST /products`
- **Body**: JSON with `ProductDto` fields.
- **Description**: Adds a new product to the database.
- **Response**:
  - `200 OK` on success.
  - `400 Bad Request` if validation fails.

---

### 4. **Update Product by ID**

- **Route**: `PUT /products/{id}`
- **Body**: JSON with `ProductDto` fields.
- **Description**: Updates an existing product.
- **Response**:
  - `200 OK` on success.
  - `400 Bad Request` if validation fails.
  - `404 Not Found` if the product does not exist.

---

### 5. **Reduce Product Quantity**

- **Route**: `PUT /products/reduce/{id}`
- **Params**: `quantity` (Long)
- **Description**: Reduces the quantity of a product.
- **Response**:
  - `200 OK` on success.
  - `400 Bad Request` if the quantity to reduce exceeds available stock.
  - `404 Not Found` if the product does not exist.

---

### 6. **Delete Product by ID**

- **Route**: `DELETE /products/{id}`
- **Description**: Deletes a product by ID.
- **Response**:
  - `200 OK` on success.
  - `404 Not Found` if the product does not exist.

---

### 7. **Filter Products by Category**

- **Route**: `GET /products/filter/category`
- **Params**: `category` (String)
- **Description**: Retrieves products matching the given category.
- **Response**:
  - `200 OK` with filtered data.
  - `400 Bad Request` if the category is invalid.

---

### 8. **Filter Products by Price Range**

- **Route**: `GET /products/filter/price`
- **Params**: `minPrice` (Double), `maxPrice` (Double)
- **Description**: Retrieves products within a price range.
- **Response**:
  - `200 OK` with filtered data.
  - `400 Bad Request` if the price range is invalid.

---

### 9. **Pagination**

- **Route**: `GET /products/page`
- **Params**: `page` (int), `size` (int)
- **Description**: Retrieves paginated product data.
- **Response**:
  - `200 OK` with paginated data.
  - `400 Bad Request` if pagination parameters are invalid.

---

## Error Handling

- **400 Bad Request**: For validation errors or invalid inputs.
- **404 Not Found**: When the product is not found.
- **500 Internal Server Error**: For unexpected errors.
- **Default Error Message**:
  ```json
  {
    "message": "Please sorry! something went wrong."
  }
  ```

---

## Running the Application

1. Clone the repository and navigate to the project directory.
2. Install dependencies using Maven:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
4. The API will be available at `http://localhost:8081`.
