import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
