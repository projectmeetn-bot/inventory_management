// Import
const fs = require('fs')
const line = require('readline-sync')

// Read Products
function readProducts() {
    let json = fs.readFileSync("./data/products.json", "utf8");
    let products = JSON.parse(json);

    return products;
}

// Save Products and Update JSON file
function saveProducts() {
    let updatedData = JSON.stringify(obj, null, 4);
    fs.writeFileSync("./data/products.json", updatedData);

}

// Add Product
function addProduct() {
    let products = readProducts()

    let id = Number(line.question('Enter Product ID :'));
    let name = line.question('Enter Product Name :').trim();
    let price = Number(line.question('Enter Product Price :'));
    let stock = Number(line.question('Enter Stock :'));

    try {
        // ID Validation
        if (id <= 0) {
            throw Error('Product ID must be greater than 0')
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
            throw Error('Price must be greater than 0')
        }

        // Stock Validation
        if (stock <= 0) {
            throw Error("Stock must be greater than 0.");
        }
        const product = {
            id,
            name,
            price,
            stock
        }

        products.push(product);
        saveProducts(products);
        console.log(`\n✅ Product "${name}" added successfully.`);
    } catch (error) {
        console.log(error.message)
    }

}

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
            // console.log('Add Product')
            addProduct()
            break;

        case 2:
            console.log('viewProducts')
            break;

        case 3:
            console.log('searchProduct')
            break;

        case 4:
            console.log('updateProduct')
            break;

        case 5:
            console.log('deleteProduct')
            break;

        case 6:
            console.log('stockIn')
            break;

        case 7:
            console.log('stockOut')
            break;

        case 8:
            console.log('lowStockReport')
            break;

        case 9:
            console.log('outOfStockReport')
            break;

        case 10:
            console.log('inventoryValue')
            break;

        case 11:
            console.log("\nThank You!");
            break;

        default:
            console.log("\nInvalid Choice!");

    }

} while (choice !== 11);
