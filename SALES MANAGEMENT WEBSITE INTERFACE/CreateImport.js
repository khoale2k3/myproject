// Sample product database (in a real application, this would come from a backend)
const productDatabase = [
    {
        code: 'SP000005',
        name: 'Laptop Xiaomi Mi Notebook Pro 15.6inch i5 8G (Xám)',
        category: 'computer',
        price: 22000000
    },
    {
        code: 'SP000006',
        name: 'iPhone 13 Pro Max 256GB',
        category: 'smartphone',
        price: 28990000
    },
    {
        code: 'SP000007',
        name: 'Samsung Galaxy S21 Ultra 512GB',
        category: 'smartphone',
        price: 26990000
    },
    {
        code: 'SP000008',
        name: 'Macbook Pro 16-inch M1 Pro 16GB',
        category: 'computer',
        price: 52990000
    }
];

// Product List View Class
class ProductListView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.products = [];
    }

    // Add a product to the list
    addProduct(product, quantity, importPrice) {
        // Check if product already exists
        const existingProduct = this.products.find(p => p.code === product.code);

        if (existingProduct) {
            // Update quantity and import price of existing product
            existingProduct.quantity += quantity;
            existingProduct.importPrice = importPrice;
        } else {
            // Add new product with import price
            this.products.push({
                ...product,
                quantity: quantity,
                importPrice: importPrice
            });
        }

        this.render();
        this.updateTotals();
    }

    // Remove a product from the list
    removeProduct(productCode) {
        this.products = this.products.filter(p => p.code !== productCode);
        this.render();
        this.updateTotals();
    }

    // Update quantity of a product
    updateProductQuantity(productCode, quantity) {
        const product = this.products.find(p => p.code === productCode);
        if (product) {
            product.quantity = quantity;
            this.render();
            this.updateTotals();
        }
    }

    // Render the list view
    render() {
        // Clear existing content
        this.container.innerHTML = '';

        // Render each product
        this.products.forEach((product, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <div class="flex-grow-1">
                    <h6 class="my-0">${product.name}</h6>
                    <small class="text-muted">${product.code}</small>
                </div>
                <div class="d-flex align-items-center">
                    <input type="number" 
                           class="form-control form-control-sm quantity-input me-2" 
                           style="width: 70px;" 
                           value="${product.quantity}" 
                           min="1"
                           data-product-code="${product.code}">
                    <input type="text" 
                           class="form-control form-control-sm import-price-input me-2" 
                           style="width: 100px;" 
                           value="${formatCurrency(product.importPrice)}" 
                           data-product-code="${product.code}">
                    <span class="badge bg-primary rounded-pill me-2">
                        ${formatCurrency(product.importPrice * product.quantity)}
                    </span>
                    <button class="btn btn-sm btn-danger remove-product" 
                            data-product-code="${product.code}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            // Add event listeners
            const quantityInput = listItem.querySelector('.quantity-input');
            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                this.updateProductQuantity(product.code, newQuantity);
            });

            const importPriceInput = listItem.querySelector('.import-price-input');
            importPriceInput.addEventListener('change', (e) => {
                const rawValue = e.target.value.replace(/[^\d]/g, '');
                const newImportPrice = parseFloat(rawValue);
                const productToUpdate = this.products.find(p => p.code === product.code);
                if (productToUpdate) {
                    productToUpdate.importPrice = newImportPrice;
                    e.target.value = formatCurrency(newImportPrice);
                    this.render();
                    this.updateTotals();
                }
            });

            const removeButton = listItem.querySelector('.remove-product');
            removeButton.addEventListener('click', () => {
                this.removeProduct(product.code);
            });

            this.container.appendChild(listItem);
        });
    }

    // Update order totals
    updateTotals() {
        const tienHangInput = document.getElementById('tien-hang');
        const tongCongInput = document.getElementById('tong-cong');
        const chietKhauInput = document.getElementById('chiet-khau');
        const thanhToanInput = document.getElementById('Thanh-toan');
        const ConnoInput = document.getElementById('Con-no');

        // Calculate total amount based on import price
        const totalAmount = this.products.reduce((total, product) => 
            total + (product.importPrice * product.quantity), 0);

        const discountAmount = parseFloat(chietKhauInput.value.replace(/[^\d]/g, '')) || 0;
        const totalAfterDiscount = totalAmount - discountAmount;

        tienHangInput.value = formatCurrency(totalAmount);
        tongCongInput.value = formatCurrency(totalAfterDiscount);
        thanhToanInput.value = formatCurrency(totalAfterDiscount);
        ConnoInput.value = formatCurrency(0);
    }
}

