
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import './App.css'
import Home from './pages/Home.Page'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'

function App() {
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

  

  return (
    <>
      <BrowserRouter>
        <Header hideHeader={isHeaderHidden} />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
