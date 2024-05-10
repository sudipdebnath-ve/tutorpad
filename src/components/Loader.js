import loader from "../assets/images/loader.gif";
import "./Loader.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Loader = () => {

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
