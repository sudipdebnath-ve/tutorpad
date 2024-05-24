import loader from "../assets/images/loader.gif";
import "./Loader.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Loader = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setupLoader()
  }, []);

  const setupLoader = async ()=> {
    axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    }, (error) => {
      setLoading(false);
      console.log('Error occurred:', error);
      if (error.response && error.response.status === 401) {
        console.log('Unauthrnticated User');
        localStorage.clear();
        navigate('/signin');
      } else if (error.response && error.response.status === 404) {
        console.log('Token not found');
        // var isToken = JSON.parse(localStorage.getItem("tutorPad"));
        // if(isToken == ''){
        //   localStorage.clear();
        //   navigate('/signin');
        // }
      } else {
        console.log('Other error occurred:', error);
        // Handle other errors if needed
      }
      return Promise.reject(error);
    });
  
    axios.interceptors.response.use((response) => {
      setLoading(false);
      return response;
    }, (error) => {
      setLoading(false);
      return Promise.reject(error);
    });
  }
  return loading && (
    <div className="loader-overlay">
      <div className="loader-center">
        <img src={loader} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
