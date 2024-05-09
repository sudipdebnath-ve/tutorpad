
import "./App.css";
import Dashboard from "./components/users/Dashboard";
import Register from "./components/registerLogin/Register";
import Signin from "./components/registerLogin/Signin";
import { Routes, Route } from "react-router-dom";
import MyPreferences from "./components/users/MyPreferences";
import ForgetPassword from "./components/registerLogin/ForgetPassword";
import EmailTemplates from "./components/users/EmailTemplates";
import Student from "./components/users/Student";
import StudentAdd from "./components/users/students/StudentAdd";
import StudentImport from "./components/users/students/StudentImport";
import StudentEmailMessage from "./components/users/students/StudentEmailMessage";
import LendingLibrary from "./components/users/LendingLibrary";
import Details from "./components/users/lending-library/Details";
import StudentEditDetails from "./components/users/students/details/StudentEditDetails";
import Calendar from "./components/users/calendar/Calendar";
import StudentMessageHistory from "./components/users/students/StudentMessageHistory";
import OnlineResources from "./components/users/OnlineResources";
import BussinessSettings from "./components/users/BussinessSettings";
import Tutor from "./components/users/Tutor";
import TutorAdd from "./components/users/tutors/TutorAdd";
import StaffAdd from "./components/users/tutors/StaffAdd";
import TutorEditDetails from "./components/users/tutors/details/TutorEditDetails";
import FamilyInvoice from "./components/family-invoice/FamilyInvoice";
import CategoriesLocations from "./components/categories-locations/CategoriesLocations";
import AddCategories from "./components/categories-locations/categories/add/AddCategories";
import EditCategories from "./components/categories-locations/categories/edit/EditCategories";
import AddLocations from "./components/categories-locations/locations/add/AddLocations";
import EditLocations from "./components/categories-locations/locations/edit/EditLocations";
import Attendance from "./components/attendance/Attendance";
import ChargeCategory from "./components/charge-category/ChargeCategory";
import TransactionDetailType from "./components/family-invoice/TransactionDetailType";
import AddInvoiceDetail from "./components/family-invoice/AddInvoiceDetail";
import FamilyDetails from "./components/family-invoice/FamilyDetails";
import AutoInvoiceForm from "./components/family-invoice/AutoInvoiceForm";
import AddTransactionForm from "./components/family-invoice/AddTransactionForm";
import SendInvoiceEmail from "./components/family-invoice/SendInvoiceEmail";
import Starting from "./components/registerLogin/Starting";
import DomainRegister from "./components/registerLogin/DomainName";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../src/components/Loader.js";


function App() {
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    }, (error) => {
      setLoading(false);
      return Promise.reject(error);
    });
  
    axios.interceptors.response.use((response) => {
      setLoading(false);
      return response;
    }, (error) => {
      setLoading(false);
      return Promise.reject(error);
    });
  }, []);

  return (
    <div className="wrapperBody">
      <Loader show={loading}/>

      <Routes basename={"/"}>
        {/* <Route index element={<Register />} /> */}
        <Route index element={<Register subdomain={subdomain} setSubdomain={setSubdomain} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path ="/domain-signin" element={<DomainRegister />} />
        <Route path="/starting/:token" element={<Starting />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/*" element={<Dashboard />} /> */}
        
        <Route path="/students" element={<Student />} />
        <Route path="/tutors" element={<Tutor />} />
        <Route path="/charge/category" element={<ChargeCategory />} />
        <Route path="/tutors/add" element={<TutorAdd />} />
        <Route path="/tutors/details/:id" element={<TutorEditDetails />} />
        <Route path="/tutors/addStaff" element={<StaffAdd />} />
        <Route path="/my-preferences" element={<MyPreferences />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/email-templates" element={<EmailTemplates />} />
        <Route path="/students/add" element={<StudentAdd />} />
        <Route path="students/details/:id" element={<StudentEditDetails />} />
        <Route path="/students/import" element={<StudentImport />} />
        <Route path="/students/message" element={<StudentEmailMessage />} />
        <Route
          path="/students/message-history"
          element={<StudentMessageHistory />}
        />
        <Route path="/lending-library" element={<LendingLibrary />} />
        <Route path="/lending-library/details" element={<Details />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/attendance/:id" element={<Attendance />} />
        <Route path="/calendar/categories" element={<CategoriesLocations />} />
        <Route path="/calendar/categories/add" element={<AddCategories />} />
        <Route path="/calendar/categories/edit/:id" element={<EditCategories/>} />
        <Route path="/calendar/locations/add" element={<AddLocations />} />
        <Route path="/calendar/locations/edit/:id" element={<EditLocations />} />
        
        <Route path="/online-resources" element={<OnlineResources />} />
        <Route path="/bussiness-settings" element={<BussinessSettings />} />
        <Route path="/familiies-and-invoices" element={<FamilyInvoice />} />
        <Route path="/familiies-and-invoices/transaction-type/:screen" element={<TransactionDetailType />} />
        <Route path="/familiies-and-invoices/transaction-type/:screen/:family_id" element={<TransactionDetailType />} />
        <Route path="/familiies-and-invoices/transaction-type/:screen/:family_id/:type" element={<TransactionDetailType />} />
        <Route path="/familiies-and-invoices/transaction-type/:screen/:type/:family_id/:id" element={<TransactionDetailType />} />
        <Route path="/familiies-and-invoices/transaction-details/:type/:family_id/:invoice_id" element={<AddTransactionForm />} />
        <Route path="/familiies-and-invoices/family/:id" element={<FamilyDetails />} />
        <Route path="/familiies-and-invoices/autoinvoice-formdetails/:id" element={<AutoInvoiceForm/>} />
        <Route path="/familiies-and-invoices/invoice/:screen" element={<AddInvoiceDetail />} />
        <Route path="/familiies-and-invoices/send-invoice/:family_id/:invoice_id" element={<SendInvoiceEmail />} />
        <Route path="/familiies-and-invoices/invoice/:screen/:family_id" element={<AddInvoiceDetail />} />
        <Route path="/familiies-and-invoices/invoice/:screen/:family_id/:type" element={<AddInvoiceDetail />} />
        <Route path="/familiies-and-invoices/invoice/:screen/:type/:family_id/:id" element={<AddInvoiceDetail />} />
      </Routes>
    </div>
  );
  
}

export default App;
