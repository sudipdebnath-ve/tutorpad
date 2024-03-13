import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Icon } from 'react-icons-kit';
import {money} from 'react-icons-kit/fa/money';
import {tag} from 'react-icons-kit/feather/tag';
import {listAlt} from 'react-icons-kit/fa/listAlt';
import {creditCardAlt} from 'react-icons-kit/fa/creditCardAlt'
import './style.css';

const TransactionType = () => {
 
  return  <> 
          <div className="payment-type-box">
              <div className="type-box">
                <p><Icon icon={money} /> <strong>Payment</strong> Use when a family pays you money. Any time you receive a check, cash, PayPal or any other form of payment.</p>
            </div>
            <div className="type-box">
                <p><Icon icon={creditCardAlt} /> <strong>Refund</strong> Use when you physically give money back to a family. Typically, only issued in the case of overpayment.</p>
            </div>
          </div>
          <div className="payment-type-box">
            <div className="type-box">
                <p><Icon icon={listAlt} /> <strong>Charge</strong> Use when you want to increase a family's amount owing to you, but you haven't received any form of money.</p>
            </div>
            <div className="type-box">
                <p><Icon icon={tag} /> <strong>Discount</strong> Use when you want to reduce a family's amount owing to you, but you haven't received any form of money.</p>
            </div>
          </div>
          </> 
};

export default TransactionType;
