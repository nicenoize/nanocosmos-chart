import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import useSWR from "swr";

const Login = () => {
    const [email, setEmail] = useState();
    // const [streamname, setStreamname] = useState(); 
    const [password, setPassword] = useState();
    // const [token, setToken] = useState();
    
    function loginUser(email, password) {
        const options = {
            method: 'POST',
            url: 'https://metrics.nanocosmos.de/api/authenticate',
            headers: { 'Content-Type': 'application/json' },
            data: { email: email, password: password }
        };
    
        axios.request(options).then(function (response) {
            console.log(response.data.token);
            setToken(response.data.token)
        }).catch(function (error) {
            console.error(error);
        });
    }

    function setToken(userToken) {
        sessionStorage.setItem('token', userToken);
      }
      
    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }

    function setStreamname(streamname) {
        sessionStorage.setItem('streamname', streamname)
    }

    function getStreamname() {
        // const streamname = JSON.parse(snString);
        return sessionStorage.getItem('streamname');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(
          email,
          password
        );
        setToken(token);
      }


    return (    
        <div className="login-wrapper">
        <h1>Please enter credentials</h1>
        <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
        <p>Streamname</p>
          <input type="text" onChange={e => setStreamname(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
};

export default Login;


