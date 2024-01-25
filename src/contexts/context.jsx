import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { json, useNavigate } from "react-router-dom";
//create context
const FirebaseContext = createContext();

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXIRVBO208gO_bSabxHkXFK_7SYMFVGWI",
  authDomain: "shoptop-b7dd3.firebaseapp.com",
  projectId: "shoptop-b7dd3",
  storageBucket: "shoptop-b7dd3.appspot.com",
  messagingSenderId: "248266098733",
  appId: "1:248266098733:web:404f29c6907fe1fb9590a4",
  measurementId: "G-V02G0RQ9EF",
  databaseUrl: "https://shoptop-b7dd3-default-rtdb.firebaseio.com/",
};

//initialize app with config
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

//firebase database
const firebaseDatabase = getDatabase(firebaseApp);

//custom hook for using context from whole application
export const useFirebase = () => useContext(FirebaseContext);

//firebase context provider component
export const FirebaseContextProvider = (params) => {
  //store userData
  const [userData, setUserData] = useState([]);

  //get userId from localstorage
  const loggedUser = JSON.parse(localStorage.getItem("userId"));

  //update billing address
  function updateBillingAddress(fullName, mobile, province, city, area) {
    const database = getDatabase();

    //fullname path

    //update data object
    const updates = {
      ["users/" + userId + "/billing_address/name"]: fullName,
      ["users/" + userId + "/billing_address/mobile"]: mobile,
      ["users/" + userId + "/billing_address/province"]: province,
      ["users/" + userId + "/billing_address/city"]: city,
      ["users/" + userId + "/billing_address/area"]: area,
    };
    update(ref(database), updates)
      .then((response) => {
        toast.success("update address successful.");
      })
      .catch((err) => {
        toast.warn("failed to update addresss.");
      });
  }

  //getting userId from localstorage
  const userId = JSON.parse(localStorage.getItem("userId"));

  //getting user profile data from database.
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("no data found.");
      }
    });
  }, []);

  //update user profile using signup
  function setupUserProfile(uid, userData) {
    const userRef = ref(firebaseDatabase, `users/${uid}`);
    set(userRef, userData);
  }

  const navigate = useNavigate();

  //cart based on user
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //update cart function
  const updateCart = (id, image, title, price, quantity) => {
    const existingItem = cart.find((item) => item.productId == id);

    const itemToAdd = {
      productId: id,
      image: image,
      title,
      price,
      quantity,
    };

    if (existingItem) {
      setCart((prev) => [...prev]);
      toast.success("item is in cart.");
    } else {
      setCart((prev) => [...prev, itemToAdd]);
      toast.success("item added to cart.");
    }
  };

  //update localstorage with each new element
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }, [cart]);

  //signin status for signin and signup
  const [signInStatus, setSignInStatus] = useState(false);

  //loading status
  const [loading, setLoadign] = useState(false);

  //sign in user function
  const signInUser = (email, password) => {
    setLoadign(!loading);
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userId", JSON.stringify(user.uid));
        setSignInStatus(!signInStatus);
        setLoadign(false);
        toast.success("sign in successful.");

        //set default cart array to localstorage
        localStorage.getItem("cart") ||
          localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //sign up user function
  const signupUser = (email, password, displayName) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((result) => {
        onAuthStateChanged(firebaseAuth, (user) => {
          setupUserProfile(user.uid, {
            name: displayName,
            email: email,
            phone: "",
            birthData: "",
            gender: "",
            billing_address: {
              name: "",
              mobile: "",
              province: "",
              city: "",
              area: "",
            },
          });
        });
        navigate("/login");
        toast.success("user sign up successful.");
      })
      .catch((error) => {
        toast.warning("failed to create account.");
      });
  };

  //sign out function
  const signOutUser = () => {
    signOut(firebaseAuth).then(() => {
      setSignInStatus(!signInStatus);
      localStorage.removeItem("userId");
      navigate("/login");
      toast.success("sign out.");
    });
  };

  //return firebase context provider.
  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        signInUser,
        signInStatus,
        loading,
        loggedUser,
        signOutUser,
        updateCart,
        setupUserProfile,
        userData,
        updateBillingAddress,
      }}
    >
      {params.children}
    </FirebaseContext.Provider>
  );
};
