import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import LogIn from './client/components/LogIn';
import { Link, Redirect, Route, Switch } from 'wouter'
import Accounts from './client/components/Accounts';
import SignUp from './client/components/SignUp';
import NotFound from './client/components/NotFound';
import { CookiesProvider, useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie] = useCookies(['user'])


  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  function handleLogin(user: any) {
    setCookie('user', user, { path: '/' })
  }
  console.log({cookies})

  return (
    
    <ApolloProvider client={client}>
      <CookiesProvider>
        <Switch>
          
          {cookies.user ?
          <>
            <Route path="/users/:name">
              {(params) => <>Hello, {params.name}!</>}
            </Route>
            <Route path="/home" component={() => <p>Testing</p>}/>

          </>
          :
          <>
            
          </>
          }

          <Route path="/" component={LogIn}/>
          <Route path="/login" component={LogIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route component={NotFound}/>
          
      </Switch>
      </CookiesProvider>
    </ApolloProvider>     

  )
}

export default App
