import { ReactNode } from 'react';

export type Language = {
  language: string,
  translations: Record<string, string>
};

export type R22nContextProps = {
  language: string,
  placeholder: string,
  translations: Record<string, string>,
  changeLanguage: (language: string, translations?: Record<string, string>) => void
};

export type R22nProviderProps = {
  language?: string,
  placeholder?: string,
  translations?: Record<string, string>,
  children: ReactNode
};

