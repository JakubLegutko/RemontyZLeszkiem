// Use configuration from config.js
const CONFIG = {
    CDN_BASE_URL: SITE_CONFIG.CDN.BASE_URL,
    FACEBOOK_PAGE_ID: SITE_CONFIG.FACEBOOK.PAGE_ID,
    WATERMARK_TEXT: SITE_CONFIG.WATERMARK.TEXT,
    SUPPORTED_FORMATS: SITE_CONFIG.CDN.SUPPORTED_FORMATS,
    AUTO_REFRESH_INTERVAL: SITE_CONFIG.GALLERY.AUTO_REFRESH_INTERVAL
};

// Global variables
let allPhotos = [];
let currentFolder = 'all';
let currentCarouselIndex = 0;
let currentReviewsIndex = 0;
let currentLightboxIndex = 0;
let filteredPhotos = [];

// DOM elements
const loading = document.getElementById('loading');
const photoCarousel = document.getElementById('photoCarousel');
const carouselDots = document.getElementById('carouselDots');
const galleryGrid = document.getElementById('galleryGrid');
const folderButtons = document.getElementById('folderButtons');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    loadPhotosFromCDN();
    loadFacebookReviews();
    setupAutoRefresh();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            link.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Load photos from CDN
async function loadPhotosFromCDN() {
    try {
        showLoading(true);
        
        // In a real implementation, you would fetch the folder structure from your CDN
        // For now, we'll simulate this with a mock structure
        const mockFolders = await getMockFolderStructure();
        
        // Load photos from each folder
        for (const folder of mockFolders) {
            const photos = await loadPhotosFromFolder(folder);
            allPhotos.push(...photos);
        }
        
        // Initialize the gallery
        initializeGallery();
        initializePhotoCarousel();
        
        showLoading(false);
        
    } catch (error) {
        console.error('Error loading photos:', error);
        showLoading(false);
        showError('Failed to load photos. Please try again later.');
    }
}

// Mock function to get folder structure - replace with actual CDN API call
async function getMockFolderStructure() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock folder structure
    return [
        'nature',
        'portraits', 
        'landscapes',
        'events',
        'weddings'
    ];
}

// Load photos from a specific folder
async function loadPhotosFromFolder(folderName) {
    const photos = [];
    
    // In a real implementation, you would fetch the actual photo list from your CDN
    // For now, we'll generate mock photos
    const photoCount = Math.floor(Math.random() * 10) + 5; // 5-15 photos per folder
    
    for (let i = 1; i <= photoCount; i++) {
        photos.push({
            id: `${folderName}_${i}`,
            url: `${CONFIG.CDN_BASE_URL}${folderName}/photo_${i}.jpg`,
            folder: folderName,
            title: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)} Photo ${i}`,
            alt: `${folderName} photography - image ${i}`
        });
    }
    
    return photos;
}

// Initialize gallery with folder navigation
function initializeGallery() {
    // Get unique folders
    const folders = [...new Set(allPhotos.map(photo => photo.folder))];
    
    // Create folder buttons
    folders.forEach(folder => {
        const button = document.createElement('button');
        button.className = 'folder-btn';
        button.setAttribute('data-folder', folder);
        button.textContent = folder.charAt(0).toUpperCase() + folder.slice(1);
        button.addEventListener('click', () => filterByFolder(folder));
        folderButtons.appendChild(button);
    });
    
    // Show all photos initially
    filterByFolder('all');
}

// Filter photos by folder
function filterByFolder(folder) {
    currentFolder = folder;
    
    // Update active button
    document.querySelectorAll('.folder-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-folder="${folder}"]`).classList.add('active');
    
    // Filter photos
    if (folder === 'all') {
        filteredPhotos = [...allPhotos];
    } else {
        filteredPhotos = allPhotos.filter(photo => photo.folder === folder);
    }
    
    // Render gallery
    renderGallery();
}

// Render gallery grid
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    filteredPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo.url}" alt="${photo.alt}" loading="lazy">
            <div class="watermark-overlay">${CONFIG.WATERMARK_TEXT}</div>
        `;
        
        // Add click handler for lightbox
        item.addEventListener('click', () => openLightbox(index));
        
        galleryGrid.appendChild(item);
    });
}

// Initialize photo carousel
function initializePhotoCarousel() {
    if (allPhotos.length === 0) return;
    
    // Create carousel items
    allPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${photo.url}" alt="${photo.alt}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 10px;">
            <div class="watermark-overlay">${CONFIG.WATERMARK_TEXT}</div>
        `;
        photoCarousel.appendChild(item);
    });
    
    // Create dots
    createCarouselDots();
    
    // Start auto-rotation
    setInterval(() => moveCarousel(1), 5000);
}

// Create carousel dots
function createCarouselDots() {
    carouselDots.innerHTML = '';
    
    for (let i = 0; i < allPhotos.length; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToCarouselSlide(i));
        carouselDots.appendChild(dot);
    }
}

