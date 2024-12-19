const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const body = document.body;
const productImage = document.getElementById('product-img');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
        const selectedColor = button.getAttribute('data-selected-color') || "Default";

        addToCart(productName, productPrice, selectedColor);
    });
});

document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedColor = e.target.getAttribute('data-color');
        const selectedImage = e.target.getAttribute('data-img') || productImage.src;
        changeBackgroundColor(selectedColor, selectedImage);

        const addToCartButton = e.target.closest('.product').querySelector('.add-to-cart');
        addToCartButton.setAttribute('data-selected-color', e.target.textContent.trim()); 
    });
});

let cart = [];

function addToCart(name, price, color) {
    const existingItem = cart.find(item => item.name === name && item.color === color);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, color, quantity: 1 });
    }

    updateCartUI();
}

function updateCartUI() {
    cartItems.innerHTML = ''; 

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} (${item.color}) (x${item.quantity}) - ₱${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeOneFromCart('${escapeHTML(item.name)}', '${escapeHTML(item.color)}')">Remove One</button>
        `;
        cartItems.appendChild(listItem);
    });

    totalPrice.textContent = `Total: ₱${total.toFixed(2)}`;
}


function removeOneFromCart(name, color) {
    const item = cart.find(item => item.name === name && item.color === color);

    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(cartItem => cartItem.name !== name || cartItem.color !== color); 
        }
    }

    updateCartUI();
}


function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}


function changeBackgroundColor(color, imageSrc) {

    switch (color) {
        case 'pink':
            body.style.background = 'linear-gradient(to right, black 0%, pink 100%)';
            break;
        case 'yellow':
            body.style.background = 'linear-gradient(to right, black 0%, yellow 100%)'; 
            break;
        case 'blue':
            body.style.background = 'linear-gradient(to right, black 0%, turquoise 100%)';
            break;
        case 'red':
            body.style.background = 'linear-gradient(to right, black 0%, tomato 100%)';
            break;
        default:
            body.style.backgroundColor = '#e1f7d5';
            break;
    }

    productImage.style.opacity = 0; 
    setTimeout(() => {
        productImage.src = imageSrc; 
        productImage.style.opacity = 1; 
    }, 500); 
}
