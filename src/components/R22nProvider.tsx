'use client';
//types
import type { Language, R22nProviderProps } from '../types';
//hooks
import { useState } from 'react';
//context
import R22nContext from '../context';

/**
 * The i18n provider (this is what to put in app.tsx)
 */
const R22nProvider: React.FC<R22nProviderProps> = (props) => {
  //extract config from props
  const { children, ...config } = props;
  //set default translations
  if (!config.translations) {
    config.translations = {};
  }
  //create a language state
  const [ language, set ] = useState<Language>({
    language: config.language || 'en_US',
    translations: config.translations || {}
  });
  //when the language changes, update the language state
  const changeLanguage = (language: string, translations?: Record<string, string>) => {
    if (!translations) {
      translations = {};
    }
    set({ language, translations });
  };
  
  //use the language state in the provider
  const value = {
    placeholder: config.placeholder || '%s',
    language: language.language,
    translations: language.translations,
    changeLanguage
  };
  
  return (
    <R22nContext.Provider value={value}>
      {children}
    </R22nContext.Provider>
  );
};

export default R22nProvider;