// Move carousel
function moveCarousel(direction) {
    const totalSlides = allPhotos.length;
    if (totalSlides === 0) return;
    
    currentCarouselIndex += direction;
    
    if (currentCarouselIndex >= totalSlides) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = totalSlides - 1;
    }
    
    updateCarousel();
}

// Go to specific carousel slide
function goToCarouselSlide(index) {
    currentCarouselIndex = index;
    updateCarousel();
}

// Update carousel display
function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    
    // Update track position
    track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCarouselIndex);
    });
}

// Lightbox functionality
function openLightbox(index) {
    currentLightboxIndex = index;
    const photo = filteredPhotos[index];
    
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.alt;
    lightbox.style.display = 'block';
    
    // Add watermark overlay to lightbox
    addWatermarkToLightbox();
}

// Add watermark to lightbox image
function addWatermarkToLightbox() {
    // Create watermark overlay for lightbox
    const watermark = document.createElement('div');
    watermark.className = 'watermark-overlay';
    watermark.style.position = 'absolute';
    watermark.style.bottom = '20px';
    watermark.style.left = '20px';
    watermark.style.right = '20px';
    watermark.style.background = 'rgba(0,0,0,0.8)';
    watermark.style.color = 'white';
    watermark.style.padding = '15px';
    watermark.style.borderRadius = '10px';
    watermark.style.textAlign = 'center';
    watermark.style.fontWeight = 'bold';
    watermark.style.fontSize = '1.2rem';
    watermark.textContent = CONFIG.WATERMARK_TEXT;
    
    // Remove existing watermark
    const existingWatermark = lightbox.querySelector('.watermark-overlay');
    if (existingWatermark) {
        existingWatermark.remove();
    }
    
    lightbox.appendChild(watermark);
}

// Change lightbox image
function changeLightboxImage(direction) {
    const totalPhotos = filteredPhotos.length;
    if (totalPhotos === 0) return;
    
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex >= totalPhotos) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = totalPhotos - 1;
    }
    
    const photo = filteredPhotos[currentLightboxIndex];
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.alt;
    
    addWatermarkToLightbox();
}

// Close lightbox
document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Load Facebook reviews
async function loadFacebookReviews() {
    try {
        // In a real implementation, you would use the Facebook Graph API
        // For now, we'll use mock reviews
        const reviews = getMockReviews();
        renderReviews(reviews);
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

// Mock reviews - replace with actual Facebook API call
function getMockReviews() {
    return [
        {
            author: 'Sarah Johnson',
            text: 'Amazing photography! The quality and attention to detail is outstanding.',
            rating: 5
        },
        {
            author: 'Mike Chen',
            text: 'Professional service and beautiful results. Highly recommended!',
            rating: 5
        },
        {
            author: 'Emily Davis',
            text: 'Captured our special moments perfectly. The photos are absolutely stunning.',
            rating: 5
        },
        {
            author: 'David Wilson',
            text: 'Great experience from start to finish. The photographer was very talented.',
            rating: 4
        }
    ];
}

// Render reviews
function renderReviews(reviews) {
    const reviewsTrack = document.getElementById('reviewsCarousel');
    
    reviews.forEach(review => {
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
            <div class="review-author">${review.author}</div>
            <div class="review-text">"${review.text}"</div>
            <div class="review-rating">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
        `;
        reviewsTrack.appendChild(item);
    });
}

// Move reviews carousel
function moveReviews(direction) {
    const reviews = document.querySelectorAll('.review-item');
    const totalReviews = reviews.length;
    if (totalReviews === 0) return;
    
    currentReviewsIndex += direction;
    
    if (currentReviewsIndex >= totalReviews) {
        currentReviewsIndex = 0;
    } else if (currentReviewsIndex < 0) {
        currentReviewsIndex = totalReviews - 1;
    }
    
    const track = document.querySelector('.reviews-track');
    track.style.transform = `translateX(-${currentReviewsIndex * 100}%)`;
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // In a real implementation, you would send this to your server
            console.log('Contact form submitted:', data);
            
            // Show success message
            showSuccess('Thank you for your message! We\'ll get back to you soon.');
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showError('Failed to send message. Please try again.');
        }
    });
}

// Auto-refresh functionality
function setupAutoRefresh() {
    setInterval(() => {
        loadPhotosFromCDN();
    }, CONFIG.AUTO_REFRESH_INTERVAL);
}

// Utility functions
function showLoading(show) {
    loading.style.display = show ? 'flex' : 'none';
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 3001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            if (lightbox.style.display === 'block') {
                changeLightboxImage(1);
            } else {
                moveCarousel(1);
            }
        } else {
            // Swipe right
            if (lightbox.style.display === 'block') {
                changeLightboxImage(-1);
            } else {
                moveCarousel(-1);
            }
        }
    }
}