let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-shopping-best-sells');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.shape-best-sells');
            const productName = productCard.querySelector('.title-shape-best-sells').textContent;
            const productPrice = productCard.querySelector('.price-shape-best-sells').textContent;
            const productImage = productCard.querySelector('.img-shape-best-sells').src;
            
            const product = {
                id: Date.now(),
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            
            addToCart(product);
            
            showNotification('Product added to cart');
            
            updateCartIcon();
        });
    });

    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleCart();
    });
    
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    function toggleCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        updateCartItems();
    }
    
    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
    
    function updateCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your shopping cart is empty.</p>';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="item-title">${item.name}</div>
                    <div class="item-price">${item.price}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity-number">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            
            cartItemsContainer.appendChild(itemElement);
            
            const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
            total += price * item.quantity;
        });
        
        document.querySelector('.total-price').textContent = `${total.toFixed(0)} $`;
        
        addQuantityListeners();
    }
    
    function addQuantityListeners() {
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const item = cart.find(item => item.id == id);
                if (item) {
                    item.quantity++;
                    updateCartItems();
                    updateCartIcon();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const item = cart.find(item => item.id == id);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    updateCartItems();
                    updateCartIcon();
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                cart = cart.filter(item => item.id != id);
                updateCartItems();
                updateCartIcon();
            });
        });
    }
});

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
    const cartIconContainer = document.querySelector('.cart-icon-container');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const existingBadge = document.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
        if (itemCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = itemCount;
        cartIconContainer.appendChild(badge);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // حذف notification بعد از 3 ثانیه
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 
