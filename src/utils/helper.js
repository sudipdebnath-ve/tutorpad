import { verifyToken } from "../services/authService.js";

export function storeToken(token, domain) {
    localStorage.setItem("tutorPad", JSON.stringify(token));
    // localStorage.setItem("domain", domain);
    localStorage.setItem(`${domain}`, JSON.stringify(token));
    return true;
}

//checkAuth and redirect
export const checkAuthAndRedirect = async (navigate,from) => {

    const domainFromUrl = window.location.hostname;
    const expectedDomain = localStorage.getItem("centralPortalDomain");
    console.log('central Portal : ',expectedDomain);

    if(from == 'Register'){
        if (domainFromUrl != expectedDomain) {
            window.location.href = `${process.env.REACT_APP_PROTOCOL}://${expectedDomain}/`;
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