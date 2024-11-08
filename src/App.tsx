
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.Page'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart.Page'
import Login, { UserLocationTypes } from './pages/Login.Page'
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
import { fetchMyCart, myCoupons, myProfile, myReferralGifts, myWhishlist, outStockProducts } from './redux/api/api'
import { CouponTypes, ProductTypes, ProductTypesPopulated, UserTypes } from './assets/demoData'
import { setLoggedInUser } from './redux/reducers/loggedInUserReducer'
import IncompleteProducts from './pages/admin/IncompleteProducts'
import ProductsOfSame from './pages/ProductsOfSame'
import SearchedProducts from './pages/SearchedProducts'
import { GoReport } from 'react-icons/go'
import DialogWrapper from './components/DialogWrapper'
import VerifyEmail from './pages/VerifyEmail'
import MyOrders from './pages/MyOrders'
import Chatbot from './Chatbot'
import ChatbotAdmin from './ChatbotAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './pages/PageNotFound'
import MacroCalculator from './pages/MacroCalculator'
import UserActivities from './pages/UserActivities'
import OrderChart from './pages/charts/OrderCharts'
import AllOrders from './pages/admin/AllOrders'
import Policies from './pages/static/Policies'
import MyCoupons from './pages/MyCoupons'
import MyGifts from './pages/MyGifts'



