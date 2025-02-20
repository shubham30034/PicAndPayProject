import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import InvoicePage from "./pages/InvoicePage";
import PromoPage from "./pages/PromoPage";
import PaymentPage from "./pages/Payment";


const router = createBrowserRouter([
    {
        path:"/",
        element:<PromoPage/>
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/invoice",
        element:<InvoicePage/>
    },{
        path:"/payment",
        element:<PaymentPage/>
    }
])


export default router