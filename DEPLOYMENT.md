# Deployment Guide with Okta Authentication

## Option 1: Vercel (Recommended - Easiest)

### Quick Setup:
1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Add Okta Authentication**:

   **Option A: Using Vercel Middleware (Recommended)**
   - Create `vercel.json` in the root directory (see below)
   - Configure Okta in Vercel dashboard under "Security" → "Authentication"

   **Option B: Using Okta React SDK (More Control)**
   - Install Okta React SDK:
     ```bash
     npm install @okta/okta-react @okta/okta-auth-js
     ```
   - Integrate into your React app (see implementation below)

### Vercel Configuration File

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Option 2: Netlify

### Quick Setup:
1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

3. **Add Okta**:
   - Use Netlify Identity with Okta as the identity provider
   - Or integrate Okta React SDK directly

### Netlify Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Option 3: Okta React SDK Integration (Works with any hosting)

### Step 1: Install Dependencies
```bash
npm install @okta/okta-react @okta/okta-auth-js
```

### Step 2: Create Okta Configuration

Create `src/config/okta.ts`:
```typescript
import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER || '',
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID || '',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
});

export default oktaAuth;
```

### Step 3: Wrap App with Okta Provider

Update `src/App.tsx`:
```typescript
import { Security } from '@okta/okta-react';
import oktaAuth from './config/okta';

// Wrap your BrowserRouter with Security
<Security oktaAuth={oktaAuth}>
  <BrowserRouter>
    {/* existing routes */}
  </BrowserRouter>
</Security>
```

### Step 4: Create Login Component

Create `src/components/LoginCallback.tsx`:
```typescript
import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoginCallback = () => {
  const { oktaAuth } = useOktaAuth();
  const history = useHistory();

  useEffect(() => {
    oktaAuth.handleLoginRedirect().then(() => {
      history.push('/');
    });
  }, [oktaAuth, history]);

  return <div>Loading...</div>;
};
```

### Step 5: Add Protected Route Component

Create `src/components/ProtectedRoute.tsx`:
```typescript
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    oktaAuth.signInWithRedirect();
    return <div>Redirecting to login...</div>;
  }

  return <>{children}</>;
};
```

### Step 6: Environment Variables

Create `.env` (add to `.gitignore`):
```
REACT_APP_OKTA_ISSUER=https://your-domain.okta.com/oauth2/default
REACT_APP_OKTA_CLIENT_ID=your-client-id
```

---

## Option 4: Simple Password Protection (Quick Alternative)

If you just need basic security without full Okta setup:

### Using Vercel Password Protection:
- In Vercel dashboard → Project Settings → Deployments
- Enable "Password Protection"
- Set a password (shared with team)

### Using Netlify Password Protection:
- In Netlify dashboard → Site settings → Access control
- Enable "Password protection"

---

## Recommended Approach

**For fastest setup with Okta:**
1. Deploy to Vercel (free, easy)
2. Use Vercel's built-in authentication or Okta React SDK
3. Share the Vercel deployment URL with your team

**For production-ready Okta integration:**
1. Use Option 3 (Okta React SDK)
2. Deploy to Vercel or Netlify
3. Configure Okta application in Okta dashboard
4. Set environment variables in deployment platform

---

## Next Steps

1. Choose your deployment platform
2. Set up Okta application in Okta dashboard
3. Get your Okta issuer URL and client ID
4. Follow the steps for your chosen option above