const App = () => {
  const [myProfileData, setMyProfileData] = useState<UserTypes>();
  const [reportDialogToggle, setReportDialogToggle] = useState<boolean>(false);
  const [cartData, setCartData] = useState<{products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;}>();
  const [wishlistData, setWishlistData] = useState<ProductTypesPopulated[]>([]);
  const [outStock, setOutStock] = useState<(ProductTypes&{_id:string; [key:string]:string})[]>([]);
  const [myCouponsArray, setMyCouponsArray] = useState<CouponTypes[]>([]);
  const [myReferralGiftsArray, setMyReferralGiftsArray] = useState<{userID:{name:string; email:string;}; coupon:CouponTypes; status:"pending"|"completed"}[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocationTypes>();
  const dispatch = useDispatch();

  const getUserLocationData = async() => {
    try {
        const resIP = await fetch(`https://ipinfo.io/json`, {
            method:"GET"
        });

        if (resIP.ok) {
          const dataIP:UserLocationTypes = await resIP.json();
          console.log("--------- Home.Page.tsx  getUserLocationData Ok");
          console.log(dataIP);
          setUserLocation(dataIP);
          console.log("--------- Home.Page.tsx  getUserLocationData Ok");
        }
        else{
          console.log("--------- Home.Page.tsx  getUserLocationData NotOk");
        }

    } catch (error) {
        console.log("--------- Home.Page.tsx  getUserLocationData error");
        console.log(error);
        console.log("--------- Home.Page.tsx  getUserLocationData error");
    }
};
  
  useEffect(() => {
    const myProfileRes = myProfile();
    myProfileRes.then((myProfileDataResolved) => {
      dispatch(setLoggedInUser({user:myProfileDataResolved.message as UserTypes, isLoading:false, isError:false}));
      setMyProfileData(myProfileDataResolved.message as UserTypes);
      console.log("::::::::::::::::::::::::::::");
      console.log(myProfileDataResolved);
      console.log("::::::::::::::::::::::::::::");
      
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  useEffect(() => {
    const myReferralGiftsRes = myReferralGifts();
    myReferralGiftsRes
    .then((myReferralGiftsResolvedData) => {
      setMyReferralGiftsArray(myReferralGiftsResolvedData.message as {userID:{name:string; email:string;}; coupon:CouponTypes; status:"pending"|"completed"}[]);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const cartDataRes = fetchMyCart();

    cartDataRes.then((cartResolvedData) => {
      setCartData(cartResolvedData.message as {products:{productID:ProductTypes; quantity:number;}[]; totalPrice:number;});
      console.log("???????????????????????????????");
      console.log(cartResolvedData);
      console.log("???????????????????????????????");
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  useEffect(() => {
    const wishlistRes = myWhishlist();

    wishlistRes.then((wishlistResolvedData) => {
      setWishlistData(wishlistResolvedData.message as ProductTypesPopulated[]);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  useEffect(() => {
    const outStockRes = outStockProducts();

    outStockRes.then((outStockResolvedData) => {
      setOutStock(outStockResolvedData.message as (ProductTypes&{_id:string; [key:string]:string})[]);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  useEffect(() => {
    const myCouponsRes = myCoupons();

    myCouponsRes.then((ResolvedData) => {
      setMyCouponsArray(ResolvedData.message as CouponTypes[]);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    getUserLocationData();
  }, []);

  return (
        <>
          <BrowserRouter>
            <DialogWrapper toggler={reportDialogToggle} setToggler={setReportDialogToggle} Element={<Chatbot USERID={myProfileData?._id} USERNAME={myProfileData?.name} userLocation={userLocation as UserLocationTypes} />} />
            <Header userName={myProfileData?.name} userRole={myProfileData?.role} wishlistNotification={wishlistData?.length} cartNotification={cartData?.products?.reduce((acc, iter) => acc+iter.quantity, 0) as number} couponNotification={myCoupons?.length as number} myReferralGiftsNotification={myReferralGiftsArray?.length as number} userLocation={userLocation} />
            <Routes>
              <Route path="/" element={<Home userLocation={userLocation as UserLocationTypes} />} />
              {/*<Route path="/" element={<h1>My name is gourav</h1>} />*/}
              <Route path="/tools/macro_calculator" element={<MacroCalculator />} />
              <Route path="/group/:query/:value" element={<ProductsOfSame userLocation={userLocation as UserLocationTypes} />} />


              {
                !myProfileData?._id &&
                  <>
                    <Route path="/user/register" element={<Register />} />
                    <Route path="/user/login" element={<Login userLocation={userLocation as UserLocationTypes} />} />
                  </>
              }
              {
                myProfileData?._id &&
                  <>
                    <Route path="/user/coupons" element={<ProtectedRoute children={<MyCoupons myCoupons={myCouponsArray as CouponTypes[]} />} userRole={myProfileData?.role} />} />
                    <Route path="/user/gifts" element={<ProtectedRoute children={<MyGifts myReferralGifts={myReferralGiftsArray} />} userRole={myProfileData?.role} />} />
                    <Route path="/user/cart" element={<ProtectedRoute children={<Cart userLocation={userLocation as UserLocationTypes} cartData={cartData} />} userRole={myProfileData?.role} />} />
                    <Route path="/user/orders" element={<ProtectedRoute children={<MyOrders userLocation={userLocation as UserLocationTypes} />} userRole={myProfileData?.role} />} />
                    <Route path="/user/wishlist" element={<ProtectedRoute children={<Wishlist loginedUser={myProfileData} userLocation={userLocation as UserLocationTypes} wishlistData={wishlistData} />} userRole={myProfileData?.role} />} />
                    <Route path="/user/logout" element={<Logout userLocation={userLocation as UserLocationTypes} />} />
                  </>
              }
              
              <Route path="/user/address" element={<ProtectedRoute children={<Address userLocation={userLocation} />} userRole={myProfileData?.role} />} />
              <Route path="/user/verifyemail" element={<VerifyEmail />} />


              <Route path="/product/pay" element={<ProtectedRoute children={<StripePayment userLocation={userLocation as UserLocationTypes} />} userRole={myProfileData?.role} />} />
              <Route path="/product/search/:searchQry" element={<SearchedProducts userLocation={userLocation as UserLocationTypes} />} />
              <Route path="/product/:productID" element={<SingleProduct loginedUser={myProfileData as UserTypes} userLocation={userLocation as UserLocationTypes} />} />


              {
                myProfileData?.role === "admin" &&
                <>
                  <Route path="/chat-admin" element={<ChatbotAdmin USERID={myProfileData?._id} USERNAME={myProfileData?.name} />} />
                  <Route path="/product/new" element={<ProtectedRoute accessibleFor="admin" children={<AddProduct userLocation={userLocation as UserLocationTypes} />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute accessibleFor="admin" children={<Dashboard outStockProductsNotification={outStock} />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/outstock" element={<ProtectedRoute accessibleFor="admin" children={<OutStock outStockProductsNotification={outStock} />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/product/update" element={<ProtectedRoute accessibleFor="admin" children={<UpdateProduct />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/product/incomplete" element={<ProtectedRoute accessibleFor="admin" children={<IncompleteProducts />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/activities" element={<ProtectedRoute accessibleFor="admin" children={<UserActivities />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/coupon" element={<ProtectedRoute accessibleFor="admin" children={<Coupons userLocation={userLocation as UserLocationTypes} />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/chart/orders" element={<ProtectedRoute accessibleFor="admin" children={<OrderChart />} userRole={myProfileData?.role} />} />
                  <Route path="/admin/order/all" element={<ProtectedRoute accessibleFor="admin" children={<AllOrders userLocation={userLocation as UserLocationTypes} />} userRole={myProfileData?.role} />} />
                </>
              }

              <Route path="/policy/:policyType" element={<Policies />} />
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
