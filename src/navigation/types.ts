import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Year: {
    selectedDate?: string;
  };
  Month: {
    year: number;
    month: number;
  };
  Upcoming: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 