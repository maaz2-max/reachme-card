import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_PIN = '26112002';
const DEVICE_KEY_STORAGE = 'reachme_device_key';
const AUTO_LOGOUT_DELAY = 60000; // 60 seconds

export interface UserPreferences {
  showDetails: boolean;
  userKey: string;
}

export interface UsePreferencesReturn {
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
  savePreferences: (showDetails: boolean) => Promise<void>;
  verifyPin: (pin: string) => boolean;
  isAutoLogoutActive: boolean;
  autoLogoutCountdown: number;
  cancelAutoLogout: () => void;
}

export const usePreferences = (): UsePreferencesReturn => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoLogoutActive, setIsAutoLogoutActive] = useState(false);
  const [autoLogoutCountdown, setAutoLogoutCountdown] = useState(0);
  const [autoLogoutTimer, setAutoLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null);

  // Generate or retrieve device key
  const getDeviceKey = () => {
    let key = localStorage.getItem(DEVICE_KEY_STORAGE);
    if (!key) {
      key = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(DEVICE_KEY_STORAGE, key);
    }
    return key;
  };

  // Load preferences from Supabase
  const loadPreferences = async () => {
    try {
      setLoading(true);
      const deviceKey = getDeviceKey();
      
      const { data, error: fetchError } = await supabase
        .from('user_preferences')
        .select('show_details')
        .eq('user_key', deviceKey)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is okay
        throw fetchError;
      }

      setPreferences({
        showDetails: data?.show_details ?? true,
        userKey: deviceKey,
      });
      setError(null);
    } catch (err) {
      console.error('[v0] Error loading preferences:', err);
      // Fallback to default if Supabase fails
      setPreferences({
        showDetails: true,
        userKey: getDeviceKey(),
      });
      setError(err instanceof Error ? err.message : 'Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  // Cancel auto logout
  const cancelAutoLogout = () => {
    if (autoLogoutTimer) clearTimeout(autoLogoutTimer);
    if (countdownTimer) clearInterval(countdownTimer);
    setIsAutoLogoutActive(false);
    setAutoLogoutCountdown(0);
  };

  // Save preferences to Supabase with immediate UI update
  const savePreferences = async (showDetails: boolean) => {
    try {
      // Immediately update UI
      const deviceKey = getDeviceKey();
      setPreferences({
        showDetails,
        userKey: deviceKey,
      });
      setError(null);

      // If turning OFF, start auto logout timer
      if (!showDetails) {
        setIsAutoLogoutActive(true);
        setAutoLogoutCountdown(AUTO_LOGOUT_DELAY / 1000); // Convert to seconds

        // Start countdown timer
        const countdown = setInterval(() => {
          setAutoLogoutCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setCountdownTimer(countdown);

        // Set auto logout timeout
        const timer = setTimeout(() => {
          setPreferences({
            showDetails: true,
            userKey: deviceKey,
          });
          setIsAutoLogoutActive(false);
          clearInterval(countdown);
        }, AUTO_LOGOUT_DELAY);
        setAutoLogoutTimer(timer);
      }

      // Save to Supabase in background
      const { error: upsertError } = await supabase
        .from('user_preferences')
        .upsert(
          {
            user_key: deviceKey,
            show_details: showDetails,
          },
          { onConflict: 'user_key' }
        );

      if (upsertError) throw upsertError;
    } catch (err) {
      console.error('[v0] Error saving preferences:', err);
      setError(err instanceof Error ? err.message : 'Failed to save preferences');
    }
  };

  // Verify PIN
  const verifyPin = (pin: string): boolean => {
    return pin === DEFAULT_PIN;
  };

  // Initialize preferences on mount
  useEffect(() => {
    loadPreferences();

    // Cleanup on unmount
    return () => {
      if (autoLogoutTimer) clearTimeout(autoLogoutTimer);
      if (countdownTimer) clearInterval(countdownTimer);
    };
  }, []);

  return {
    preferences,
    loading,
    error,
    savePreferences,
    verifyPin,
    isAutoLogoutActive,
    autoLogoutCountdown,
    cancelAutoLogout,
  };
};
