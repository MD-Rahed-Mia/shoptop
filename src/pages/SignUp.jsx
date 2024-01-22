import React, { useState } from "react";
import Layout from "../Layout";
import signupImg from "./../assets/images/businessman-shopping-cart-animation-footage-115043380_prevstill.webp";
import "./../style/signup.css";
import { Link } from "react-router-dom";
import { useFirebase } from "../contexts/context";
import { onAuthStateChanged } from "firebase/auth";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  console.log(agree);

  const firebaseAuth = useFirebase();

  //trigger signup function
  const signupUser = (e) => {
    event.preventDefault();
    try {
      //shift to signup from context
      firebaseAuth.signupUser(email, password, name);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <div className="signup-container">
        <div className="signup-left">
          <img src={signupImg} alt="" />
        </div>
        <div className="signup-right">
          <h1 className="text-center">signup</h1>
          <form action="">
            <div>
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                name="Name"
                id="Name"
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="signup-agree">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                onChange={(event) => setAgree(!agree)}
              />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                laudantium veniam dignissimos?
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="signup-btn"
                onClick={(e) => signupUser()}
              >
                sign up
              </button>
            </div>
          </form>
          <div>
            <p className="text-center">
              Have an Account? <Link to={"/login"}>Login in</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
