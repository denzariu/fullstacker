import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import LogIn from './client/components/LogIn';
import { Link, Route, Switch } from 'wouter'
import Accounts from './client/components/Accounts';
import SignUp from './client/components/SignUp';


function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/login" component={LogIn}/>
        <Route path="/signup" component={SignUp}/>
        
        <Route path="/users/:name">
          {(params) => <>Hello, {params.name}!</>}
        </Route>

        <Route>404: Not Found!</Route>



      </Switch>
    </ApolloProvider>     

// <>
// <Link href="/users/1">Profile</Link>

// <Route path="/about">About Us</Route>

// {/* 
//   Routes below are matched exclusively -
//   the first matched route gets rendered
// */}
// <Switch>
//   <Route path="/inbox" component={InboxPage} />

//   <Route path="/users/:name">
//     {(params) => <>Hello, {params.name}!</>}
//   </Route>

//   {/* Default route in a switch */}
//   <Route>404: No such page!</Route>
// </Switch>
// </>
  )
}

export default App
