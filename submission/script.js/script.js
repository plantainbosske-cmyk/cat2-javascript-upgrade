const products = [
    {id:1, name: "Green Plantains", price: 'Ksh 250', category: "Fresh"},
    {id:2, name: "Plantain Flour(1kg)", price: 'Ksh 450', category: "Processed"},
    {id:3, name: "Ripe Yellow Plantains", price: 'Ksh 300', category: "Fresh"},
    {id:4, name: "Plantain Chips (200g)", price: 'Ksh 180', category: "Snack"},
    {id:5, name: "Organic Plantain Bundle", price: 'Ksh 600', category: "Bulk"},
    {id:6, name: "Plantain Leaves (pack)", price: 'Ksh 120', category: "Other"},
];
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: ${product.category}</p>
        </div>
    `).join('');
}
function initWishlist() {
    const wishlist = document.getElementById('wishlist');
    const input = document.getElementById('wishlist-input');
    const addButton = document.getElementById('add-to-wishlist');
    if (!wishlist || !input || !addButton) return;

    //Wishlist loaded from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    savedWishlist.forEach(item => addWishlistItem(item, false));

    addButton.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            addWishlistItem(text, true);
            input.value = '';
        }
    });
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });
}
function addWishlistItem(text, save) {
    const wishlist = document.getElementById('wishlist');
    if (!wishlist) return;
    const li = document.createElement('li');
    li.textContent = text;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        wishlist.removeChild(li);
        if (save) {
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            const index = savedWishlist.indexOf(text);
            if (index > -1) {
                savedWishlist.splice(index, 1);
                localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
            }
        }
    });
    li.appendChild(removeButton);
    wishlist.appendChild(li);
    if (save) {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        savedWishlist.push(text);
        localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
    }
}
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form || !feedback) return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const message = form.elements['message'].value.trim();
        if (name && email && message) {
            feedback.textContent = 'Thank you for your message!';
            form.reset();
        } else {
            feedback.textContent = 'Please fill in all fields.';
        }
    });
}
function initThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleButton.textContent = '☀️';
    }else {
        document.documentElement.removeAttribute('data-theme');
        toggleButton.textContent = '🌙';
    } 
    toggleButton.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggleButton.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleButton.textContent = '☀️';
        }
    });  
}
function initBannerReveal() {
    const banner = document.getElementById('banner');
    if (!banner) return;

    banner.classList.remove('reveal');
   
    banner.addEventListener('click', () => {
        banner.classList.toggle('reveal');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initWishlist();
    initContactForm();
    initThemeToggle();
    initBannerReveal();
});