// Function to search products
function searchProducts(query) {
    query = query.toLowerCase().trim();
    return productDatabase.filter(product => 
        product.code.toLowerCase().includes(query) || 
        product.name.toLowerCase().includes(query)
    );
}

// Function to create product search results
function displaySearchResults(products) {
    const searchResultsContainer = document.getElementById('search-results');
    
    // If no query, show initial message
    if (!products.length) {
        searchResultsContainer.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted">
                    Gõ mã hoặc tên sản phẩm vào hộp tìm kiếm để thêm hàng vào đơn hàng
                </td>
            </tr>
        `;
        return;
    }

    // Clear previous results
    searchResultsContainer.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>
                <input type="number" class="form-control quantity-input" 
                       value="1" min="1" 
                       data-product-code="${product.code}">
            </td>
            <td>
                <input type="text" class="form-control import-price-input" 
                       value="${formatCurrency(product.price)}" 
                       data-product-code="${product.code}">
            </td>
            <td class="total-price">${formatCurrency(product.price)}</td>
            <td>
                <button class="btn btn-sm btn-success add-to-order" 
                        data-product-code="${product.code}">
                    <i class="fas fa-plus"></i>
                </button>
            </td>
        `;
        searchResultsContainer.appendChild(row);
    });

    // Add event listeners for import price and quantity
    document.querySelectorAll('.import-price-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const rawValue = e.target.value.replace(/[^\d]/g, '');
            const importPrice = parseFloat(rawValue);
            const row = e.target.closest('tr');
            const quantityInput = row.querySelector('.quantity-input');
            const totalPriceCell = row.querySelector('.total-price');
            const quantity = parseInt(quantityInput.value);
            
            // Format the input as currency
            e.target.value = formatCurrency(importPrice);
            
            // Update total price
            const totalPrice = importPrice * quantity;
            totalPriceCell.textContent = formatCurrency(totalPrice);
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const row = e.target.closest('tr');
            const importPriceInput = row.querySelector('.import-price-input');
            const totalPriceCell = row.querySelector('.total-price');
            
            const rawImportPrice = importPriceInput.value.replace(/[^\d]/g, '');
            const importPrice = parseFloat(rawImportPrice);
            const quantity = parseInt(e.target.value);
            
            // Update total price
            const totalPrice = importPrice * quantity;
            totalPriceCell.textContent = formatCurrency(totalPrice);
        });
    });

    // Add event listeners for adding to order
    attachProductEventListeners();
}

// Format currency function
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(amount);
}

// Function to add event listeners to product rows
function attachProductEventListeners() {
    // Add to order button event
    document.querySelectorAll('.add-to-order').forEach(button => {
        button.addEventListener('click', addProductToOrder);
    });
}

// Function to add product to order list
function addProductToOrder(event) {
    const button = event.target.closest('.add-to-order');
    const productCode = button.dataset.productCode;
    const product = productDatabase.find(p => p.code === productCode);
    
    if (product) {
        const quantity = parseInt(button.closest('tr').querySelector('.quantity-input').value);
        const importPriceInput = button.closest('tr').querySelector('.import-price-input');
        const rawImportPrice = importPriceInput.value.replace(/[^\d]/g, '');
        const importPrice = parseFloat(rawImportPrice);
        
        productListView.addProduct(product, quantity, importPrice);
    }
}

// Initialize the Product List View
let productListView;

// Event listener for product search and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ListView
    productListView = new ProductListView('order-table-body');

    const searchInput = document.getElementById('product-search-input');
    const searchResultsContainer = document.getElementById('search-results');

    // Reset to initial state when input is empty
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        
        // If query is empty, show initial message
        if (query.trim() === '') {
            searchResultsContainer.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        Gõ mã hoặc tên sản phẩm vào hộp tìm kiếm để thêm hàng vào đơn hàng
                    </td>
                </tr>
            `;
            return;
        }

        // Search and display results
        const results = searchProducts(query);
        displaySearchResults(results);
    });

    // Discount input event listener
    document.getElementById('chiet-khau').addEventListener('change', () => {
        productListView.updateTotals();
    });
});