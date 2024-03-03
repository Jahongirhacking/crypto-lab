import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { Cryptocurrencies, Exchanges, Homepage, News } from './pages';
import { RootLayout, DefaultLayout } from "./layouts";
import { Alert } from 'antd';
import { Provider } from 'react-redux';
import store from './app/store.ts';
import routePaths from './routes/routePaths.ts';
import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={routePaths.HOME}
      element={<RootLayout />}
    >
      <Route
        path=""
        element={<DefaultLayout />}
      >
        <Route
          index={true}
          element={<Homepage />}
        />
        <Route
          path={routePaths.CRYPTO_CURRENCIES}
          element={<Cryptocurrencies />}
        />
        <Route
          path={routePaths.EXCHANGES}
          element={<Exchanges />}
        />
        <Route
          path={routePaths.NEWS}
          element={<News />}
        />
      </Route>
      <Route
        path="*"
        element={
          <Alert
            message="Page Not Found :("
            type="error"
            style={{
              margin: "100px auto",
              width: "95%",
              padding: "20px"

            }} />
        } />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
