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
    <div>
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

## Contributing

Thanks for being an awesome developer! We are always looking for 
contributors and sponsors. If your interested, 
[contact us](https://github.com/OSSPhilippines) so we can discuss. 
Clone this repo and run the following commands in the project folder.

```js
$ yarn
$ yarn build
```

Please follow the steps below to properly contribute to this repository.

> Do not commit code that is not related to a GitHub issue!

> Please tag all your commits with `[type]/[issue#]`.

> Please include the time it took per commit. ie. `1s` or `1h`.

 1. Per issue on Github, you should create a branch. example: `[type]/[issue#]`
    - Per feature you should create a feature branch. ie. `feature/1001`.
    - Per bug you should create a fix branch. ie. `fix/1002`.
    - Per task you should create a task branch. ie. `task/1003`
 2. Commits need to reference the issue that is being worked on. example: `updated copy #1004` or `fixes #1005`
    - It's also good to to add the amount of time to your commit message. example: `fixed button #1006 30m` or `built awsome feature #1007 16h`
 3. When you are finished with your branch, you should create a pull request back to the `main` branch.
    - Assign another developer to review your code. 
    - All contributors are expected to both write and review code. 
    - Ask [Dev lead](https://github.com/cblanquera) for assignments.