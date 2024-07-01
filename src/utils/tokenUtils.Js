export const getToken = () =>{
    try {
        const token = JSON.parse(localStorage.getItem("tutorPad"))
        console.log("token is from token utils---------", token);
        return token
    } catch (error) {
        console.log("failed to retrive token", error);
        return null;
    }
}