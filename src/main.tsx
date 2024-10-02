import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHttpLink } from '@apollo/client';
import App from './App.tsx'
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
// import { persistCache } from 'apollo3-cache-persist';
import './i18n.ts'
import './index.css'
// import router from './routes.tsx';
import Error from './routes/Error.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const readApiHttpLink = createHttpLink({
  uri: import.meta.env.VITE_READ_API_URL,
});

const mainApiHttpLink = createHttpLink({
  uri: import.meta.env.VITE_MAIN_API_URL,
});

const manageApiHttpLink = createHttpLink({
  uri: import.meta.env.VITE_MANAGE_API_URL,
});

const cache = new InMemoryCache({
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

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = import.meta.env.VITE_TOKEN;
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-tenant": "root"
    },
    apiName: operation.getContext()["apiName"] || "main" // set default apiName to "main"
  }));

  return forward(operation);
});

// persistCache({
//   cache,
//   storage: window.localStorage
// });

const link = authMiddleware.split(
  (operation) => operation.getContext()["apiName"] === "main",
  mainApiHttpLink,
  authMiddleware.split(
    (operation) => operation.getContext()["apiName"] === "read",
    readApiHttpLink,
    manageApiHttpLink
  )
);

const client = new ApolloClient({
  link,
  connectToDevTools: true,
  cache
});
let router = createBrowserRouter(
  [
    {
      path: "*",
      element: <App />,
      errorElement: <Error />
    }
  ],
  { basename: import.meta.env.BASE_URL }
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)
