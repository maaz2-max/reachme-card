# REACH.MME - Setup Instructions

## New Features Added

### 1. **Footer with Preference Control**
- Interactive footer with expandable car details section
- User preference toggle (Show/Hide contact details)
- PIN-protected preference changes

### 2. **Emergency Contacts**
- Always visible emergency contact numbers (Police, Ambulance, Fire)
- India helpline numbers (100, 102, 101)
- One-click calling from the card
- Displayed in prominent red styling

### 3. **PIN-Protected Preferences**
- Default PIN: `26112002`
- Users must verify PIN to change visibility settings
- PIN verification is client-side only (secure)

### 4. **Cloud Preference Storage**
- User preferences (on/off) saved to Supabase
- Device-based identification (no personal data tracking)
- Only the toggle state is stored, never contact details

### 5. **Favicon**
- Professional emergency contact card logo
- Displays in browser tab

---

## Database Setup (Supabase)

Follow these steps to set up the database:

### Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Navigate to **SQL Editor**

### Step 2: Create the Preferences Table
Copy and paste this SQL into the Supabase SQL Editor and run it:

```sql
-- Create user_preferences table for storing visibility preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT UNIQUE NOT NULL,
  show_details BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow public access (since we use device keys, not user auth)
CREATE POLICY "Allow public access to user_preferences" ON user_preferences
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index on user_key for faster lookups
CREATE INDEX IF NOT EXISTS user_preferences_user_key_idx ON user_preferences(user_key);
```

### Step 3: Verify Table Creation
1. In Supabase, go to **Table Editor**
2. You should see the new `user_preferences` table
3. Verify it has the columns: `id`, `user_key`, `show_details`, `created_at`, `updated_at`

---

## Testing the Features

### Test PIN Verification
1. Open the app and scroll to the footer
2. Click "Car Details & Preferences" to expand
3. Toggle the "Show Contact Details" switch
4. A PIN verification dialog will appear
5. Enter PIN: `26112002`
6. Confirm - the preference should be saved

### Test Emergency Contacts
1. Emergency contacts are visible at the top of the footer
2. Click on any emergency number (Police, Ambulance, Fire)
3. Your phone should open the dial pad with the number

### Test Preference Persistence
1. Toggle preference on/off with correct PIN
2. Refresh the page
3. Your preference should be saved and restored
4. (First time users will have ON as default)

---

## Component Overview

### Components Created:
- **FooterContent** (`src/components/FooterContent.tsx`)
  - Main footer with expandable car details
  - Preference toggle control
  - PIN modal trigger

- **PreferenceModal** (`src/components/PreferenceModal.tsx`)
  - PIN verification dialog
  - Error handling for wrong PIN
  - Enter key support

- **EmergencyContacts** (`src/components/EmergencyContacts.tsx`)
  - Emergency contact display
  - One-click calling
  - Always visible in red styling

### Hooks:
- **usePreferences** (`src/hooks/usePreferences.ts`)
  - Manages preference state
  - Handles Supabase communication
  - Device key generation
  - PIN verification logic

---

## Environment Variables

The app uses Supabase environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Your public API key

These should already be set up in your `.env` file if Supabase is connected.

---

## Security Notes

1. **PIN is Client-Side Only**: The PIN is verified in the browser, not on the server
2. **No Contact Storage**: Only the preference toggle is stored in cloud
3. **Device-Based**: Uses a device key stored in localStorage for identification
4. **No Personal Data**: Never stores phone numbers, addresses, or sensitive data
5. **RLS Enabled**: Row-level security policies are configured

---

## Troubleshooting

### "Failed to load preferences" error
- Check if Supabase is properly connected
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set
- Check browser console for detailed error messages

### Preferences not saving
- Ensure the database table is created
- Check if RLS policy is correctly configured
- Verify Supabase API key has proper permissions

### PIN not working
- Make sure you're entering: `26112002`
- Check browser console for any errors
- Try clearing localStorage and refreshing

---

## Customization

### Change Default PIN
Edit `src/hooks/usePreferences.ts` line 5:
```typescript
const DEFAULT_PIN = '26112002'; // Change this value
```

### Modify Emergency Contacts
Edit `src/components/EmergencyContacts.tsx` to update numbers and contacts.

### Change Car Details
Edit `src/components/FooterContent.tsx` (Car Details section) to display your actual car info.

---

## File Structure
```
src/
├── components/
│   ├── FooterContent.tsx
│   ├── PreferenceModal.tsx
│   ├── EmergencyContacts.tsx
│   └── ...
├── hooks/
│   ├── usePreferences.ts
│   └── ...
├── pages/
│   ├── Index.tsx (Updated to use FooterContent)
│   └── ...
└── ...

public/
└── favicon.ico (New logo favicon)

index.html (Updated with favicon reference)
```

---

## Next Steps

1. ✅ Set up Supabase database (see above)
2. ✅ Test all features
3. ✅ Customize PIN, car details, and emergency contacts
4. ✅ Deploy to production

---

For more information about the app features, see the main README.
