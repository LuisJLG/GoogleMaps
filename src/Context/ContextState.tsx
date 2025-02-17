import { SetStateAction, Dispatch } from 'react';
import { User } from '../Model/User';;

export type AppContextState = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  showNavBar: boolean;
  setShowNavBar: Dispatch<SetStateAction<boolean>>;
  stockFlag: boolean;
  setStockFlag: Dispatch<SetStateAction<boolean>>;
  quantityNextSell: string;
  setQuantityNextSell: Dispatch<SetStateAction<string>>;
  printerConnection: boolean;
  setPrinterConnection: Dispatch<SetStateAction<boolean>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
  isShowSplash: boolean;
  setIsShowSplash: Dispatch<SetStateAction<boolean>>;
  onboardingCompleted: boolean; // Nuevo estado para el onboarding
  setOnboardingCompleted: Dispatch<SetStateAction<boolean>>; // Función para actualizar el estado
  // Los demás estados que ya tienes
  setCaptureUri: Dispatch<SetStateAction<string | null>>;
};
