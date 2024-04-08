import React, { useEffect, useRef, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import Select from "react-select";
import { Link, useParams,useNavigate } from "react-router-dom";
import {chevronLeft} from 'react-icons-kit/feather/chevronLeft';
import { Icon } from 'react-icons-kit';
import { ToastContainer, toast } from "react-toastify";
import { getFamilyAccounts,getFamilyAccountsDetails,saveTransaction,getTransactionById,updateTransaction } from "../../services/invoiceService";
import RepeatBox from "../RepeatBox";
import { useUserDataContext } from "../../contextApi/userDataContext";
const ChargesDiscountForm = () => {
const student_id_ref = useRef(null);
const navigate = useNavigate();
const {allChargeCategory,fetchChargeCategory,userId} = useUserDataContext();
useEffect(()=>{
    fetchChargeCategory();
},[userId])
const getFrequency = (freq)=>{
    if(freq=='Daily')
    {
      return 1;
    }else if(freq=='Weekly')
    {
      return 2;
    }else if(freq=='Monthly')
    {
      return 3;
    }else if(freq=='Yearly')
    {
      return 4;
    }
  }

  const getFrequencyString = (freq)=>{
    if(freq==1)
    {
      return 'Daily';
    }else if(freq==2)
    {
      return 'Weekly';
    }else if(freq==3)
    {
      return 'Monthly';
    }else if(freq==4)
    {
      return 'Yearly';
    }
  }
 const [family_account_id,set_family_account_id] = useState();
 const [transaction_amount,set_transaction_amount] = useState();
 const [transaction_date,set_transaction_date] = useState();
 const [student_id,set_student_id] = useState();
 const [description,set_description] = useState();
 const [familiies,set_familiies] = useState([]);
 const [students,set_students] = useState([]);
 const [charge_category,set_charge_category] = useState();
 const [charge_category_id,set_charge_category_id] = useState();
 const param = useParams();
 const [is_recurring,set_is_recurring] = useState(false);
 const [event_frequency,set_event_frequency] = useState("Daily");
 const [event_repeat_on,set_event_repeat_on] = useState(["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]);
 const [event_frequency_val,set_event_frequency_val] = useState("");
 const [event_repeat_indefinitely,set_event_repeat_indefinitely] = useState(true);
 const [event_repeat_until,set_event_repeat_until] = useState("");

 const getFamilyAccountsHandler = async ()=>{
    const responseFamilies = await getFamilyAccounts();
    set_familiies(responseFamilies?.data||[]);
    if(param?.id)
    {
        const responseTransaction = await getTransactionById(param.id);
        if(responseTransaction?.data)
        {
           
            const dataFamilies =  responseFamilies.data.map((e)=>{return {value:e.id,label:e.name}});
            const selectedFamilies = dataFamilies.filter((f)=>f.value===responseTransaction.data.family_account_id);
            const accountDetailsResponse = await getFamilyAccountsDetails(selectedFamilies[0].value);
            set_students(accountDetailsResponse.data.students);
            set_family_account_id(selectedFamilies[0]);
            const dataStudents =  accountDetailsResponse.data.students.map((e)=>{return {value:e.id,label:e.name}});
            const selectedStudents = dataStudents.filter((f)=>f.value===responseTransaction.data.student_id);
            set_student_id(selectedStudents[0]);
            set_transaction_amount(responseTransaction.data.transaction_amount);
            set_transaction_date(responseTransaction.data.transaction_date);
            set_description(responseTransaction.data.description);
        }
        
    }else{
        const dataFamilies =  responseFamilies.data.map((e)=>{return {value:e.id,label:e.name}});
        const selectedFamilies = dataFamilies.filter((f)=>f.value==param.family_id);
        const accountDetailsResponse = await getFamilyAccountsDetails(selectedFamilies[0]?.value);
        set_students(accountDetailsResponse?.data?.students||[]);
        set_family_account_id(selectedFamilies[0]);
    }
 }
 
 const getFamilyAccountsDetailsHandler = async (value)=>{
    set_student_id("");
    set_students([]);
    const response = await getFamilyAccountsDetails(value.value);
    set_students(response.data.students);
 }


 const saveTransactionHandler = async ()=>{
    const data = {
        family_account_id:family_account_id?.value||"",
        transaction_amount:transaction_amount,
        transaction_date:transaction_date,
        student_id:student_id?.value||"",
        transaction_type:param.type,
        description:description,
        is_recurring:is_recurring,
        frequency:getFrequency(event_frequency),
        repeat_on:JSON.stringify(event_repeat_on?.filter((f)=>f.isActive==true)?.map((e)=>e.label)||[]),
        frequency_val:event_frequency_val,
        repeat_indefinitely:event_repeat_indefinitely,
        repeat_until:event_repeat_until,
        charge_category:charge_category_id,
    }
    if(param?.id)
    {
        const response = await updateTransaction(data,param.id);
        if (response?.success === true) {
            set_family_account_id("");
            set_transaction_amount("");
            set_transaction_date("");
            set_student_id("");
            set_description("");
            toast.success(response?.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate("/familiies-and-invoices/family/"+param.family_id);
        }else{
            toast.error("something went wrong !", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }else{
        const response = await saveTransaction(data);
        if (response?.success == true) {
            set_family_account_id("");
            set_transaction_amount("");
            set_transaction_date("");
            set_student_id("");
            set_description("");
            toast.success(response?.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            navigate("/familiies-and-invoices/family/"+param.family_id);
        }else{
            toast.error("something went wrong !", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    
 
 }

 const saveAndTransactionHandler = async ()=>{
    const data = {
        family_account_id:family_account_id?.value||"",
        transaction_amount:transaction_amount,
        transaction_date:transaction_date,
        student_id:student_id?.value||"",
        transaction_type:param.type,
        description:description,
        is_recurring:is_recurring,
        frequency:getFrequency(event_frequency),
        repeat_on:JSON.stringify(event_repeat_on?.filter((f)=>f.isActive==true)?.map((e)=>e.label)||[]),
        frequency_val:event_frequency_val,
        repeat_indefinitely:event_repeat_indefinitely,
        repeat_until:event_repeat_until,
        charge_category:charge_category_id,
    }
    const response = await saveTransaction(data);
    if (response?.success == true) {

        set_transaction_amount("");
        set_transaction_date("");
        set_description("");
        toast.success(response?.message, {
            position: toast.POSITION.TOP_CENTER,
        });
    }else{
        toast.error("something went wrong !", {
            position: toast.POSITION.TOP_CENTER,
        });
    }
 }


 useEffect(()=>{
    getFamilyAccountsHandler();
 },[])

  return  <> 
        <ToastContainer />
         <Link to={"/familiies-and-invoices"}><Icon icon={chevronLeft} /> Back To Family Account</Link>
          <div className="payment-type-box">
              <div className="card card-body form-area">
                  <div className="row">
                      <div className="col-md-12">
                          <h4 style={{textAlign:'left'}}>{param.type==3?"Charge":"Discount"} Details</h4>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <label>Family</label>
                          <Select value={family_account_id} onChange={(e)=>{set_family_account_id(e);getFamilyAccountsDetailsHandler(e);}} isMulti={false} options={[...familiies.map((e)=>{return {value:e.id,label:e.name}})]} />
                      </div>
                      <div className="col-md-6">
                          <label>Student(Optional)</label>
                          <Select value={student_id} onChange={(e)=>{set_student_id(e)}} isMulti={false} options={[...students.map((e)=>{return {value:e.id,label:e.name}})]} />
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <label>Date</label>
                          <input type="date" value={transaction_date}  onChange={(e)=>set_transaction_date(e.target.value)} className="form-control" name="" /> 
                      </div>
                      <div className="col-md-6">
                          <label>Amount</label>
                          <input type="number" value={transaction_amount} onChange={(e)=>set_transaction_amount(e.target.value)} className="form-control" name="" /> 
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                          <label>Description</label>
                          <textarea placeholder="This will appear on the invoice " value={description} onChange={(e)=>set_description(e.target.value)} className="form-control" name=""></textarea> 
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-12">
                          <input checked={is_recurring} onChange={(e)=>set_is_recurring(e.target.checked)} type="checkbox" name="" />
                          <span className="ml-2">This is a recurring charge</span> 
                      </div>
                  </div>
                  {
                    is_recurring &&  <div className="row">
                                        <div className="col-md-12">
                                        <RepeatBox
                                            event_frequency={event_frequency}
                                            set_event_frequency={set_event_frequency}
                                            event_repeat_on={event_repeat_on}
                                            set_event_repeat_on={set_event_repeat_on}
                                            event_frequency_val={event_frequency_val}
                                            set_event_frequency_val={set_event_frequency_val}
                                            event_repeat_indefinitely={event_repeat_indefinitely}
                                            set_event_repeat_indefinitely={set_event_repeat_indefinitely}
                                            event_repeat_until={event_repeat_until}
                                            set_event_repeat_until={set_event_repeat_until}
                                        />
                                        </div>
                                    </div>
                  }
                  
                  <div className="row">
                      <div className="col-md-6">
                          <label>Category(Optional)</label>
                          <Select value={charge_category} onChange={(e)=>{set_charge_category(e);set_charge_category_id(e.value)}} isMulti={false} options={[...allChargeCategory.map((e)=>{return {value:e.id,label:e.chargecat_name}})]} />
                      </div>
                  </div>
                  <div className="row mt-3">
                      <div className="col-md-12">
                          <input type="checkbox" name="" />
                          <span className="ml-2">Send an email receipt</span> 
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12">
                      <div className="formbold-form-btn-wrapper">
                          <div className="btn-end">
                              <Link className="cancel" to={'/familiies-and-invoices/transaction-type/'+1+'/'+param.family_id}>
                              Back
                              </Link>
                              <Link className="cancel" to={"/familiies-and-invoices"}>
                              Cancel
                              </Link>
                              {
                                !param?.id &&  <button
                                                    className="cancel"
                                                    onClick={()=>{saveAndTransactionHandler()}}
                                                >
                                                    Save & Add Another
                                                </button>
                              }
                              
                              <button onClick={()=>saveTransactionHandler()} className="formbold-btn">
                              Save
                              </button>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </> 
};

export default ChargesDiscountForm;
