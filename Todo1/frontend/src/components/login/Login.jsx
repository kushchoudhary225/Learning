import React, {  useEffect, useState } from "react";
import "./login.scss";
import loginAnimation from "../../../lottie/second.json";
import { redirect, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { setAuthUser, setIsAdmin, setIsLogin, fetchData } from "../../slices/empSlices";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  console.log("login")
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("kushc225@gmail.com");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("password");
  const BASE_URL = useSelector((state) => state.BASE_URL);
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();

  const changePasswordType = () => {
    const password = document.querySelector("#password");
    if (open) {
      password.setAttribute("type", "password");
    } else {
      password.setAttribute("type", "text");
    }
    setOpen(!open);
  };

  const submitHanlder = async () => {
    try {
      const {data} = await axios.post(`${BASE_URL}/user/login`,{email, password});
      const {token, user} = data;
      if(data.success && user.isAdmin) {
          localStorage.setItem('token', token);
          if(user.isAdmin) dispatch(setIsAdmin(true));
          dispatch(setIsLogin(true))
        if(!user.isAdmin) return navigate('/login') 
          console.log("something else ")
          return navigate("/getallusers");
      }else {
          console.log(data.msg);
      }

    } catch (error) {
      alert(error.message);
    }
  };

  const token = localStorage.getItem('token') || ''

  useEffect(()=>{
    if(token) {
      dispatch(setIsLogin(true));
      dispatch(setIsAdmin(true))
      fetchData()
      return navigate("/getallusers");
    } 
  },[token])
  return (
    <>
      <div className="login_wrapper">
        <div className="login_container">
          <div className="first">
            <Lottie
              className="lottieanimation"
              animationData={loginAnimation}
              style={{ height: 300, width: 300 }}
              loop={true}
            />
          </div>
          <div className="second">
            <h1>Hello ! Welcome Back</h1>

            <div className="login_input">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="example@gmail.com"
              />
            </div>

            <div className="login_input relative">

              <label htmlFor="password">Password</label>
              {/* <div className="flex"> */}
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                placeholder="**********"
                />
              {open ? (
                <FaRegEyeSlash
                onClick={changePasswordType}
                className="eyeIconsute cursor-pointer "
                />
                ) : (
                <FaRegEye
                onClick={changePasswordType}
                className="eyeIconsute cursor-pointer "
                />
                )}
                {/* </div> */}
            </div>

            <div className="login_input input_login_checkbox relative">
              <input type="checkbox" id="rememberme" />
              <label htmlFor="rememberme">Remember me</label>
            </div>

            <div className="login_button">
              <button onClick={submitHanlder}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
