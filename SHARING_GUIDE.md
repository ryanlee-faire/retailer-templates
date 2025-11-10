# Sharing Your Retailer Template with Your Team

## Quick Steps to Deploy & Share

### 1. Deploy to Vercel (Automatic via GitHub)

Since Vercel is connected to your GitHub repository, deployments happen automatically when you push to GitHub:

```bash
# Add all changes
git add .

# Commit
git commit -m "Add Okta authentication and latest updates"

# Push to GitHub (this triggers Vercel deployment)
git push
```

**That's it!** Vercel will automatically:
- Build your project
- Deploy it to a URL like: `https://retailer-templates-xxxxx.vercel.app`
- Create a new deployment for every push

### 2. Get Your Deployment URL

After pushing, you can find your URL in two ways:

**Option A: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign in (if you see Vercel connected in GitHub, you should have access)
3. Find your project: `retailer-templates` (or whatever it's named)
4. Click on it to see the deployment URL

**Option B: GitHub**
1. Go to your GitHub repository
2. Look for the Vercel deployment status (usually shows as a checkmark or link)
3. Click the "Details" link to see the deployment

### 3. Share with Your Team

**Without Authentication (Current State):**
- Just share the Vercel URL: `https://your-app.vercel.app`
- Anyone with the link can access it
- Works immediately after deployment

**With Okta Authentication (After Setup):**
- Share the same URL: `https://your-app.vercel.app`
- Team members will be prompted to log in with Okta
- Only people in your Okta organization can access

### 4. Custom Domain (Optional)

If you want a custom domain like `retailer-template.faire.com`:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS (Vercel will provide instructions)
4. Share the custom URL with your team

### 5. Preview Deployments

Every time you push to a branch, Vercel creates a **preview deployment**:
- Main branch → Production URL (stable)
- Other branches → Preview URL (for testing)

You can share preview URLs with your team to review changes before merging.

## Tips

- **Automatic Deployments**: Every push to GitHub = new deployment
- **Instant Updates**: Changes go live in ~1-2 minutes
- **Preview URLs**: Great for getting feedback before merging PRs
- **No Downtime**: Vercel handles deployments with zero downtime

## Troubleshooting

**Can't see Vercel dashboard?**
- Check if you're signed in with the right account
- Ask your team admin to add you to the Vercel team

**Deployment failed?**
- Check the Vercel dashboard for error logs
- Make sure `npm run build` works locally first

**Want to disable auto-deploy?**
- Go to Vercel Dashboard → Settings → Git
- You can pause deployments or change settings

