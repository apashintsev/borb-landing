import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
