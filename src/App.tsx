import './App.css'
import Accounts from './client/components/Accounts';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import LogIn from './client/components/LogIn';



function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    
    <ApolloProvider client={client}>
      <Accounts/>
      <LogIn/>
    </ApolloProvider>
  )
}

export default App
