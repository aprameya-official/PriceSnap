import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Custom storage adapter for Expo SecureStore
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      return Promise.resolve(localStorage.getItem(key));
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types (will be auto-generated from your Supabase schema)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          product_name: string;
          product_category: string;
          product_image: string;
          target_price: number;
          current_best_price: number;
          current_best_platform: string;
          price_alert_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_name: string;
          product_category: string;
          product_image: string;
          target_price: number;
          current_best_price: number;
          current_best_platform: string;
          price_alert_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_name?: string;
          product_category?: string;
          product_image?: string;
          target_price?: number;
          current_best_price?: number;
          current_best_platform?: string;
          price_alert_enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      price_alerts: {
        Row: {
          id: string;
          user_id: string;
          product_name: string;
          old_price: number;
          new_price: number;
          platform: string;
          savings: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_name: string;
          old_price: number;
          new_price: number;
          platform: string;
          savings: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_name?: string;
          old_price?: number;
          new_price?: number;
          platform?: string;
          savings?: number;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          total_savings: number;
          total_comparisons: number;
          active_favorites: number;
          active_alerts: number;
          monthly_rank: number;
          streak_days: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_savings?: number;
          total_comparisons?: number;
          active_favorites?: number;
          active_alerts?: number;
          monthly_rank?: number;
          streak_days?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_savings?: number;
          total_comparisons?: number;
          active_favorites?: number;
          active_alerts?: number;
          monthly_rank?: number;
          streak_days?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}