import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import store from './store.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

let persistor = persistStore(store)  // Corrected variable name

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>  {/* Corrected component */}
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
