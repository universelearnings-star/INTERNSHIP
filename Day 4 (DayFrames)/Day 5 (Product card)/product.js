// Add to Cart functionality
const cartButtons = document.querySelectorAll('.cartBtn');

cartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        btn.style.background = '#40916c';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            btn.style.background = '#2d6a4f';
        }, 2000);
    });
});

// Review counting and dynamic star rating
const productCards = document.querySelectorAll('.product-card');
const products = [];

// Initialize products array with data
productCards.forEach((card, idx) => {
    const rating = parseFloat(card.getAttribute('data-rating')) || 4.5;
    const reviews = parseInt(card.getAttribute('data-reviews')) || 0;
    products[idx] = { rating, reviews };
});

// Function to update stars based on rating
function updateStars(productId, rating) {
    const starsContainer = document.querySelector(`.stars[data-product-id="${productId}"]`);
    if (!starsContainer) return;

    starsContainer.innerHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        starsContainer.appendChild(star);
    }

    if (hasHalfStar) {
        const halfStar = document.createElement('i');
        halfStar.className = 'fas fa-star-half-alt';
        starsContainer.appendChild(halfStar);
    }

    // Fill remaining with empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        const emptyStar = document.createElement('i');
        emptyStar.className = 'far fa-star';
        starsContainer.appendChild(emptyStar);
    }
}

// Function to format review count with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to calculate rating based on review count
function calculateRating(reviews) {
    // Simple formula: rating increases slightly with more reviews
    // Base rating 3.5, max 5.0
    const maxReviews = 10000;
    const baseRating = 3.5;
    const ratingIncrease = Math.min((reviews / maxReviews) * 1.5, 1.5);
    return Math.min(baseRating + ratingIncrease, 5.0);
}

// Event listeners for review buttons
document.querySelectorAll('.review-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = btn.getAttribute('data-product-id');
        products[productId].reviews += 1;
        const newRating = calculateRating(products[productId].reviews);
        products[productId].rating = newRating;

        // Update review text
        const reviewsEl = document.querySelector(`.reviews[data-product-id="${productId}"]`);
        reviewsEl.textContent = formatNumber(products[productId].reviews) + ' Reviews';

        // Update stars
        updateStars(productId, newRating);
    });
});

document.querySelectorAll('.review-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = btn.getAttribute('data-product-id');
        if (products[productId].reviews > 0) {
            products[productId].reviews -= 1;
            const newRating = calculateRating(products[productId].reviews);
            products[productId].rating = newRating;

            // Update review text
            const reviewsEl = document.querySelector(`.reviews[data-product-id="${productId}"]`);
            reviewsEl.textContent = formatNumber(products[productId].reviews) + ' Reviews';

            // Update stars
            updateStars(productId, newRating);
        }
    });
});