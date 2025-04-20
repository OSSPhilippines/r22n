'use client';
//types
import type { ReactNode } from 'react';
//hooks
import { useContext } from 'react';
//components
import R22nContext from '../context.js';

export default function useLanguage() {
  const { 
    language, 
    placeholder,
    translations,
    changeLanguage
  } = useContext(R22nContext);

  const engine = {
    //the current language
    language,
    //change language
    changeLanguage,
    //translate engine
    template(phrase: string) {
      //get the translation (by default it's the original phrase)
      const translation = translations[phrase] ?? phrase;
      const chunks = translation.split(placeholder);
      return function Translation(...variables: ReactNode[]) {
        //if no chunks, just return the translation
        if (translation.indexOf(placeholder) < 0) return translation;
        //build the children
        const children: ReactNode[] = [];
        chunks.forEach((chunk, i) => {
          //push the chunk
          children.push(chunk);
          //if theres a variable
          if (variables[i]) {
            //also push this
            children.push(variables[i]);
          }
        });
        const allStrings = children.filter(
          child => typeof child === 'string'
        ).length === children.length;
        if (allStrings) {
          return children.join('')
        }
        //return the rendered chunk
        return (<>{...children}</>);
      };
    },
    //translate inline
    t(phrase: TemplateStringsArray, ...variables: ReactNode[]) {
      return engine.template(phrase.join(placeholder))(...variables);
    },
    //quick string to string translation
    _(phrase: string, ...variables: (string|number)[]) {
      return engine.template(phrase)(...variables) as string;
    }
  };

  return engine;
};