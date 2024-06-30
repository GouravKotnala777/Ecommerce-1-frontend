
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import './App.css'
import Home from './pages/Home.Page'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useSelector } from 'react-redux'
import { MiscReducerTypes } from './redux/reducers/miscReducers'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart.Page'
import Login from './pages/Login.Page'
import Register from './pages/Register.Page'
import Logout from './pages/Logout'
import AddProduct from './pages/AddProduct'

function App() {
  const {isHamActive} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [previousScrollPos, setPreviousScrollPos] = useState<number>(0);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setPreviousScrollPos(currentScrollPos);
      setIsHeaderHidden(currentScrollPos >= previousScrollPos);      
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [previousScrollPos]);

  useEffect(() => {
    if (isHamActive) {
      document.body.classList.add("freeze");
    }
    else{
      document.body.classList.remove("freeze");
    }

  }, [isHamActive]);
  

  return (
    <>
      <BrowserRouter>
        <Header hideHeader={isHeaderHidden} />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/new" element={<AddProduct />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/logout" element={<Logout />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/product/:productID" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
