
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.Page'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart.Page'
import Login from './pages/Login.Page'
import Register from './pages/Register.Page'
import Logout from './pages/Logout'
import AddProduct from './pages/AddProduct'
import Wishlist from './pages/Wishlist'
import Dashboard from './pages/Dashboard'
import OutStock from './pages/admin/OutStock'
import UpdateProduct from './pages/admin/UpdateProduct'
import Coupons from './pages/admin/Coupon'
import StripePayment from './pages/Payment'
import Address from './pages/Address.Page'
import { useFetchMyCartQuery, useMyProfileQuery } from './redux/api/api'
import { ProductTypes, UserTypes } from './assets/demoData'
import { setLoggedInUser } from './redux/reducers/loggedInUserReducer'
import IncompleteProducts from './pages/admin/IncompleteProducts'
import ProductsOfSame from './pages/ProductsOfSame'
import SearchedProducts from './pages/SearchedProducts'
import { GoReport } from 'react-icons/go'
import DialogWrapper from './components/DialogWrapper'
import Form from './components/Form'
import VerifyEmail from './pages/VerifyEmail'
import MyOrders from './pages/MyOrders'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import Chatbot from './Chatbot'


const formFields = [
  {type:"textArea", name:"message", placeHolder:"Message"}
];

const App = () => {
  const myProfileData:{data?:{message:UserTypes}} = useMyProfileQuery("");
  const [reportDialogToggle, setReportDialogToggle] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const cartData:{
    isLoading:boolean;
    data?:{success:boolean; message:{products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;}};
    error?:FetchBaseQueryError|SerializedError;
} = useFetchMyCartQuery("");
  const dispatch = useDispatch();


  const onClickHandler = () => {
    console.log(message);
  };
  
  useEffect(() => {
    dispatch(setLoggedInUser({user:myProfileData.data?.message as UserTypes, isLoading:false, isError:false}));
  }, [myProfileData.data?.message]);
  

  return (
        <>
          <BrowserRouter>
            <DialogWrapper toggler={reportDialogToggle} setToggler={setReportDialogToggle} Element={<Form heading="Write Bug Report" formFields={formFields} onChangeHandler={(e) => setMessage(e.target.value)} onClickHandler={onClickHandler} />} />
            <Header userName={myProfileData.data?.message.name} cartNotification={cartData.data?.message.products.reduce((acc, iter) => acc+iter.quantity, 0) as number} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Chatbot />} />
              <Route path="/product/new" element={<AddProduct />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/logout" element={<Logout />} />
              <Route path="/user/cart" element={<Cart cartData={cartData} />} />
              <Route path="/user/orders" element={<MyOrders />} />
              <Route path="/product/pay" element={<StripePayment />} />
              <Route path="/product/search/:searchQry" element={<SearchedProducts />} />
              <Route path="/product/:productID" element={<SingleProduct />} />
              <Route path="/user/wishlist" element={<Wishlist />} />
              <Route path="/user/address" element={<Address />} />
              <Route path="/user/verifyemail" element={<VerifyEmail />} />
              <Route path="/group/:query/:value" element={<ProductsOfSame />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/outstock" element={<OutStock />} />
              <Route path="/admin/product/update" element={<UpdateProduct />} />
              <Route path="/admin/product/incomplete" element={<IncompleteProducts />} />
              <Route path="/admin/coupon" element={<Coupons />} />
            </Routes>

          </BrowserRouter>

          <div className="bug_report_cont" onClick={() => setReportDialogToggle(true)}>
            <GoReport className="GoReport" />
          </div>
          
        </>
    
  )
}

export default App
