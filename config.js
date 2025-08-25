// Configuration file for Photo Gallery Website
// Update these settings to match your CDN and preferences

const SITE_CONFIG = {
    // CDN Configuration
    CDN: {
        // Replace with your actual CDN base URL
        BASE_URL: 'https://your-cdn-url.com/photos/',
        
        // CDN API endpoint for listing folders (if available)
        // Leave empty if your CDN doesn't provide an API
        API_ENDPOINT: '',
        
        // Authentication headers (if required)
        HEADERS: {
            // 'Authorization': 'Bearer your-api-key',
            // 'X-API-Key': 'your-api-key'
        },
        
        // Supported image formats
        SUPPORTED_FORMATS: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp']
    },
    
    // Facebook Integration
    FACEBOOK: {
        // Your Facebook Page ID
        PAGE_ID: 'your-facebook-page-id',
        
        // Facebook App ID (required for Graph API)
        APP_ID: 'your-facebook-app-id',
        
        // Facebook Access Token (for fetching reviews)
        ACCESS_TOKEN: 'your-facebook-access-token'
    },
    
    // Watermark Settings
    WATERMARK: {
        // Watermark text
        TEXT: '© Your Photo Gallery',
        
        // Watermark position: 'bottom', 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        POSITION: 'bottom',
        
        // Watermark opacity (0-1)
        OPACITY: 0.8,
        
        // Watermark font size
        FONT_SIZE: '1.1rem',
        
        // Watermark background color
        BACKGROUND: 'rgba(0,0,0,0.7)',
        
        // Watermark text color
        COLOR: 'white'
    },
    
    // Gallery Settings
    GALLERY: {
        // Number of photos per page (0 = show all)
        PHOTOS_PER_PAGE: 0,
        
        // Auto-refresh interval in milliseconds (0 = disabled)
        AUTO_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
        
        // Carousel auto-rotation interval in milliseconds
        CAROUSEL_INTERVAL: 5000, // 5 seconds
        
        // Enable lazy loading
        LAZY_LOADING: true,
        
        // Enable lightbox
        LIGHTBOX: true,
        
        // Enable keyboard navigation
        KEYBOARD_NAVIGATION: true,
        
        // Enable touch/swipe support
        TOUCH_SUPPORT: true
    },
    
    // Contact Form Settings
    CONTACT: {
        // Email service configuration
        EMAIL_SERVICE: {
            // Service: 'gmail', 'outlook', 'custom'
            TYPE: 'custom',
            
            // SMTP settings (for custom email service)
            SMTP: {
                HOST: 'your-smtp-host.com',
                PORT: 587,
                SECURE: true,
                USER: 'your-email@domain.com',
                PASS: 'your-email-password'
            }
        },
        
        // Form validation
        VALIDATION: {
            REQUIRE_NAME: true,
            REQUIRE_EMAIL: true,
            REQUIRE_SUBJECT: true,
            REQUIRE_MESSAGE: true,
            MIN_MESSAGE_LENGTH: 10
        }
    },
    
    // Social Media Links
    SOCIAL: {
        FACEBOOK: 'https://facebook.com/your-page',
        INSTAGRAM: 'https://instagram.com/your-profile',
        TWITTER: 'https://twitter.com/your-profile',
        LINKEDIN: 'https://linkedin.com/in/your-profile'
    },
    
    // Contact Information
    CONTACT_INFO: {
        EMAIL: 'info@yourdomain.com',
        PHONE: '+1 (555) 123-4567',
        ADDRESS: '123 Photo Street, Gallery City, ST 12345',
        BUSINESS_HOURS: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
    },
    
    // SEO Settings
    SEO: {
        SITE_TITLE: 'Your Photo Gallery',
        SITE_DESCRIPTION: 'Professional photography gallery showcasing beautiful moments and stunning landscapes.',
        SITE_KEYWORDS: 'photography, gallery, portraits, landscapes, events, weddings',
        AUTHOR: 'Your Name',
        CANONICAL_URL: 'https://yourdomain.com'
    },
    
    // Performance Settings
    PERFORMANCE: {
        // Enable image compression
        COMPRESS_IMAGES: true,
        
        // Enable caching
        ENABLE_CACHE: true,
        
        // Cache duration in seconds
        CACHE_DURATION: 3600, // 1 hour
        
        // Enable service worker
        ENABLE_SERVICE_WORKER: false
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
} else {
    window.SITE_CONFIG = SITE_CONFIG;
}