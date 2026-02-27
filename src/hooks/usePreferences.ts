import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_PIN = '26112002';
const DEVICE_KEY_STORAGE = 'reachme_device_key';

export interface UserPreferences {
  showDetails: boolean;
  userKey: string;
}

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Save preferences to Supabase
  const savePreferences = async (showDetails: boolean) => {
    try {
      const deviceKey = getDeviceKey();
      
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

      setPreferences({
        showDetails,
        userKey: deviceKey,
      });
      setError(null);
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
  }, []);

  return {
    preferences,
    loading,
    error,
    savePreferences,
    verifyPin,
  };
};
