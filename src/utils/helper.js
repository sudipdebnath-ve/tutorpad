import { useNavigate } from "react-router-dom";

export function storeToken(token, domain) {
    localStorage.setItem("tutorPad", JSON.stringify(token));
    localStorage.setItem("domain", domain);
    localStorage.setItem(`${domain}`, JSON.stringify(token));
    return true;
}

//checkAuth and redirect
export function checkAuthAndRedirect(navigate,from) {

    const domainFromUrl = window.location.hostname;
    console.log('domainFromUrl : ',domainFromUrl);
    const expectedDomain = process.env.REACT_APP_DOMAIN;

    if (domainFromUrl != expectedDomain) {
        var token = localStorage.getItem(domainFromUrl);
        console.log('1111');
        if (token && token.trim() !== '') {
            // Redirect to dashboard if token is present
            console.log('2222');
            //verify token
            navigate('/dashboard');
        }else{
            console.log('3333');
            navigate('/signin');
        }
    }else{
        if(from == "Signin"){
            navigate('/domain-signin');
        }
        var token = localStorage.getItem(domainFromUrl);
        if (token && token.trim() !== '') {
            //verify token
            navigate('/dashboard');
        }
    }
}