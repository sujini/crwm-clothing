import React,{useEffect} from 'react';
import  {Switch, Route, Redirect} from 'react-router-dom';
import {connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from  './redux/user/user.actions';
const App =({checkUserSession,currentUser})=> {
 
  useEffect( ()=>{
    checkUserSession();
     /*const {setCurrentUser} = this.props;
   
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
            
          });
          console.log(this.state)
        });
        
        
      }
      setCurrentUser(userAuth);
      
    });*/

  },[checkUserSession]);
 
  return(
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/checkout' component={CheckoutPage}/>
        <Route exact path='/signin' render={() => currentUser?(<Redirect to='/'/>):(<SignInAndSignUp/>)}/>
        
      </Switch>
      
    </div>
  )
}

/*
const mapStateToProps = ({user}) =>({
  currentUser:user.currentUser
})
*/
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
