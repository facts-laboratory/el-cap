import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { connectRoutes } from 'redux-first-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import page, { routesMap } from './routes/pages';
import {
  COIN_CHART_FEATURE_KEY,
  coinChartReducer,
} from './coin-chart/coin-chart.slice';
import { feedReducer, FEED_FEATURE_KEY } from './feed/feed.slice';
import { coinReducer, COIN_FEATURE_KEY } from './coin/coin.slice';
import {
  CONTRACTS_FEATURE_KEY,
  contractsReducer,
} from './contracts/contracts.slice';
import { USER_FEATURE_KEY, userReducer } from './user/user.slice';
import {
  WATCHLIST_FEATURE_KEY,
  watchlistReducer,
} from './watchlist/watchlist.slice';

const { reducer, middleware, enhancer } = connectRoutes(routesMap, {
  basename: '#',
});

const persistConfig = {
  key: 'user',
  storage: storage,
  whitelist: [USER_FEATURE_KEY], // Only persist the user reducer
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    location: reducer,
    [FEED_FEATURE_KEY]: feedReducer,
    [COIN_FEATURE_KEY]: coinReducer,
    [CONTRACTS_FEATURE_KEY]: contractsReducer,
    [USER_FEATURE_KEY]: persistedReducer,
    [COIN_CHART_FEATURE_KEY]: coinChartReducer,
    [WATCHLIST_FEATURE_KEY]: watchlistReducer,
    page,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This is required to use thunks in ./routes/pages.ts
      serializableCheck: { ignoredPaths: ['location'] },
    }).concat(middleware),
  devTools: import.meta.env['ENVIRONMENT'] !== 'prod',
  // Optional Redux store enhancers
  enhancers: (defaultEnhancers) => [
    ...defaultEnhancers,
    enhancer,
    // You need this to dispatch "thunk" actions when someone comes with a link
    // For example: If you give someone a link to an assertion permafacts.io/<address>/<assertiontx>
    // The UI isn't aware of that assertion, so it needs to take the id and fetch the assertion before
    // loading the route
    // See: `routesMap` in this file for an example of how these thunks are used.
    applyMiddleware(middleware),
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
