# Hcode Intern Task: Product INVENTORY FRONTEND

This project demonstrates a simple Product Management System UI using **React (TypeScript)** and styled with **TailwindCSS**. It allows users to manage products in an inventory, including the ability to add, edit, and delete products. It also provides basic search and filtering functionalities for efficient product management.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Setup and Installation](#setup-and-installation)
- [Types](#types)
- [Components](#components)
- [NPM Scripts](#npm-scripts)
- [Usage](#usage)

---

## Features

- **Product Management:** Add, edit, view and delete products.
- **Category Filter:** Filter products by category.
- **Price Filter:** Filter products based on price range.
- **Search Functionality:** Search products by name.
- **Pagination:** Navigate through pages of products.
- **Responsive Design:** Fully responsive layout for mobile and desktop devices.

---

## Technologies Used

- **React** (with TypeScript)
- **TailwindCSS** for styling
- **Axios** for HTTP requests
- **React Hooks** for managing state and effects

---

## Requirements

- **Node.js v16 or higher**
- **npm v8 or higher**

---

## Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application should now be running at [http://localhost:5173](http://localhost:5173).

---

## Types

The application uses TypeScript for type safety and consistency. All type definitions are located in the src/types.ts file.

---

## Components

The project consists of the following main components:

1. **App**: The root component that includes the `Products` component.
2. **Products**: The main container for handling the state of products, form submission, and search functionality.
3. **ProductForm**: A form for adding and editing products.
4. **ProductsTable**: A table displaying the list of products with options to edit and delete.
5. **Header**: A header component containing the search bar and filter options.

---

## NPM Scripts

Here are the available npm scripts to streamline your development process:

- **Start the development server:**

  ```bash
  npm run dev
  ```

  This runs the app in development mode on [http://localhost:5173](http://localhost:5173).

- **Build the production version:**

  ```bash
  npm run build
  ```

  Generates an optimized production build in the `build/` folder.

- **Lint TypeScript files:**

  ```bash
  npm run lint
  ```

  Runs ESLint to analyze code and highlight any syntax or code style issues.

- **Preview production build locally:**
  ```bash
  npm run preview
  ```
  Serves the production build on a local server to test the deployment-ready app.

---

## Usage

- **Adding Products**: Fill out the form and submit it to add a product to the inventory.
- **Editing Products**: Click the **pencil icon** (✏️) next to a product to load its details into the form for editing.
- **Deleting Products**: Click the **bin icon** (🗑️) next to a product to remove it from the inventory.
- **Pagination**: Navigate between pages using the "Previous" and "Next" buttons.

Ensure the backend server is running to handle requests for products, categories, and filtering. The API endpoints are defined in the `src/pages/Products/index.tsx` file under the `BASE_URL` constant. By default, it is set to `http://localhost:8081`. If you're using a different backend setup, please update the `BASE_URL` to match your server's address.
