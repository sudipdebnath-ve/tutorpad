import React, { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import MiniSidebar from "../sidebar/MiniSidebar.js";
import Sidebar from "../sidebar/Sidebar.js";
import TopBar from "../sidebar/TopBar.js";
import { useUserDataContext } from "../../contextApi/userDataContext.js";
import "../users/assets/css/customDatepicker.css";
import './style.css';
import TransactionType from "./TransactionType.js";
import PaymentRefundForm from "./PaymentRefundForm.js";
import { useParams,useNavigate } from "react-router-dom";
import ChargesDiscountForm from "./ChargesDiscountForm.js";

const TransactionDetailType = () => {
  const param = useParams();
  const navigate = useNavigate();
  const {sidebarToggle} = useUserDataContext();
  const [isPaymentTypeScreen,setIsPaymentTypeScreen] = useState(param.screen);
  useEffect(()=>{
    setIsPaymentTypeScreen(param.screen)
  },[param]);
  return (
    <div className="wrapper">
      {sidebarToggle ? (
        <>
          <MiniSidebar />
        </>
      ) : (
        <>
          <Sidebar />
        </>
      )}

      <div className="main bg-color">
        <TopBar />
        <main className="content student">
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Add Transaction</h5>
                    </div>
                    <div className={`card-body ${isPaymentTypeScreen==1?"contaner-area":"contaner-area-min"}`}>
                        <span>Step {isPaymentTypeScreen==1?"1/2":"2/2"}</span>
                        {
                            // isPaymentTypeScreen==1?<TransactionType />:<PaymentRefundForm transactionType={param?.type} />
                        }
                        <ChargesDiscountForm />
                        
                        
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TransactionDetailType;
