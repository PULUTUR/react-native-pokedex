import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Colors, Fonts } from '@/constants/theme';
import { queryClient } from '@/services/query-client';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [Fonts.regular]: require('@/assets/fonts/Rubik-Regular.ttf'),
    [Fonts.medium]: require('@/assets/fonts/Rubik-Medium.ttf'),
    [Fonts.semiBold]: require('@/assets/fonts/Rubik-SemiBold.ttf'),
    [Fonts.bold]: require('@/assets/fonts/Rubik-Bold.ttf'),
  });
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      />
    </QueryClientProvider>
  );
}
