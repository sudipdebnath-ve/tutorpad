import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import bgimage from "../../assets/images/bg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NON_LOGGED_IN_API_URL } from "../../utils/config.js";
import axios from "axios";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import LanguageOption from "../LanguageOption.js";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Starting = () => {
  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("theme", "light");
    localStorage.setItem("tutorPad",param.token);
    navigate("/dashboard",{ replace: true });
    },[param.token]);
  return (<></>);
};

export default Starting;
