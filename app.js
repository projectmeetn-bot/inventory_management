// ===============================
// Inventory Management System
// ===============================

// Import Modules
const fs = require("fs");
const line = require("readline-sync");

// File Path
const PRODUCT_FILE = "./data/products.json";

// ===============================
// Read Products
// ===============================
function readProducts() {
    let json = fs.readFileSync(PRODUCT_FILE, "utf8");
    return JSON.parse(json);
}

// ===============================
// Save Products
// ===============================
function saveProducts(products) {
    let updatedData = JSON.stringify(products, null, 4);
    fs.writeFileSync(PRODUCT_FILE, updatedData);
}

// ===============================
// Add Product
// ===============================
function addProduct() {

    try {

        // Read Existing Products
        let products = readProducts();

        // User Input
        let id = Number(line.question("Enter Product ID : "));
        let name = line.question("Enter Product Name : ").trim();
        let price = Number(line.question("Enter Product Price : "));
        let stock = Number(line.question("Enter Product Stock : "));

        // ===============================
        // Validations
        // ===============================

        // Number Validation
        if (Number.isNaN(id)) {
            throw Error("Product ID must be a valid number.");
        }

        if (Number.isNaN(price)) {
            throw Error("Price must be a valid number.");
        }

        if (Number.isNaN(stock)) {
            throw Error("Stock must be a valid number.");
        }

        // ID Validation
        if (id <= 0) {
            throw Error("Product ID must be greater than 0.");
        }

        // Duplicate ID Validation
        let existingProduct = products.find((product) => {
            return product.id === id;
        });

        if (existingProduct) {
            throw Error("Product ID already exists.");
        }

        // Name Validation
        if (name === "") {
            throw Error("Product name cannot be empty.");
        }

        // Price Validation
        if (price <= 0) {
            throw Error("Price must be greater than 0.");
        }

        // Stock Validation
        if (stock <= 0) {
            throw Error("Stock must be greater than 0.");
        }

        // Create Product Object
        const product = {
            id,
            name,
            price,
            stock
        };

        // Add Product
        products.push(product);

        // Save Updated Products
        saveProducts(products);

        // Success Message
        console.log("\n=================================");
        console.log("✅ Product Added Successfully");
        console.log("=================================");
        console.log(`ID    : ${id}`);
        console.log(`Name  : ${name}`);
        console.log(`Price : ${price}`);
        console.log(`Stock : ${stock}`);

    } catch (error) {

        console.log("\n❌ Error:", error.message);

    }

}

function viewProducts() {

    let products = readProducts();

    if (products.length === 0) {
        console.log("\n❌ No products available.");
        return;
    }

    console.log("\n========== PRODUCT LIST ==========\n");

    console.table(products);

}

function searchProduct() {

    try {

        // Read Products
        let products = readProducts();

        // Take Product ID
        let id = Number(line.question("Enter Product ID : "));

        // Search Product
        let product = products.find((product) => {
            return product.id === id;
        });

        // Product Not Found
        if (!product) {
            throw Error("Product not found.");
        }

        // Display Product
        console.log("\n========== PRODUCT DETAILS ==========\n");
        console.log(`ID    : ${product.id}`);
        console.log(`Name  : ${product.name}`);
        console.log(`Price : ${product.price}`);
        console.log(`Stock : ${product.stock}`);

    }
    catch (error) {
        console.log("\n❌", error.message);
    }

}

function updateProduct() {

    try {

        // Read Products
        let products = readProducts();

        // Take Product ID
        let id = Number(line.question("Enter Product ID : "));

        // Find Product
        let product = products.find((product) => {
            return product.id === id;
        });

        // Product Not Found
        if (!product) {
            throw Error("Product not found.");
        }

        // Display Current Product
        console.log("\n========== CURRENT PRODUCT ==========");
        console.log(`ID    : ${product.id}`);
        console.log(`Name  : ${product.name}`);
        console.log(`Price : ${product.price}`);
        console.log(`Stock : ${product.stock}`);
        console.log("=====================================\n");

        // Take New Details
        let newName = line.question("Enter New Product Name : ").trim();
        let newPrice = Number(line.question("Enter New Product Price : "));
        let newStock = Number(line.question("Enter New Product Stock : "));

        // ===============================
        // Validations
        // ===============================

        // Number Validation
        if (Number.isNaN(newPrice)) {
            throw Error("Price must be a valid number.");
        }

        if (Number.isNaN(newStock)) {
            throw Error("Stock must be a valid number.");
        }

        // Name Validation
        if (newName === "") {
            throw Error("Product name cannot be empty.");
        }

        // Price Validation
        if (newPrice <= 0) {
            throw Error("Price must be greater than 0.");
        }

        // Stock Validation
        if (newStock <= 0) {
            throw Error("Stock must be greater than 0.");
        }

        // ===============================
        // Update Product
        // ===============================

        product.name = newName;
        product.price = newPrice;
        product.stock = newStock;

        // Save Updated Products
        saveProducts(products);

        // Success Message
        console.log("\n=====================================");
        console.log("✅ Product Updated Successfully");
        console.log("=====================================");
        console.log(`ID    : ${product.id}`);
        console.log(`Name  : ${product.name}`);
        console.log(`Price : ${product.price}`);
        console.log(`Stock : ${product.stock}`);

    } catch (error) {

        console.log("\n❌", error.message);

    }

}

// ===============================
// Delete Product
// ===============================
function deleteProduct() {

    try {

        // Read Products
        let products = readProducts();

        // Take Product ID
        let id = Number(line.question("Enter Product ID : "));

        // Find Product
        let product = products.find((product) => {
            return product.id === id;
        });

        // Product Not Found
        if (!product) {
            throw Error("Product not found.");
        }

        // Find Product Index
        let index = products.findIndex((product) => {
            return product.id === id;
        });

        // Delete Product
        products.splice(index, 1);

        // Save Updated Products
        saveProducts(products);

        // Success Message
        console.log("\n=====================================");
        console.log("✅ Product Deleted Successfully");
        console.log("=====================================");
        console.log(`Deleted Product ID   : ${product.id}`);
        console.log(`Deleted Product Name : ${product.name}`);

    } catch (error) {

        console.log("\n❌", error.message);

    }

}

// ===============================
// Main Menu
// ===============================

let choice;

do {

    console.log("\n======================================");
    console.log("      INVENTORY MANAGEMENT SYSTEM");
    console.log("======================================");
    console.log("1. Add Product");
    console.log("2. View Products");
    console.log("3. Search Product");
    console.log("4. Update Product");
    console.log("5. Delete Product");
    console.log("6. Stock In");
    console.log("7. Stock Out");
    console.log("8. Low Stock Report");
    console.log("9. Out Of Stock Report");
    console.log("10. Inventory Value");
    console.log("11. Exit");

    choice = Number(line.question("\nEnter Choice : "));

    switch (choice) {

        case 1:
            addProduct();
            break;

        case 2:
            viewProducts()
            break;

        case 3:
            searchProduct()
            break;

        case 4:
            updateProduct()
            break;

        case 5:
            deleteProduct()
            break;

        case 6:
            console.log("Stock In");
            break;

        case 7:
            console.log("Stock Out");
            break;

        case 8:
            console.log("Low Stock Report");
            break;

        case 9:
            console.log("Out Of Stock Report");
            break;

        case 10:
            console.log("Inventory Value");
            break;

        case 11:
            console.log("\n👋 Thank You!");
            break;

        default:
            console.log("\n❌ Invalid Choice!");
    }

} while (choice !== 11);