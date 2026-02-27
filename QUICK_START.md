# REACH.MME - Quick Start Guide

## 🚀 What's New

Your REACH.MME app now has privacy controls and emergency contact features:

1. **Footer with Car Details** - Shows vehicle information in expandable section
2. **Privacy Toggle** - Users can hide/show contact details with PIN protection
3. **Emergency Contacts** - Always-visible India helplines (Police, Ambulance, Fire)
4. **Cloud Sync** - Preferences saved to Supabase

---

## ⚡ 30-Second Setup

### 1. **Create Database Table** (Required)
Copy this SQL and paste it in **Supabase → SQL Editor**:

```sql
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_key TEXT UNIQUE NOT NULL,
  show_details BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to user_preferences" ON user_preferences
  FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS user_preferences_user_key_idx ON user_preferences(user_key);
```

### 2. **Test the App**
1. Run your app locally
2. Scroll to footer
3. Click "Car Details & Preferences"
4. Toggle "Show Contact Details"
5. Enter PIN: `26112002`
6. ✅ Done!

---

## 📱 User Features

### Hide Details (e.g., While Driving)
```
Footer → Car Details & Preferences → Toggle OFF → Enter PIN
```

### Show Details
```
Footer → Car Details & Preferences → Toggle ON → Enter PIN
```

### Emergency Call
```
Footer → Click any emergency number (Police/Ambulance/Fire)
```

---

## 🔧 Customization

### Change PIN (Default: 26112002)
**File:** `src/hooks/usePreferences.ts` (Line 5)
```typescript
const DEFAULT_PIN = 'YOUR_PIN_HERE';
```

### Update Car Details
**File:** `src/components/FooterContent.tsx` (Lines 81-87)
```typescript
<p><span className="font-medium">Model:</span> Your Car Model</p>
<p><span className="font-medium">License Plate:</span> AB 12 CD 1234</p>
<p><span className="font-medium">Color:</span> Your Color</p>
```

### Change Emergency Contacts
**File:** `src/components/EmergencyContacts.tsx` (Lines 3-14)
```typescript
const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '100', icon: '🚔' },
  { name: 'Ambulance', number: '102', icon: '🚑' },
  { name: 'Fire', number: '101', icon: '🚒' },
  { name: 'Your Contact', number: '1234567890', icon: '📞' },
];
```

---

## 📋 Files Created

```
✅ src/components/FooterContent.tsx      (Main footer)
✅ src/components/PreferenceModal.tsx    (PIN dialog)
✅ src/components/EmergencyContacts.tsx  (Emergency numbers)
✅ src/hooks/usePreferences.ts           (Logic & Supabase)
✅ public/favicon.ico                    (App icon)
```

---

## 🧪 Test Checklist

- [ ] Database table created
- [ ] PIN modal appears on toggle
- [ ] Correct PIN (26112002) works
- [ ] Wrong PIN shows error
- [ ] Preference saves after PIN entry
- [ ] Preference persists after page refresh
- [ ] Emergency numbers open phone app
- [ ] Favicon shows in browser tab

---

## ⚠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| PIN modal doesn't appear | Check if Switch component is imported in FooterContent |
| Preferences not saving | Run SQL migration and check Supabase credentials |
| "Failed to load preferences" | Verify VITE_SUPABASE_URL and key in `.env` |
| Favicon not showing | Clear browser cache and hard refresh (Ctrl+Shift+R) |

---

## 📚 Full Documentation

- **SETUP_INSTRUCTIONS.md** - Detailed database and feature setup
- **FEATURES_ADDED.md** - Complete feature list and specs
- **This file** - Quick reference

---

## 🚀 Deploy to Production

1. ✅ Update car details with real vehicle info
2. ✅ Consider changing PIN (26112002 → your PIN)
3. ✅ Test all features in preview
4. ✅ Deploy to Vercel
5. ✅ Share your REACH.MME card!

---

**Questions?** Check SETUP_INSTRUCTIONS.md for detailed guides.
