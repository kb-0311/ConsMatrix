import './App.css';
import Header from './component/layout/header/header.jsx'
import WebFont from 'webfontloader'
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import React, { useEffect } from 'react';
import Footer from './component/layout/footer/footer.jsx'
import NotFound from './component/layout/NotFound/NotFound.jsx'
import Home from './components/Home/Home.jsx'
import ProductDetails from './components/Product/ProductDetails.js'
import ProductsPage from './components/Product/ProductsPage.js'
import Search from './components/Product/Search.js'
import About from './components/About/About.js'
import LoginSignUp from './components/User/LoginSignUp.js'
import UserOptions from './component/layout/header/UserOptions.js'
import ProtectedRoute from './component/layout/Route/ProtectedRoute.js'
import Profile from './components/User/Profile.js'
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword';
import Approval from './components/Approval/Approval.js';
import ConfirmApproval from './components/Approval/ConfirmApproval.js';
import ConfirmApprovalStamp from './components/Approval/ConfirmApprovalStamp.js';
import ApprovalsMade from './components/Approval/ApprovalsMade/ApprovalsMade';
import ApprovalDetails from './components/Approval/ApprovalsMade/ApprovalDetails.js';
import Dashboard from './components/Admin/Dashboard/Dashboard.js'
import ProductList from './components/Admin/ProductController/ProductList.js'
import NewProduct from './components/Admin/ProductController/NewProduct.js'
import UpdateProduct from './components/Admin/ProductController/UpdateProduct.js'
import ApprovalList from './components/Admin/ApprovalController/ApprovalList.js'
import ProcessApproval from './components/Admin/ApprovalController/ProcessApproval.js'
import UserList from './components/Admin/UserController/UserList.js'
import UpdateUser from './components/Admin/UserController/UpdateUser.js'
import ProductAndUtilityReview from './components/Admin/ProductController/ProductAndUtilityReview.js'
import { loadUser } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors } from './actions/productAction';

function App() {
  const alert = useAlert();
  const dispatch =useDispatch();


  const {isAuthenticated , currentUser , loading , error} = useSelector((state)=>state.user)
  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
      
    }
    WebFont.load({
      google : {
        families : [ 'Didact Gothic' ,'Gothic A1'  , 'Chilanka']
      }

      
    })
    if (!currentUser) {
      dispatch(loadUser());

    }
    
  }, []);

  


  return (
    <Router>
      <Header/>
      { isAuthenticated && (<UserOptions user={currentUser}/>)}

        {/* Public Product Routes */}
        <Switch>

        <Route exact path="/" component = { Home } />
        <Route exact path="/product/:id" component = { ProductDetails } />
        <Route exact path="/products/product/:id" component = { ProductDetails } />
        <Route exact path="/products" component = { ProductsPage } />
        <Route exact path="/search" component = { Search } />
        <Route exact path="/about" component = { About } />
        <Route exact path="/products/:keyword" component = { ProductsPage } />

        {/* User Routes */}
        <Route exact path="/login" component = { LoginSignUp } />
        <ProtectedRoute exact path="/account" component = { Profile } />
        <ProtectedRoute exact path="/me/update" component = { UpdateProfile } />
        <ProtectedRoute exact path="/password/update" component = { UpdatePassword } />
        
        {/* Local Approval */}
        <ProtectedRoute exact path="/to/be/approved" component = { Approval } />
        <ProtectedRoute exact path="/tester/details" component = { ConfirmApproval } />
        
        {/* Confirm approval route */}
        <ProtectedRoute exact path="/approval/confirm" component = { ConfirmApprovalStamp } />
        <ProtectedRoute exact path="/approval/:id" component = { ApprovalDetails } />
        <ProtectedRoute exact path="/approvals/made" component = { ApprovalsMade } />

        {/* Admin Routes */}
        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={ Dashboard } />
        <ProtectedRoute isAdmin={true} exact path="/admin/products/utilities" component={ ProductList } />
        <ProtectedRoute isAdmin={true} exact path="/admin/product/new" component={ NewProduct } />
        <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={ UpdateProduct } />
        <ProtectedRoute isAdmin={true} exact path="/admin/approvals" component={ ApprovalList } />
        <ProtectedRoute isAdmin={true} exact path="/admin/approval/:id" component={ ProcessApproval } />
        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={ UserList } />
        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={ UpdateUser } />
        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ ProductAndUtilityReview } />
        
        {/* Invalid Route */}
        <Route exact path="*" component = { NotFound } />
        </Switch>


      <Footer/>
    </Router>
  );
}

export default App;
