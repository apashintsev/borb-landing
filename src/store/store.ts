import { combineReducers, configureStore } from '@reduxjs/toolkit'
import web3Reducer from '../store/reducers/web3Slice'
import appSettings from './reducers/appSettingsSlice'
import gameSlice from './reducers/gameSlice'
import historySlice from './reducers/historySlice'
import referalRewardsSlice  from './reducers/referalRewardsSlice'
import supplySlice from './reducers/supplySlice'

const rootReducer = combineReducers({
    appSettings,
    web3Reducer,
    gameSlice,
    supplySlice,
    historySlice,
    referalRewardsSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true, immutableCheck: false,
                serializableCheck: false,
            }),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
