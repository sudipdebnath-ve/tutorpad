import React, { useContext } from 'react';
import { verifyToken } from "../services/authService.js";
import { useUserDataContext } from "../contextApi/userDataContext.js";
import { AuthContext } from '../components/registerLogin/AuthContext.js';

export function useTokenStorage() {
    const { setToken } = useUserDataContext();
    const { setRole } = useContext(AuthContext);

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