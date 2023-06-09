# ReactInternationalization (r22n)

A zero-configuration language translation interface for react written 
in typescript.

## Why?

Another alternative solution is `react-i18next`.

But, I needed a very light weight expressive translator that I can 
plugin any session handler and handles the ordering of phrases and 
variables better. 

## Install

```bash
$ npm install r22n
```

## Usage

Open `App.tsx` and add the `R22nProvider` component around the main 
`Component`.

```jsx
import { R22nProvider } from 'r22n';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <R22nProvider>
      <Component {...pageProps} session={pageProps.session} />
    </R22nProvider>
  );
};
```

Also add a default `language` and `translations` like the following. 
Include `language` and `translations` in the `R22nProvider` props.

```jsx
import type { AppProps } from 'next/app';
import { R22nProvider } from 'r22n';

const language = 'klingon';
const translations = {
  "Hello World": "qo' vIvan",
  "%s User": "tera'ngan %s",
  "Welcome %s": "yI'el %s",
  "You are %s years old": "%s ben ghu'"
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <R22nProvider language={language} translations={translations}>
      <Component {...pageProps} session={pageProps.session} />
    </R22nProvider>
  );
};
```

Next in `index.tsx` import the `useLanguage` hook and the `Translate` 
component. You can now translate phrases in the following ways.

```jsx
import { useLanguage, Translate } from 'r22n';

const Page = () => {
  const { _, t } = useLanguage();  
  const name = 'Chris';
  const role = 'Admin';
  return (
    <div>
      <h2>Inline Tranlation</h2>
      <p>{_('Hello World')}</p>
      <h2>Inline Tranlation with Variables</h2>
      <p>{_('%s User', role)}</p>
      <h2>String Literal Translations</h2>
      <p>{t`Welcome ${name}`}</p>
      <h2>Translate Component</h2>
      <Translate>You are <strong>22</strong> years old</Translate>
      <h2>Translate Component with Variables</h2>
      <Translate values={[ 22 ]}>You are %s years old</Translate>
    </div>
  );
};

export default Page;
```

Next, let's add a language switcher. First create a list of 
languages and translations like the following.

```jsx
const languages: Record<string, Record<string, string>> = {
  klingon: {
    "Hello World": "qo' vIvan",
    "%s User": "tera'ngan %s",
    "Welcome %s": "yI'el %s",
    "You are %s years old": "%s ben ghu'"
  },
  english: {
    "Hello World": "Hello World",
    "%s User": "%s User",
    "Welcome %s": "Welcome %s",
    "You are %s years old": "You are %s years old"
  }
};
```

Create a handler for `changeLanguage` and add listeners in the rendered 
component section like below.

```jsx
const Page = () => {
  const { _, t, language, changeLanguage } = useLanguage();  
  const name = 'Chris';
  const change = (language: string) => {
    changeLanguage(language, languages[language]);
  };
  return (
    <div className="p-4">
      <button onClick={() => change('english')}>
        Change to English
      </button>
      <button onClick={() => change('klingon')}>
        Change to Klingon
      </button>
      <h2>Inline Tranlation</h2>
      <p>{_('Hello World')}</p>
      <h2>Inline Tranlation with Variables</h2>
      <p>{_('%s User', role)}</p>
      <h2>String Literal Translations</h2>
      <p>{t`Welcome ${name}`}</p>
      <h2>Translate Component</h2>
      <Translate>You are <strong>22</strong> years old</Translate>
    </div>
  );
};
```