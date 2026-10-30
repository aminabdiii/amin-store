<h1 align="center"><a href="https://amin-store-xi.vercel.app">AMiN STORE 🔗</a></h1>

### Local setup

Use Node **26.13.0 LTS** with nvm:

```sh
nvm install
nvm use
npm ci
npm run dev
```

The project pins Node in `.nvmrc` and uses the official npm registry through
`.npmrc`. `nvm use` selects Node for the current shell; it does not change your
default Node version for other projects. Run `nvm use` again in a new shell.

### Dependency checks

```sh
npm ls --all
npm test
npm run build
npm audit
```

`npm audit` needs an online connection to the npm advisory service. Do not treat
`npm audit --offline` as a security check: npm skips fetching advisories in offline
mode. With packages already cached, `npm ci --offline --no-audit` supports a clean
offline installation; tests use mocked network requests.

Article creation and editing use Tiptap's MIT-licensed editor packages. Existing
CKEditor HTML remains supported, including its content classes, tables, linked
images, captions, text sizes and highlight colors. Opening and saving an article
without editing its body preserves the original HTML exactly. No editor license
key or content migration is required.

### Backend connection

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to the REST API root, including `/api/v1`. The local default is `http://localhost:3001/api/v1`; `VITE_API_TIMEOUT_MS` defaults to `8000` milliseconds. Restart Vite after changing environment files, and rebuild when changing deployment settings because Vite embeds public variables at build time.

The backend's `CORS_ORIGINS` must allow the frontend origin (normally `http://localhost:5173`). Image URLs come from API responses and the backend's media configuration. No database credentials, signing keys, or administrator secrets belong in frontend environment variables. Existing sessions require signing in again after switching to this API.

`npm test` runs offline tests with mocked network requests. `npm run build` checks the production bundle.

### Developed with Vite & React. Project overview 👇

<img src="https://raw.githubusercontent.com/aminabdiii/amin-store/refs/heads/master/public/amin-store-performance.png" alt="performance"/>

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<img src="./images/7.png" alt="image 7" />
<img src="./images/1.png" alt="image 1" />
<img src="./images/2.png" alt="image 2" />
<img src="./images/3.png" alt="image 3" />
<img src="./images/4.png" alt="image 4" />
<img src="./images/5.png" alt="image 5" />
<img src="./images/6.png" alt="image 6" />
<img src="./images/8.png" alt="image 6" />
