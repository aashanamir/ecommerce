import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Navbar from './components/header';
import Footer from './components/footer';
import HomePage from './pages/Home/index';
import GetAllProducts from './pages/AllProducts';
import  Cart  from "./pages/Cart";
import ProductDetail from './components/ProductDetail';
import PageNotFound from './components/Not Found';
import Profile from './pages/auth/Profile';
import EditProfile from "./pages/auth/Edit Profile"
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import AdminHome from "./pages/admin/Home"
import Users from "./pages/admin/Users"
import Products from "./pages/admin/Products";
import Category from "./pages/admin/allCategory";
import AddCategory from "./pages/admin/addCategory";
import AddProducts from "./pages/admin/addProducts";
import EditProducts from "./pages/admin/editProducts";
import UserDetail from "./pages/admin/userDetail"
import AdminProductDetail from "./pages/admin/productDetail"
import AllOrders from "./pages/admin/allOrders"
import { FetchUser } from './Slice/UserSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import NotMobileAccess from './components/notMobile';
import { fetchProducts } from './Slice/ProductSlice';
import { fetchCategory } from './Slice/categorySlice';
import CheckoutPage from './pages/checkout';
import AllOrdersPage from './pages/myOrders';
import { getOrderDetails } from './Slice/orderSlice';
import OrderDetailPage from './pages/orderDetail';



const App = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.user);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(()=>{
    dispatch(FetchUser());
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(getOrderDetails());
  }, [dispatch])

  return (
    <div className='app'>
        <Router >
          <Navbar />
            <Routes >
              <Route path='/' Component={HomePage }/>
              <Route path='/products' Component={GetAllProducts }/>
              <Route path='/product/:id' Component={ProductDetail }/>
              <Route path='/cart' Component={Cart }/>
              <Route path='/checkout' Component={CheckoutPage }/>
              <Route path='/orders' Component={AllOrdersPage }/>
              <Route path='/order/:id' Component={OrderDetailPage }/>
              <Route path='/login' Component={Login }/>
              <Route path='/signup' Component={SignUp }/>
              <Route path='/profile' Component={Profile }/>
              <Route path='/edit-profile' Component={EditProfile }/>
              <Route path='/*' Component={PageNotFound }/>
              { userInfo?.role === "admin" &&
              <>  
                {
                  isMobile ? (<Route path='/admin*' Component={NotMobileAccess }/>
                  ) : (
                  <>
                    <Route path='/admin' Component={AdminHome}/>
                    {/* Users */}
                    <Route path='/admin/users' Component={Users}/>
                    <Route path='/admin/user/info/:id' Component={UserDetail}/>
                    {/* Products */}
                    <Route path='/admin/products' Component={Products}/>
                    <Route path='/admin/product/add' Component={AddProducts}/>
                    <Route path='/admin/product/edit/:id' Component={EditProducts}/>
                    <Route path='/admin/product/info/:id' Component={AdminProductDetail}/>
                    {/* Category */}
                    <Route path='/admin/category' Component={Category}/>
                    <Route path='/admin/category/add' Component={AddCategory}/>
                    {/* Orders */}
                    <Route path='/admin/orders' Component={AllOrders}/>
                  </>
                  )
                }
                
              </>
             
              }
            </Routes>
          <Footer />
        </Router>
    </div>
  );
};

export default App;
