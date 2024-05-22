import React, { useContext,useEffect, useState } from 'react';
import { verifyToken } from "../services/authService.js";
import { useUserDataContext } from "../contextApi/userDataContext.js";
import { AuthContext } from '../components/registerLogin/AuthContext.js';
import axios from "axios";
import { API_URL } from "../utils/config.js";
import { useNavigate } from "react-router-dom";

export function useTokenStorage() {
    const { setToken, setUserData, setUserId, token } = useUserDataContext();
    const { setRole } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("tutorPad"));

        const fetchData = () => {
            const validateconfig = {
                method: "GET",
                url: `${API_URL}tenant/details`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            axios(validateconfig)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.success === true) {
                            setUserData(response.data.data);
                            setUserId(response.data.data.id);
                            localStorage.setItem("user_id",response.data.data.id);
                            localStorage.setItem("user_name",response.data.data.first_name);
                        }
                    }
                })
                .catch((error) => {
                    console.log('Error occurred:', error);
                    if (error.response && error.response.status === 404) {
                        console.log('Token not found');
                        if (!token) {
                            navigate('/signin');
                        }
                    } else {
                        console.log('Other error occurred:', error);
                        // Handle other errors if needed
                    }
                });
        };
        fetchData();
    }, [token]);

    return function storeToken(token, domain, role="") {
        localStorage.setItem("tutorPad", JSON.stringify(token));
        localStorage.setItem(`${domain}`, JSON.stringify(token));
        localStorage.setItem("userRole", role);
        setToken(token);
        setRole(role);
        return true;
    };
}

//checkAuth and redirect
export const checkAuthAndRedirect = async (navigate,from) => {

    const domainFromUrl = window.location.hostname;
    const expectedDomain = localStorage.getItem("centralPortalDomain");

    if(from == 'Register'){
        if(expectedDomain){
            if (domainFromUrl != expectedDomain) {
                var token = localStorage.getItem(domainFromUrl);
                if (token && token.trim() !== '') {
                    var response = await verifyToken();
                    if (response) {
                        navigate('/dashboard');
                    }else{
                        localStorage.clear();
                        navigate('/signin');                    }
                }else{
                    window.location.href = `${process.env.REACT_APP_PROTOCOL}://${expectedDomain}/`;
                }
            }
        }
    }

    if(from == 'DomainName'){
        if (domainFromUrl != expectedDomain) {
            var token = localStorage.getItem(domainFromUrl);
            if (token && token.trim() !== '') {
                var response = await verifyToken();
                if (response) {
                    navigate('/dashboard');
                } else {
                    localStorage.clear();
                    navigate('/signin');
                }
            }else{
                localStorage.clear();
                navigate('/signin');
            }
        }
    }
    if(from == 'Signin'){
        if (domainFromUrl != expectedDomain) {
            var token = localStorage.getItem(domainFromUrl);
            if (token && token.trim() !== '') {
                // Redirect to dashboard if token is present
                // navigate('/dashboard');
                var response = await verifyToken();
                console.log('response :',response);
                if (response) {
                    navigate('/dashboard');
                } else {
                    localStorage.clear();
                }
            }else{
                localStorage.clear();
            }
        }else{
            navigate('/domain-signin');
        }
    }
}