# Deployment Guide - Vercel + MongoDB Atlas

This guide will help you deploy the PC Creations agency site to Vercel with MongoDB Atlas as the database.

## Prerequisites

- GitHub account (with this repository pushed)
- Vercel account (free tier works)
- MongoDB Atlas account (free tier works)

---

## Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "M0 Free" cluster (free tier)
   - Select a region closest to your users (e.g., Singapore, Mumbai)
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password Authentication"
   - Enter username (e.g., `pc-creations-admin`)
   - Generate and save a strong password
   - Click "Create User"

4. **Whitelist IP Addresses**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0) for Vercel
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select Node.js version
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://pc-creations-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/agency-site?retryWrites=true&w=majority`

---

## Step 2: Prepare Your Local Environment

1. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your values**
   - Add your MongoDB connection string as `MONGODB_URI`
   - Generate a secure `JWT_SECRET` (use: `openssl rand -base64 32`)
   - Set your admin credentials
   - Add your social media URLs
   - For WhatsApp API, get credentials from [Meta Developers](https://developers.facebook.com/docs/whatsapp/cloud-api)

3. **Test locally**
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:3000 to verify everything works.

---

## Step 3: Push to GitHub

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Copy the repository URL

3. **Push to GitHub**
   ```bash
   git remote add origin YOUR_GITHUB_REPO_URL
   git branch -M main
   git push -u origin main
   ```

---

## Step 4: Deploy to Vercel

1. **Connect Vercel to GitHub**
   - Go to [Vercel](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from your `.env` file:
     - `MONGODB_URI` - Your MongoDB connection string
     - `JWT_SECRET` - Your generated secret
     - `ADMIN_USERNAME` - Your admin username
     - `ADMIN_PASSWORD` - Your admin password
     - `NEXT_PUBLIC_WHATSAPP_NUMBER` - Your WhatsApp number
     - `NEXT_PUBLIC_PHONE_NUMBER` - Your phone number
     - `NEXT_PUBLIC_INSTAGRAM_URL` - Instagram URL
     - `NEXT_PUBLIC_FACEBOOK_URL` - Facebook URL
     - `NEXT_PUBLIC_LINKEDIN_URL` - LinkedIn URL
     - `WHATSAPP_ACCESS_TOKEN` - WhatsApp API token (if using)
     - `WHATSAPP_PHONE_NUMBER_ID` - WhatsApp phone ID (if using)
     - `WHATSAPP_RECIPIENT_NUMBER` - WhatsApp recipient (if using)
     - `WHATSAPP_API_VERSION` - API version (default: v18.0)

3. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (~2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

---

## Step 5: Configure Custom Domain (Optional)

1. **In Vercel Project Settings**
   - Go to "Domains"
   - Click "Add Domain"
   - Enter your domain (e.g., `pccreations.com`)

2. **Update DNS Records**
   - Vercel will show you the DNS records to add
   - Add them to your domain registrar (GoDaddy, Namecheap, etc.)
   - Wait for DNS propagation (typically 10-30 minutes)

---

## Post-Deployment Checklist

- [ ] Test contact form submissions
- [ ] Test admin login at `/api/admin/login`
- [ ] Verify MongoDB is connected (check logs in Vercel)
- [ ] Test WhatsApp integration (if configured)
- [ ] Check all social media links work
- [ ] Verify all images load correctly
- [ ] Test on mobile devices

---

## Troubleshooting

### MongoDB Connection Issues
- Ensure IP whitelist includes 0.0.0.0/0
- Check connection string format
- Verify database user has correct permissions

### Build Errors
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify TypeScript configuration

### Environment Variables Not Working
- Ensure variable names match exactly (case-sensitive)
- For public variables, ensure they start with `NEXT_PUBLIC_`
- Redeploy after adding variables

---

## Updating Your Site

After deployment, any push to your GitHub main branch will automatically trigger a new deployment on Vercel.

```bash
git add .
git commit -m "Update content"
git push
```

---

## Cost Summary

- **Vercel**: Free tier (generous limits)
- **MongoDB Atlas**: M0 Free tier (512MB storage)
- **Domain**: ~$10-15/year (optional)
- **Total**: $0-15/year for most use cases

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
