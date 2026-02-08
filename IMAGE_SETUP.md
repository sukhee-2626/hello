# Image Setup Instructions

## Required Images for Deployment

To ensure your website displays correctly on Vercel, you need to add these images to the `maha-cakes` folder:

### 1. Logo
- **Filename:** `logo.png`
- **Description:** Maha Cakes chef logo
- **Recommended size:** 200x200px (transparent background)
- **Used in:** Navbar on all pages

### 2. Hero Banner Slides
- **Filename:** `banner1.jpg`
  - Description: Cafe interior with chef logo
  - Recommended size: 1920x600px
  
- **Filename:** `banner2.jpg`
  - Description: Bakery bread display
  - Recommended size: 1920x600px
  
- **Filename:** `banner3.jpg`
  - Description: Cakes display with chef logo
  - Recommended size: 1920x600px

### 3. Product Images (Optional)
If you want to replace the emoji placeholders with real cake images:
- Create an `images/` folder
- Add product images like: `chocolate-cake.jpg`, `red-velvet.jpg`, etc.
- Update `script.js` to reference these images

## Current Status
✅ All HTML/CSS/JS files ready
✅ Slider configured for 3 banners
✅ Logo placeholders in navbar
⚠️ Images need to be added before deployment

## How to Add Images

1. Save your images with the exact filenames above
2. Place them in: `c:\Users\HP\happy\maha-cakes\`
3. Commit to Git:
   ```bash
   git add .
   git commit -m "Add banner images and logo"
   git push
   ```

## Vercel Deployment

Once images are added:
1. Go to https://vercel.com
2. Import your GitHub repository: `sukhee-2626/hello`
3. Deploy!

Your site will be live at: `https://your-project.vercel.app`
