import { Platform } from 'react-native';

 const LOCALHOST = Platform.OS === 'android'
 ? 'http://10.0.2.2:3000' // Android emulator special localhost
 : 'http://localhost:3000'; // iOS simulator & web
 
 export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? LOCALHOST;