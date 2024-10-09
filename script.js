let cart = [];
document.getElementById("add-item").addEventListener("click", function() {
    const barcode = document.getElementById("barcode").value;
    if (barcode === '') {
        alert("Please enter or scan a barcode");
        return;
    }
    // Temporary Items Object Meant to be substituted for Real Ones From The Database
    const item = {
        name:  barcode,  
        price: 10.00,  //Dummy Item
        quantity: 1,
        total: 10.00
    };
    cart.push(item);
    document.getElementById("barcode").value = '';
    updateCart();
});
// Function to update the cart table and total price
function updateCart() {
    const cartTable = document.getElementById("cart-items");
    cartTable.innerHTML = "";
    let totalAmount = 0;

    // Loop through the cart items and add rows to the table
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" id="td" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>$${item.total.toFixed(2)}</td>
            <td><button class="remove-item" onclick="removeItem(${index})">Remove</button></td>
        `;

        cartTable.appendChild(row);

        // Calculate total amount
        totalAmount += item.total;
    });

    // Update the total price
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);  // Remove item at the given index
    updateCart();  // Update the cart display
}

// Function to update quantity and total price when quantity is changed
function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    cart[index].total = cart[index].price * cart[index].quantity;
    updateCart();  // Refresh the cart display
}

// Function to clear the cart
document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];  // Clear the cart array
    updateCart();  // Refresh the cart display
});

// Checkout button logic
document.getElementById("checkout").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty");
    } else {
        alert("Proceeding to checkout!");
        // In a real system, this would trigger the payment and checkout process
    }
});
