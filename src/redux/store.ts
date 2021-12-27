import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

import authReducer from './reducer/auth.slice';
import photoReducer from './reducer/photo.slice';

const reducers = combineReducers({
  auth: authReducer,
  photo: photoReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return middleware;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };