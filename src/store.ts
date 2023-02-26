import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import cmcService from './features/cmc/service';
import masternodesService from './features/masternodes/service';
import reactotron from './reactotron';

const reactotronEnhancer = reactotron.createEnhancer?.();

export const store = configureStore({
  reducer: {
    [masternodesService.reducerPath]: masternodesService.reducer,
    [cmcService.reducerPath]: cmcService.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    masternodesService.middleware,
    cmcService.middleware,
  ],
  enhancers: reactotronEnhancer ? [reactotronEnhancer] : [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
