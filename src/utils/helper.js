export function storeToken(token, domain) {
    localStorage.setItem("tutorPad", JSON.stringify(token));
    localStorage.setItem("domain", domain);
    localStorage.setItem(`${domain}`, JSON.stringify(token));
    return true;
}