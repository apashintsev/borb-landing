import { combineReducers, configureStore } from '@reduxjs/toolkit'
import web3Reducer from '../store/reducers/web3Slice'
import appSettings from './reducers/appSettingsSlice'
import gameSlice from './reducers/gameSlice'

const rootReducer = combineReducers({
    appSettings,
    web3Reducer,
    gameSlice,
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
            }),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
