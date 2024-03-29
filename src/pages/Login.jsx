import React, { useContext, useState } from "react";
import Layout from "../Layout";
import LoginImg from "./../assets/images/businessman-shopping-cart-animation-footage-115043380_prevstill.webp";
import "./../style/Login.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../contexts/context";
import Toast from "../components/Toast";
import { ToastContainer, toast } from "react-toastify";

//login component
function Login() {
  const firebase = useFirebase();

  //unauthorized login
  const unauthorized = new URLSearchParams(location.search).get("unauthorized");

  //check login status
  const loadingStatus = firebase.loading;

  //get email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //login user function
  function loginUser(e) {
    e.preventDefault();
    try {
      firebase.signInUser(email, password);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Layout>
      {unauthorized ? toast.success("please login.") : ""}
      <div className="login-container">
        <div className="login-left">
          <img src={LoginImg} alt="" />
        </div>
        <div className="login-right">
          <h1 className="text-center">Login</h1>
          <form action="" onSubmit={(e) => loginUser(e)}>
            <div>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="login-btn"
                disabled={loadingStatus}
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <p className="text-center">
              Don't Have an Account? <Link to={"/signup"}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
