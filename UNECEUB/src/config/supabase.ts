import 'react-native-url-polyfill/auto'; // Obrigatório para React Native
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

// =========================================================================
// ATENÇÃO: SUBSTITUA ESSES PLACEHOLDERS PELAS SUAS CHAVES DO SUPABASE
// =========================================================================
const SUPABASE_URL = 'https://bvygnddixyrftfxrfttd.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2eWduZGRpeHlyZnRmeHJmdHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3NzI3MTIsImV4cCI6MjA4MDM0ODcxMn0.blCWCKm39pRe9dH2zNu4dHrARRuvHSzRPRXXSu9z9FI'; 

// Adaptador para usar o Expo SecureStore como storage da autenticação
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

// Cria o cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});