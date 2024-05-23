import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon } from 'react-icons-kit';
import {money} from 'react-icons-kit/fa/money';
import {tag} from 'react-icons-kit/feather/tag';
import {listAlt} from 'react-icons-kit/fa/listAlt';
import {creditCardAlt} from 'react-icons-kit/fa/creditCardAlt'
import './style.css';
import { Link, useParams } from "react-router-dom";
import {chevronLeft} from 'react-icons-kit/feather/chevronLeft';
import { useNavigate } from "react-router-dom";
const TransactionType = () => {
  const param = useParams();
  const navigate = useNavigate();
  return  <> 
          <Link className="alignA" to={"/familiies-and-invoices"}><Icon icon={chevronLeft} /> Back To Family Account</Link>
          {/* <div className="" > */}
              <div  className="payment-type-box">
                  <div onClick={()=>navigate('/familiies-and-invoices/transaction-type/2/'+param.family_id+'/'+1)} className="type-box">
                    <p><Icon icon={money} /> <strong>Payment</strong> Use when a family pays you money. Any time you receive a check, cash, PayPal or any other form of payment.</p>
                </div>
                <div onClick={()=>navigate('/familiies-and-invoices/transaction-type/2/'+param.family_id+'/'+2)} className="type-box">
                    <p><Icon icon={creditCardAlt} /> <strong>Refund</strong> Use when you physically give money back to a family. Typically, only issued in the case of overpayment.</p>
                </div>
              </div>
              <div className="payment-type-box">
                <div onClick={()=>navigate('/familiies-and-invoices/transaction-type/2/'+param.family_id+'/'+3)} className="type-box">
                    <p><Icon icon={listAlt} /> <strong>Charge</strong> Use when you want to increase a family's amount owing to you, but you haven't received any form of money.</p>
                </div>
                <div onClick={()=>navigate('/familiies-and-invoices/transaction-type/2/'+param.family_id+'/'+4)} className="type-box">
                    <p><Icon icon={tag} /> <strong>Discount</strong> Use when you want to reduce a family's amount owing to you, but you haven't received any form of money.</p>
                </div>
              </div>
          {/* </div> */}
          
          </> 
};

export default TransactionType;
