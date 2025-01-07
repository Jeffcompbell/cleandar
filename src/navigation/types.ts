export type RootStackParamList = {
  Year: undefined;
  Month: { year: number; month: number };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 