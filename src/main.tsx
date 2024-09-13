import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHttpLink } from '@apollo/client';
import App from './App.tsx'
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import './index.css'

const readApiHttpLink = createHttpLink({
  uri: import.meta.env.VITE_READ_API_URL,
});

const mainApiHttpLink = createHttpLink({
  uri: import.meta.env.VITE_MAIN_API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = import.meta.env.VITE_TOKEN;
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-tenant": "root"
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.split(
    operation => operation.getContext()["apiName"] === "main",
    mainApiHttpLink,
    readApiHttpLink
  ),
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fileManager: {
            merge(existing = {}, incoming) {
              // Merge logic here
              return {
                ...existing,
                ...incoming
              };
            }
          }
        }
      }
    }
  })
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
