import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import {store} from './redux/store.ts'
 import './index.css'
import Spinner from './components/Spinner.tsx'

const AppParent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const rootElement = document.getElementById('root');

    const loadingHandler = () => {
      setIsLoading(false);
    }

    if (rootElement) {
      setTimeout(() => {
        loadingHandler();
      }, 0);
    }
  }, []);
  

  return(
    <>
      {
        isLoading?
          <Spinner type={1} heading="Loading..." width={100} thickness={6} />
          :
          <App />
      }
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppParent />
    </Provider>
  </React.StrictMode>,
)
