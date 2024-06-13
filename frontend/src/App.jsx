import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Navbar from './components/header';
import Footer from './components/footer';
import HomePage from './pages/Home/index';
import GetAllProducts from './pages/AllProducts';
import ProductDetail from './components/ProductDetail';
import PageNotFound from './components/Not Found';
import Profile from './pages/auth/Profile';
import EditProfile from "./pages/auth/Edit Profile"
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import { FetchUser } from './Slice/UserSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const App = () => {
  const dispatch = useDispatch()

  // For Fetching User For the first time
  useEffect(()=>{
    dispatch(FetchUser());
  }, [dispatch])

  return (
    <div className='app'>
        <Router >
          <Navbar />
            <Routes >
              <Route path='/' Component={HomePage }/>
              <Route path='/products' Component={GetAllProducts }/>
              <Route path='/product/:id' Component={ProductDetail }/>
              <Route path='/login' Component={Login }/>
              <Route path='/signup' Component={SignUp }/>
              <Route path='/profile' Component={Profile }/>
              <Route path='/edit-profile' Component={EditProfile }/>
              <Route path='/*' Component={PageNotFound }/>
            </Routes>
          <Footer />
        </Router>
    </div>
  );
};

export default App;
