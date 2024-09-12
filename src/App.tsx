
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
import { useFetchMyCartQuery, useMyProfileQuery, useMyWhishlistQuery } from './redux/api/api'
import { ProductTypes, UserTypes } from './assets/demoData'
import { setLoggedInUser } from './redux/reducers/loggedInUserReducer'
import IncompleteProducts from './pages/admin/IncompleteProducts'
import ProductsOfSame from './pages/ProductsOfSame'
import SearchedProducts from './pages/SearchedProducts'
import { GoReport } from 'react-icons/go'
import DialogWrapper from './components/DialogWrapper'
import VerifyEmail from './pages/VerifyEmail'
import MyOrders from './pages/MyOrders'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import Chatbot from './Chatbot'
import ChatbotAdmin from './ChatbotAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './pages/PageNotFound'
import MacroCalculator from './pages/MacroCalculator'



const App = () => {
  const myProfileData:{isLoading:boolean; data?:{message:UserTypes;};} = useMyProfileQuery("");
  const [reportDialogToggle, setReportDialogToggle] = useState<boolean>(false);
  const cartData:{
    isLoading:boolean;
    data?:{success:boolean; message:{products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;}};
    error?:FetchBaseQueryError|SerializedError;
  } = useFetchMyCartQuery("");
  const  wishlistData:{
    isLoading:boolean;
    data?:{success:boolean; message:ProductTypes[]};
    error?:FetchBaseQueryError | SerializedError;
  } = useMyWhishlistQuery("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setLoggedInUser({user:myProfileData.data?.message as UserTypes, isLoading:false, isError:false}));
  }, [myProfileData.data?.message]);
  

  return (
        <>
          <BrowserRouter>
            <DialogWrapper toggler={reportDialogToggle} setToggler={setReportDialogToggle} Element={<Chatbot USERID={myProfileData.data?.message._id} USERNAME={myProfileData.data?.message.name} />} />
            <Header userName={myProfileData.data?.message.name} userRole={myProfileData.data?.message.role} wishlistNotification={wishlistData.data?.message.length} cartNotification={cartData.data?.message.products.reduce((acc, iter) => acc+iter.quantity, 0) as number} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools/macro_calculator" element={<MacroCalculator />} />
              <Route path="/group/:query/:value" element={<ProductsOfSame />} />


              {
                !myProfileData.data?.message._id &&
                  <>
                    <Route path="/user/register" element={<Register />} />
                    <Route path="/user/login" element={<Login />} />
                  </>
              }
              {
                myProfileData.data?.message._id &&
                  <>
                    <Route path="/user/cart" element={<ProtectedRoute children={<Cart cartData={cartData} />} userRole={myProfileData.data?.message.role} />} />
                    <Route path="/user/orders" element={<ProtectedRoute children={<MyOrders />} userRole={myProfileData.data?.message.role} />} />
                    <Route path="/user/wishlist" element={<ProtectedRoute children={<Wishlist wishlistData={wishlistData} />} userRole={myProfileData.data?.message.role} />} />
                    <Route path="/user/logout" element={<Logout />} />
                  </>
              }
              
              <Route path="/user/address" element={<ProtectedRoute children={<Address />} userRole={myProfileData.data?.message.role} />} />
              <Route path="/user/verifyemail" element={<VerifyEmail />} />


              <Route path="/product/pay" element={<ProtectedRoute children={<StripePayment />} userRole={myProfileData.data?.message.role} />} />
              <Route path="/product/search/:searchQry" element={<SearchedProducts />} />
              <Route path="/product/:productID" element={<SingleProduct />} />


              {
                myProfileData.data?.message.role === "admin" &&
                <>
                  <Route path="/chat-admin" element={<ChatbotAdmin USERID={myProfileData.data?.message._id} USERNAME={myProfileData.data?.message.name} />} />
                  <Route path="/product/new" element={<ProtectedRoute accessibleFor="admin" children={<AddProduct />} userRole={myProfileData.data?.message.role} />} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute accessibleFor="admin" children={<Dashboard />} userRole={myProfileData.data?.message.role} />} />
                  <Route path="/admin/outstock" element={<ProtectedRoute accessibleFor="admin" children={<OutStock />} userRole={myProfileData.data?.message.role} />} />
                  <Route path="/admin/product/update" element={<ProtectedRoute accessibleFor="admin" children={<UpdateProduct />} userRole={myProfileData.data?.message.role} />} />
                  <Route path="/admin/product/incomplete" element={<ProtectedRoute accessibleFor="admin" children={<IncompleteProducts />} userRole={myProfileData.data?.message.role} />} />
                  <Route path="/admin/coupon" element={<ProtectedRoute accessibleFor="admin" children={<Coupons />} userRole={myProfileData.data?.message.role} />} />
                </>
              }

              <Route path="*" element={<PageNotFound />} />
            </Routes>

          </BrowserRouter>

          <div className="bug_report_cont" onClick={() => setReportDialogToggle(true)}>
            <GoReport className="GoReport" />
          </div>
          
        </>
    
  )
}

export default App
