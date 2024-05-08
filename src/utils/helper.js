import { verifyToken } from "../services/authService.js";

export function storeToken(token, domain) {
    localStorage.setItem("tutorPad", JSON.stringify(token));
    localStorage.setItem("domain", domain);
    localStorage.setItem(`${domain}`, JSON.stringify(token));
    return true;
}

//checkAuth and redirect
export const checkAuthAndRedirect = async (navigate,from) => {

    const domainFromUrl = window.location.hostname;
    const expectedDomain = process.env.REACT_APP_DOMAIN;

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
                navigate('/signin');
            }
        }else{
            console.log('3333');
            localStorage.clear();
            navigate('/signin');
        }
    }else{
        if(from == "Signin"){
            navigate('/domain-signin');
        }
    }
}