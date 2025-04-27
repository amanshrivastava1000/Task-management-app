import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { Store } from './Store/Store.ts'
import theme from './ChakraTheme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={Store}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
)
