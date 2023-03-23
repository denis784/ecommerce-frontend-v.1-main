import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/general/Home";
import About from "./pages/general/About";
import Contact from "./pages/general/Contact";
import OurStore from "./pages/store/OurStore";
import Blog from "./pages/general/Blog";
import CompareProduct from "./pages/store/CompareProduct";
import Wishlist from "./pages/store/Wishlist";
import Login from "./pages/auth/Login";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Signup from "./pages/auth/Signup";
import Resetpassword from "./pages/auth/Resetpassword";
import SingleBlog from "./pages/general/SingleBlog";
import PrivacyPolicy from "./pages/terms&conditions/PrivacyPolicy";
import RefundPloicy from "./pages/terms&conditions/RefundPloicy";
import ShippingPolicy from "./pages/terms&conditions/ShippingPolicy";
import TermAndContions from "./pages/terms&conditions/TermAndContions";
import SingleProduct from "./pages/store/SingleProduct";
import Cart from "./pages/store/Cart";
import Checkout from "./pages/store/Checkout";
import { AuthProvider } from './pages/context/auth';
import Otp from "./pages/auth/otp";
import ProfilePage from "./pages/Protected/ProfilePage";
import NoMatch from "./pages/general/NoMatch";



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<Resetpassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPloicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="term-conditions" element={<TermAndContions />} />
            <Route path="/verify " element={<Otp/>}  />        
            <Route path="Profile" element={<ProfilePage/>} />         
            <Route path="*" element={<NoMatch/>} />
        

         
           
          </Route>
        </Routes>
        </AuthProvider>
        
      </BrowserRouter>
    </>
  );
}

export default App;
