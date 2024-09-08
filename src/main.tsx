import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import './index.css'

const apiURL = import.meta.env.VITE_MANAGE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const client = new ApolloClient({
  link: new HttpLink({
    uri: apiURL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
