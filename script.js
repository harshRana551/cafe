const cart = [];

// Format amounts in Indian Rupees
function formatPrice(amount) {
    return amount.toLocaleString("en-IN");
}

// Add menu items to the cart
document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
                
            });
        }

        renderCart();

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "+ Add";
        }, 900);
    });
});

// Show the cart and total
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        cartContainer.textContent = "Your cart is empty.";
        totalElement.textContent = "0";
        return;
    }

    cartContainer.replaceChildren();

    cart.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "cart-row";

        const name = document.createElement("span");
        name.textContent =
            `${item.name} × ${item.quantity}`;

        const price = document.createElement("strong");
        price.textContent =
            "₹" + formatPrice(item.price * item.quantity);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute(
            "aria-label",
            `Remove ${item.name} from cart`
        );

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        row.append(name, price, removeButton);
        cartContainer.appendChild(row);
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    totalElement.textContent = formatPrice(total);
}

// Filter menu categories
document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        document.querySelectorAll(".filter").forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        document.querySelectorAll(".menu-card").forEach(card => {
            const matches =
                category === "all" ||
                card.dataset.category === category;

            card.hidden = !matches;
        });
    });
});

// Demo checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Please add a menu item before continuing.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const summary = cart.map(item =>
        `${item.name} × ${item.quantity} = ₹${
            formatPrice(item.price * item.quantity)
        }`
    ).join("\n");

    alert(
        "YOUR ORDER SUMMARY\n\n" +
        summary +
        "\n\nTotal: ₹" + formatPrice(total) +
        "\n\nThis is a demo. No order has been submitted."
    );
});


