
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


const CommonLayout = () => {
   return (
       <>
        <Header/>
        <Outlet/>
        <Footer/>
       </>
    )
}

export default CommonLayout