import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Assets/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Order from './Pages/Order/Order';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import UserProfile from './Components/UserProfile/UserProfile';
import Notification from './Components/Notification/Notification';
import Search from './Pages/Search';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Routes for Login and Signup without layout */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Routes with Navbar and Footer */}
          <Route path='/*' element={<WithLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Define a component with Navbar and Footer
const WithLayout = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/t-shirt' element={<ShopCategory banner={men_banner} category="t-shirts" />} />
        <Route path='/wristbands' element={<ShopCategory banner={women_banner} category="wristbands" />} />
        <Route path='/caps' element={<ShopCategory banner={kid_banner} category="others" />} />
        <Route path='/product'>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/search' element={<Search />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
