import { combineReducers, configureStore } from '@reduxjs/toolkit'
import web3Reducer from '../store/reducers/web3Slice'
import { betsApi } from './api/bets'
import { referalApi } from './api/referal'
import appSettings from './reducers/appSettingsSlice'
import gameSlice from './reducers/gameSlice'
import supplySlice from './reducers/supplySlice'

const rootReducer = combineReducers({
    appSettings,
    web3Reducer,
    gameSlice,
    supplySlice,
    [betsApi.reducerPath]: betsApi.reducer,
    [referalApi.reducerPath]: referalApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                /*thunk: {
          extraArgument: myCustomApiService,
        },*/
                serializableCheck: false,
            }).concat(betsApi.middleware, referalApi.middleware),
        //.concat(),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
