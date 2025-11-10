# Okta Authentication Setup Guide

## Overview
This project is configured to use Okta authentication when environment variables are set. If the variables are not set, the app runs without authentication (useful for local development).

## Step 1: Set Up Okta Application

1. **Log into your Okta Admin Console**
2. **Create a new application:**
   - Go to Applications → Applications → Create App Integration
   - Choose **OIDC - OpenID Connect**
   - Choose **Single-Page Application (SPA)**
   - Click Next

3. **Configure the application:**
   - **App integration name:** Retailer Template (or your preferred name)
   - **Grant types:** Check "Authorization Code" and "Refresh Token"
   - **Sign-in redirect URIs:** 
     - For local: `http://localhost:3000/login/callback`
     - For Vercel: `https://your-vercel-url.vercel.app/login/callback`
   - **Sign-out redirect URIs:** (optional)
     - For local: `http://localhost:3000`
     - For Vercel: `https://your-vercel-url.vercel.app`
   - **Controlled access:** Choose who can access (e.g., "Allow everyone in your organization to access")
   - Click **Save**

4. **Copy your credentials:**
   - After saving, you'll see:
     - **Client ID** (copy this)
     - **Okta domain** (copy this, it looks like `dev-xxxxx.okta.com`)

## Step 2: Configure Environment Variables

### For Local Development

Create a `.env` file in the root directory:

```bash
REACT_APP_OKTA_ISSUER=https://your-domain.okta.com/oauth2/default
REACT_APP_OKTA_CLIENT_ID=your-client-id-here
```

**Important:** Replace:
- `your-domain.okta.com` with your actual Okta domain
- `your-client-id-here` with your actual Client ID

### For Vercel Deployment

1. **Go to your Vercel project dashboard**
2. **Navigate to:** Settings → Environment Variables
3. **Add the following variables:**
   - `REACT_APP_OKTA_ISSUER` = `https://your-domain.okta.com/oauth2/default`
   - `REACT_APP_OKTA_CLIENT_ID` = `your-client-id-here`

4. **Important:** Make sure to add these for all environments (Production, Preview, Development)

## Step 3: Update Okta Redirect URIs After Deployment

After deploying to Vercel, you'll get a URL like `https://retailer-template.vercel.app`

1. **Go back to Okta Admin Console**
2. **Edit your application**
3. **Add the production redirect URI:**
   - `https://your-vercel-url.vercel.app/login/callback`
4. **Save**

## Step 4: Deploy to Vercel

Since you have Vercel connected via GitHub:

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Add Okta authentication"
   git push
   ```

2. **Vercel will automatically deploy** (if auto-deploy is enabled)

3. **Or manually trigger deployment:**
   - Go to Vercel dashboard
   - Click "Deployments"
   - Click "Redeploy" on the latest deployment

## Step 5: Test Authentication

1. **Visit your deployed URL**
2. **You should be redirected to Okta login**
3. **Log in with your Okta credentials**
4. **You'll be redirected back to the app**

## Troubleshooting

### "Invalid redirect URI" error
- Make sure the redirect URI in Okta matches exactly: `https://your-url.vercel.app/login/callback`
- Check for trailing slashes or http vs https

### App runs without authentication
- Check that environment variables are set correctly
- Make sure variables start with `REACT_APP_`
- Restart the dev server after adding `.env` file

### "CORS" or "Origin" errors
- Make sure your Vercel URL is added to Okta's allowed origins
- Check Okta application settings

## Security Notes

- Never commit `.env` files to git (already in `.gitignore`)
- Use Vercel's environment variables for production secrets
- Consider using different Okta apps for dev/staging/production

## Disabling Authentication (for testing)

To temporarily disable authentication:
- Remove or comment out the environment variables
- Restart the dev server
- The app will run without Okta protection

