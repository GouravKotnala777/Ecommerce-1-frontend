
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
          <Route path="/:productID" element={<SingleProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
