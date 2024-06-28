
const getToken = () => {
    try {
      const token = JSON.parse(localStorage.getItem("tutorPad"));
      return token;
    } catch (error) {
      console.error("Failed to retrieve token:", error);
      return null;
    }
  };

export default getToken;