// Données des produits
const products = [
    {
        id: 1,
        name: 'Veste Noire Minimaliste',
        price: 129.99,
        image: 'https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Vestes',
        isNew: true
    },
    {
        id: 2,
        name: 'T-Shirt Oversize Noir',
        price: 49.99,
        image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'T-Shirts',
        isPromo: true
    },
    {
        id: 3,
        name: 'Pantalon Cargo Noir',
        price: 89.99,
        image: 'https://images.pexels.com/photos/2343661/pexels-photo-2343661.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Pantalons'
    },
    {
        id: 4,
        name: 'Sneakers Black Edition',
        price: 159.99,
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Chaussures',
        isNew: true
    },
    {
        id: 5,
        name: 'Sac à Main Noir',
        price: 79.99,
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Accessoires',
        isPromo: true
    },
    {
        id: 6,
        name: 'Montre Minimaliste',
        price: 199.99,
        image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600',
        category: 'Accessoires',
        isNew: true
    }
];

// Gestionnaire de carrousel pour les produits
class ProductCarousel {
    constructor() {
        this.carousel = document.querySelector('.product-carousel');
        this.products = products;
        this.init();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isNew ? '<span class="product-badge new">Nouveau</span>' : ''}
                ${product.isPromo ? '<span class="product-badge promo">Promo</span>' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-price">
                    <span class="current-price">${product.price.toFixed(2)} €</span>
                </div>
                <button class="add-to-cart-btn">Ajouter au panier</button>
            </div>
        `;

        return card;
    }

    init() {
        this.products.forEach(product => {
            const card = this.createProductCard(product);
            this.carousel.appendChild(card);
        });
    }
}

// Gestionnaire de la newsletter
class Newsletter {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = this.form.querySelector('input[type="email"]').value;
            
            // Simulation d'envoi d'email
            console.log(`Newsletter inscription pour: ${email}`);
            this.form.reset();
            alert('Merci pour votre inscription à notre newsletter!');
        });
    }
}

// Gestionnaire de la navigation mobile
class MobileNav {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                this.header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > this.lastScroll && !this.header.classList.contains('scroll-down')) {
                this.header.classList.remove('scroll-up');
                this.header.classList.add('scroll-down');
            } else if (currentScroll < this.lastScroll && this.header.classList.contains('scroll-down')) {
                this.header.classList.remove('scroll-down');
                this.header.classList.add('scroll-up');
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// Gestionnaire des animations au scroll
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.collection-item, .featured-content, .newsletter').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
}

// Product Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product Image Gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.src;
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Size Selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Quantity Controls
    const quantityInput = document.querySelector('.quantity-controls input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });

        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (isNaN(value) || value < 1) value = 1;
            if (value > 10) value = 10;
            quantityInput.value = value;
        });
    }

    // Add to Cart Button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-btn.active');
            if (!selectedSize) {
                alert('Veuillez sélectionner une taille');
                return;
            }
            
            const quantity = parseInt(quantityInput.value);
            const cartCount = document.querySelector('.cart-count');
            const currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + quantity;
            
            // Animation de confirmation
            this.innerHTML = '<i class="fas fa-check"></i> Ajouté au panier';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter au panier';
                this.style.backgroundColor = '';
            }, 2000);
        });
    }
});

// Sticky Header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
    new Newsletter();
    new MobileNav();
    new ScrollAnimations();
});
