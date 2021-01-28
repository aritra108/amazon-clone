import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from "./firebase";
import { useStateValue } from './state/StateProvider';
import { SET_USER } from "./state/ActionTypes";
import Payment from './components/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './components/Orders';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import ScrollRestoration from 'react-scroll-restoration';


const promise = loadStripe("stripe_publishable_key");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch({
          type: SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: SET_USER,
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollTop />
        <ScrollRestoration />
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
