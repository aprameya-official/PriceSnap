import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { User, MapPin, Bell, Shield, CircleHelp as HelpCircle, Settings, ChevronRight, Target, Award, Wallet, LogOut, Moon, Sun, Monitor } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

interface UserStats {
  totalSavings: number;
  comparisons: number;
  favoriteItems: number;
  activeAlerts: number;
}

interface UserProfile {
  full_name: string | null;
  email: string;
  location: string | null;
}

export default function ProfileScreen() {
  const { colors, theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    totalSavings: 0,
    comparisons: 0,
    favoriteItems: 0,
    activeAlerts: 0,
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    full_name: null,
    email: '',
    location: null,
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, location')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('total_savings, total_comparisons, active_favorites, active_alerts')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user stats:', error);
        return;
      }

      if (data) {
        setUserStats({
          totalSavings: data.total_savings || 0,
          comparisons: data.total_comparisons || 0,
          favoriteItems: data.active_favorites || 0,
          activeAlerts: data.active_alerts || 0,
        });
      }
    } catch (error) {
      console.error('Error in fetchUserStats:', error);
    }
  };

  const handleThemeChange = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    Alert.alert('Theme Changed', `Switched to ${nextTheme} mode`);
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (!error) {
              router.replace('/(auth)/login');
            }
          },
        },
      ]
    );
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} color={colors.warning} />;
      case 'dark':
        return <Moon size={20} color="#8b5cf6" />;
      default:
        return <Monitor size={20} color={colors.secondary} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      default:
        return 'System';
    }
  };

  const StatCard = ({ icon, title, value, subtitle }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle: string;
  }) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    hasSwitch = false, 
    switchValue = false, 
    onSwitchChange,
    onPress 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={hasSwitch}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>{icon}</View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={'#FFFFFF'}
        />
      ) : (
        <ChevronRight size={20} color={colors.textTertiary} />
      )}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingVertical: 24,
      marginBottom: 20,
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    location: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(255, 107, 53, 0.2)' : '#FEF3C7',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    editButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.primary,
    },
    statsContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    statCard: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      flex: 1,
      alignItems: 'center',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statIcon: {
      marginBottom: 8,
    },
    statValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    statTitle: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
      marginBottom: 2,
    },
    statSubtitle: {
      fontSize: 10,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
    },
    achievementBanner: {
      backgroundColor: colors.colorScheme === 'dark' ? 'rgba(251, 191, 36, 0.2)' : '#FEF3C7',
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.warning,
    },
    achievementContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    achievementIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    },
    achievementText: {
      flex: 1,
    },
    achievementTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.warning,
      marginBottom: 4,
    },
    achievementDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.warning,
      lineHeight: 18,
    },
    settingsContainer: {
      paddingHorizontal: 20,
    },
    settingsSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.textSecondary,
      marginBottom: 12,
    },
    settingsGroup: {
      backgroundColor: colors.card,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: colors.colorScheme === 'dark' ? '#000000' : '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colors.colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 18,
    },
    appInfo: {
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 20,
    },
    appInfoText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textTertiary,
      marginBottom: 4,
    },
    appInfoSubtext: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textTertiary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>
                {userProfile.full_name || 'User'}
              </Text>
              <Text style={styles.userEmail}>{userProfile.email}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={colors.textSecondary} />
                <Text style={styles.location}>
                  {userProfile.location || 'Location not set'}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Edit Profile', 'Profile editing would open here')}>
            <Settings size={16} color={colors.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard
              icon={<Wallet size={20} color={colors.success} />}
              title="Total Savings"
              value={`₹${userStats.totalSavings}`}
              subtitle="This month"
            />
            <StatCard
              icon={<Target size={20} color={colors.secondary} />}
              title="Comparisons"
              value={userStats.comparisons.toString()}
              subtitle="All time"
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              icon={<Award size={20} color={colors.warning} />}
              title="Favorites"
              value={userStats.favoriteItems.toString()}
              subtitle="Items tracked"
            />
            <StatCard
              icon={<Bell size={20} color={colors.error} />}
              title="Active Alerts"
              value={userStats.activeAlerts.toString()}
              subtitle="Price watching"
            />
          </View>
        </View>

        {/* Achievement Banner */}
        <View style={styles.achievementBanner}>
          <View style={styles.achievementContent}>
            <View style={styles.achievementIcon}>
              <Award size={24} color={colors.warning} fill={colors.warning} />
            </View>
            <View style={styles.achievementText}>
              <Text style={styles.achievementTitle}>Smart Shopper! 🎉</Text>
              <Text style={styles.achievementDescription}>
                Welcome to PriceSnap! Start comparing prices to save money
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
          {/* Appearance */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={getThemeIcon()}
                title="Theme"
                subtitle={`Currently using ${getThemeLabel()}`}
                onPress={handleThemeChange}
              />
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<Bell size={20} color={colors.primary} />}
                title="Push Notifications"
                subtitle="Get notified about price drops and deals"
                hasSwitch={true}
                switchValue={notificationsEnabled}
                onSwitchChange={setNotificationsEnabled}
              />
              <SettingItem
                icon={<Target size={20} color={colors.success} />}
                title="Price Alerts"
                subtitle="Alert when items reach target price"
                hasSwitch={true}
                switchValue={priceAlerts}
                onSwitchChange={setPriceAlerts}
              />
            </View>
          </View>

          {/* Privacy & Location */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Privacy & Location</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<MapPin size={20} color={colors.secondary} />}
                title="Location Services"
                subtitle="Find nearby stores and better prices"
                hasSwitch={true}
                switchValue={locationSharing}
                onSwitchChange={setLocationSharing}
              />
              <SettingItem
                icon={<Shield size={20} color={colors.textSecondary} />}
                title="Privacy Settings"
                subtitle="Manage your data and privacy preferences"
                onPress={() => Alert.alert('Privacy Settings', 'Privacy settings would open here')}
              />
            </View>
          </View>

          {/* Support */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<HelpCircle size={20} color={colors.textSecondary} />}
                title="Help & FAQ"
                subtitle="Get answers to common questions"
                onPress={() => Alert.alert('Help & FAQ', 'Help section would open here')}
              />
              <SettingItem
                icon={<Settings size={20} color={colors.textSecondary} />}
                title="App Settings"
                subtitle="Customize your app experience"
                onPress={() => Alert.alert('App Settings', 'App settings would open here')}
              />
            </View>
          </View>

          {/* Account */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon={<LogOut size={20} color={colors.error} />}
                title="Sign Out"
                subtitle="Sign out of your account"
                onPress={handleSignOut}
              />
            </View>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>PriceSnap v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Made with ❤️ for smart shoppers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}