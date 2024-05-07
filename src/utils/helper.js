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
    console.log('domainFromUrl : ',domainFromUrl);
    const expectedDomain = process.env.REACT_APP_DOMAIN;

    if (domainFromUrl != expectedDomain) {
        var token = localStorage.getItem(domainFromUrl);
        console.log('1111');
        if (token && token.trim() !== '') {
            // Redirect to dashboard if token is present
            var response = await verifyToken();
            console.log('response :',response);

            if (response) {
                navigate('/dashboard');
            } else {
                localStorage.clear();
                navigate('/signin');
            }
            navigate('/dashboard');
        }else{
            console.log('3333');
            localStorage.clear();
            navigate('/signin');
        }
    }else{
        if(from == "Signin"){
            navigate('/domain-signin');
        }
        var token = localStorage.getItem(domainFromUrl);
        if (token && token.trim() !== '') {
            // var res = verifyToken();
            navigate('/dashboard');
        }
    }
}