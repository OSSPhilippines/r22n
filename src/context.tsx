'use client';
//types
import type { R22nContextProps } from './types';
//helpers
import React from 'react';

/**
 * The i18n context
 */
const R22nContext = React.createContext<R22nContextProps>({
  changeLanguage: () => {},
  language: 'en_US',
  translations: {},
  placeholder: '%s'
});

export default R22nContext;



