import axios from "axios";
import { NON_LOGGED_IN_API_URL } from "../utils/config";
const token = JSON.parse(localStorage.getItem("tutorPad"));
const loginApi = axios.create({
  baseURL: NON_LOGGED_IN_API_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
});



export const getDomainName = async  () =>{
    return loginApi.get('central-portal').then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
}

//   export const getDomainName = async () => {
//     const url = "http://13.233.254.223/tutorpad/api/central-portal";
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         // headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   'Content-Type': 'application/json',
//         // },
//       });
//       console.log("Response is ", response)
//       return response;
      
//     } catch (error) {
//       console.error('Failed to start recording API_2', error);
//     }
//   }

// export const getDomainName = () => {
//   fetch("http://13.233.254.223/tutorpad/api/central-portal")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Handle the data received from the API
//       console.log("data from here-------------", data);
//       return true;
      
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error("There was a problem with the fetch operation:", error);
//     });
// };

export const validateDomainName = async (data) => {
  return loginApi.post("validate-portal", data).then((response) => {
      console.log("response from validateDomainName------", response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
