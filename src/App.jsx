import { ToastContainer } from "react-toastify";
import Error from "./components/Error";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Protected from "./router/Protected";
import "./style/app.css";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route
          path="/profile"
          exact
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
