# Authentication Setup Guide for TradesQuest

This guide will help you set up authentication for the TradesQuest mobile app using Google OAuth, Apple Sign-In, and email authentication.

## 🚀 Quick Start

1. **Copy Environment Variables**
   ```bash
   cp .env.example .env
   ```

2. **Configure OAuth Providers** (see detailed steps below)

3. **Update App Configuration**
   ```bash
   # Update app.json with your app scheme
   "scheme": "tradesquest"
   ```

## 📱 Google Authentication Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API

### 2. Configure OAuth Consent Screen

1. Navigate to **APIs & Services > OAuth consent screen**
2. Choose **External** user type
3. Fill in required information:
   - App name: "TradesQuest"
   - User support email: your email
   - Developer contact: your email

### 3. Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client IDs**

#### For Web Application:
- Application type: **Web application**
- Name: "TradesQuest Web"
- Authorized redirect URIs: `https://auth.expo.io/@your-username/your-app-slug`

#### For iOS:
- Application type: **iOS**
- Name: "TradesQuest iOS"
- Bundle ID: your app's bundle identifier

#### For Android:
- Application type: **Android**
- Name: "TradesQuest Android"
- Package name: your app's package name
- SHA-1 certificate fingerprint: (get from `expo credentials:manager`)

### 4. Update Environment Variables

```env
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

## 🍎 Apple Sign-In Setup (iOS Only)

### 1. Apple Developer Account Setup

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Select your App ID
4. Enable **Sign In with Apple** capability

### 2. Configure App

```env
EXPO_PUBLIC_APPLE_CLIENT_ID=your.app.bundle.id
```

### 3. Update app.json

```json
{
  "expo": {
    "ios": {
      "usesAppleSignIn": true
    }
  }
}
```

## 🔥 Firebase Setup (Optional - Advanced Features)

Firebase provides additional authentication features like phone auth, email verification, and user management.

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication
4. Configure sign-in methods (Google, Apple, Email/Password)

### 2. Get Configuration

1. Go to Project Settings
2. Add your app (Web, iOS, Android)
3. Copy configuration values

### 3. Update Environment Variables

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## 📦 Required Dependencies

The following packages are already included in package.json:

```json
{
  "expo-auth-session": "~6.1.2",
  "expo-crypto": "~14.1.3",
  "expo-web-browser": "~14.1.5",
  "@react-native-google-signin/google-signin": "^13.1.0",
  "firebase": "^11.1.0"
}
```

## 🔧 Platform-Specific Configuration

### Web Configuration

For web deployment, you'll need to configure your domain in:
1. Google Cloud Console (Authorized domains)
2. Firebase Console (Authorized domains)

### Mobile Configuration

For mobile builds, you'll need:
1. Proper bundle identifiers
2. Certificate fingerprints
3. App Store/Play Store configuration

## 🛠️ Development vs Production

### Development
- Use Expo development builds
- Test with Expo Go (limited auth support)
- Use localhost redirects for web

### Production
- Configure production domains
- Set up proper app store listings
- Use production OAuth credentials

## 🔐 Security Best Practices

1. **Never commit credentials** to version control
2. **Use different credentials** for development/production
3. **Implement proper token storage** (secure storage)
4. **Add rate limiting** for authentication attempts
5. **Validate tokens server-side** for sensitive operations

## 📱 Testing Authentication

### Web Testing
```bash
npx expo start --web
```

### Mobile Testing
```bash
# Create development build
npx expo run:ios
npx expo run:android
```

### Expo Go Limitations
- Google Sign-In requires development build
- Apple Sign-In requires development build
- Email/password works in Expo Go

## 🚨 Common Issues

### Google Sign-In Not Working
- Check client ID configuration
- Verify redirect URIs
- Ensure Google+ API is enabled
- Check bundle ID/package name matches

### Apple Sign-In Issues
- Verify Apple Developer account setup
- Check bundle ID configuration
- Ensure capability is enabled

### Redirect URI Mismatch
- Update OAuth provider settings
- Check app.json scheme configuration
- Verify environment variables

## 📚 Additional Resources

- [Expo Authentication Guide](https://docs.expo.dev/guides/authentication/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign-In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)

## 🎯 Next Steps

1. Set up your OAuth providers
2. Configure environment variables
3. Test authentication flow
4. Implement user profile management
5. Add password reset functionality
6. Set up email verification
7. Implement social login analytics

Remember to test thoroughly on all target platforms before deploying to production!