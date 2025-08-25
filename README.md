# Photo Gallery Website

A modern, responsive photo gallery website that automatically loads photos from your CDN, organizes them by folders, and displays them with watermarks. Perfect for hosting on GitHub Pages.

## Features

- 🖼️ **Dynamic Photo Loading**: Automatically detects and loads photos from your CDN folders
- 📁 **Folder Organization**: Creates navigation based on your CDN folder structure
- 🛡️ **Watermark Protection**: All photos display with customizable watermarks
- 🎠 **Photo Carousel**: Home page features an auto-rotating carousel of all photos
- ⭐ **Facebook Reviews**: Integration with Facebook reviews (mock data included)
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎯 **Lightbox Gallery**: Click any photo to view in full-screen lightbox
- 📧 **Contact Form**: Functional contact form with validation
- 🔄 **Auto-Refresh**: Automatically checks for new photos every 5 minutes
- ⌨️ **Keyboard Navigation**: Full keyboard and touch/swipe support

## Quick Start

1. **Clone or download** this repository
2. **Configure your CDN** (see CDN Setup below)
3. **Update configuration** in `config.js`
4. **Deploy to GitHub Pages** or any web server

## CDN Setup

### Option 1: Simple CDN Structure
Organize your photos in folders on your CDN like this:
```
https://your-cdn.com/photos/
├── nature/
│   ├── photo_1.jpg
│   ├── photo_2.jpg
│   └── ...
├── portraits/
│   ├── photo_1.jpg
│   ├── photo_2.jpg
│   └── ...
├── landscapes/
│   └── ...
└── events/
    └── ...
```

### Option 2: CDN with API
If your CDN provides an API for listing folders/files, update the `API_ENDPOINT` in `config.js`.

### Supported CDN Services
- **Cloudflare Images**
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Azure Blob Storage**
- **Any HTTP-accessible CDN**

## Configuration

### 1. Update CDN Settings
Edit `config.js` and update the CDN configuration:

```javascript
CDN: {
    BASE_URL: 'https://your-actual-cdn-url.com/photos/',
    API_ENDPOINT: '', // Optional: your CDN's API endpoint
    HEADERS: {
        // Add authentication headers if needed
        // 'Authorization': 'Bearer your-api-key'
    }
}
```

### 2. Customize Watermarks
```javascript
WATERMARK: {
    TEXT: '© Your Photo Gallery',
    POSITION: 'bottom', // 'bottom', 'center', 'top-left', etc.
    OPACITY: 0.8,
    FONT_SIZE: '1.1rem',
    BACKGROUND: 'rgba(0,0,0,0.7)',
    COLOR: 'white'
}
```

### 3. Facebook Integration (Optional)
To use real Facebook reviews instead of mock data:

1. Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
2. Get your Page ID and Access Token
3. Update the Facebook configuration:

```javascript
FACEBOOK: {
    PAGE_ID: 'your-facebook-page-id',
    APP_ID: 'your-facebook-app-id',
    ACCESS_TOKEN: 'your-facebook-access-token'
}
```

### 4. Contact Form Setup
Update contact information and email settings:

```javascript
CONTACT_INFO: {
    EMAIL: 'your-email@domain.com',
    PHONE: '+1 (555) 123-4567',
    ADDRESS: 'Your Address'
}
```

## Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://username.github.io/repository-name`

### Other Hosting Options
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Traditional Web Server**: Upload files to your web server

## File Structure

```
photo-gallery/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── config.js           # Configuration settings
└── README.md           # This file
```

## How It Works

### Photo Loading Process
1. **Folder Detection**: The website scans your CDN for folders
2. **Photo Discovery**: For each folder, it looks for supported image files
3. **Dynamic Loading**: Photos are loaded and displayed with watermarks
4. **Auto-Refresh**: Every 5 minutes, it checks for new photos

### Folder Structure Detection
The website automatically creates navigation buttons based on your CDN folder structure. When you add a new folder to your CDN, it will appear as a new category on the website.

### Watermark Implementation
- **Gallery View**: Semi-transparent overlay at the bottom of each photo
- **Lightbox View**: Prominent watermark overlay on full-screen images
- **Carousel View**: Watermark overlay on carousel images

## Customization

### Adding New Features
The modular JavaScript structure makes it easy to add new features:

```javascript
// Add custom functionality
function myCustomFeature() {
    // Your code here
}

// Initialize in the main function
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    myCustomFeature();
});
```

### Styling Changes
Modify `styles.css` to change the appearance:

```css
/* Change color scheme */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Performance Optimization
- **Lazy Loading**: Images load only when needed
- **Caching**: Browser caching for better performance
- **Compression**: Optimize your images before uploading to CDN

## Troubleshooting

### Photos Not Loading
1. Check your CDN URL in `config.js`
2. Verify folder structure matches expected format
3. Check browser console for errors
4. Ensure CORS is enabled on your CDN

### Watermarks Not Showing
1. Check watermark configuration in `config.js`
2. Verify CSS is loading properly
3. Check browser console for JavaScript errors

### Contact Form Not Working
1. Update email settings in `config.js`
2. Check server logs for errors
3. Verify SMTP settings if using custom email service

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify your CDN configuration
4. Create an issue in the GitHub repository

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: This website is designed to be lightweight and suitable for GitHub Pages hosting. All photos are loaded directly from your CDN, so the repository size remains small.