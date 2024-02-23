import React, { useState, useEffect } from "react";
import MiniSidebar from "../../../sidebar/MiniSidebar.js";
import Sidebar from "../../../sidebar/Sidebar.js";
import TopBar from "../../../sidebar/TopBar.js";
import { useUserDataContext } from "../../../../contextApi/userDataContext.js";
import "../../../../components/users/students/assets/css/style.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../utils/config.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";

import SelectBox from "../../../form/select-box/SelectBox.js";
import LabelInputBox from "../../../form/label-input-box/LabelInputBox.js";
import InputBox from "../../../form/input-box/InputBox.js";
import ColorSelectBox from "../../../form/color-select-box/ColorSelectBox.js";
import OptionBox from "../../../form/option-box/OptionBox.js";
import InputCheckBox from "../../../form/input-check-box/InputCheckBox.js";
import {getAddressTypes,createLocations,getLocationsDetails,updateLocations} from "../../../../services/locationsService.js";
import TextAreaInputBox from "../../../form/textarea-input-box/TextAreaInputBox.js";
import { iconsList } from "../../../../utils/constant.js";
import Icon from "react-icons-kit";
import { colors } from "../../../../utils/constant.js";
const EditLocations = () => {
  const { fetchData, sidebarToggle, token, userId } = useUserDataContext();
  const param = useParams();
  const navigate = useNavigate();
  const [color, setColor] = useState({});
  const ListComponent = ({title,text})=>{
    return <div>
            <div className="formbold-form-label">{title}</div>
            <div>{text}</div>
          </div>
  }
  const [iconLists, setIconList] = useState([...iconsList.map((e)=>{return {label:<Icon icon={e.icon} />,text:<Icon icon={e.icon} />,value:e.code}})]);
  const [addressList, setAddressList] = useState([]);
  const [addressListData, setAddressListData] = useState([]);
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
  const [eventlocName,setEventlocName] = useState("");
  const [eventlocColor,setEventlocColor] = useState("");
  const [eventlocIcon,setEventlocIcon] = useState("");
  const [eventlocIconDefaultValue,setEventlocIconDefaultValue] = useState({});
  const [eventlocAddress,setEventlocAddress] = useState("");
  const [eventlocAddressDefaultValue,setEventlocAddressDefaultValue] = useState({});
  const [eventlocCustomAddress,setEventlocCustomAddress] = useState("");
 
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tutorPad"));
    if (!token) {
      navigate("/signin");
    }else{
      getAddressTypesHandler();
      getLocationsDetailsHandler();
    }
  }, []);

  const getAddressTypesHandler = async ()=>{
    const res = await getAddressTypes();
    const list = await res.data.map((e)=>{
      return {label:ListComponent({title:e.la_title,text:e.la_description}),text:e.la_title,value:e.id}
    });
    setAddressList(list);
    setAddressListData(res.data);
    console.log(res.data);
  }
  const getLocationsDetailsHandler = async ()=>{
    const res = await getLocationsDetails(param.id);
    if(res.data)
    {
      setEventlocName(res.data.eventloc_name);
      setEventlocColor(colors.find((f)=>f.code===res.data.eventloc_color));
      setEventlocIcon(res.data.eventloc_icon);
      setEventlocIconDefaultValue(iconLists.find((f)=>f.value==res.data.eventloc_icon));
      setEventlocAddress(res.data.eventloc_address);
      setEventlocAddressDefaultValue(addressList.find((f)=>f.value==res.data.eventloc_address));
      setEventlocCustomAddress(res.data.eventloc_custom_address);
    }else{
      navigate('/calendar/categories');
    }
    
  }
  const formSubmit = async () => {
    
    const formData = {
      eventloc_name:eventlocName,
      eventloc_color:eventlocColor?.code,
      eventloc_icon:eventlocIcon,
      eventloc_address:eventlocAddress.toString(),
      eventloc_custom_address:eventlocCustomAddress,
    }
    const response = await updateLocations(formData,param.id);
    if (response.success == true) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/calendar/categories");
    }else{
      toast.error(JSON.stringify(response.response.data.data), {
        position: toast.POSITION.TOP_CENTER,
      })
      
    }
  };
 
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

        <main className="content studentadd">
          <ToastContainer />
          <div className="container-fluid p-0">
            <div className="row d-flex">
              <div className="col-xl-12 col-xxl-12">
                <div className="formbold-main-wrapper">
                  <div className="back-link">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    <Link to="/calendar/categories"> Back to Locations</Link>
                  </div>
                  <h1>Add New Locations</h1>
                  <div className="formbold-form-wrapper">
                      <div className="formbold-steps">
                        <ul>
                          <li className="formbold-step-menu1 active">
                          Locations Details
                          </li>
                        </ul>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <InputBox label={"Name"} setValue={setEventlocName} value={eventlocName} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <SelectBox selectValue={eventlocIconDefaultValue} label={"Icon"}  options={iconLists} onChangeSelect={setEventlocIcon}  />
                        </div>
                        <div className="col-md-6">
                          <ColorSelectBox label={"Colors"} isColorBoxOpen={isColorBoxOpen} setColor={setEventlocColor} color={eventlocColor} setIsColorBoxOpen={setIsColorBoxOpen} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <SelectBox selectValue={eventlocAddressDefaultValue} label={"Address"} options={addressList} onChangeSelect={setEventlocAddress}  />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          {
                            addressListData?.find((f)=>f.id==eventlocAddress)?.la_has_input===1 && <TextAreaInputBox setValue={setEventlocCustomAddress} value={eventlocCustomAddress} label={"Specify Address"}/>
                          }
                        </div>
                      </div>
                      <div className="row">
                          <div className="col-md-12">
                          <div className="formbold-form-btn-wrapper">
                              <button className="formbold-back-btn">Back</button>
                              <div className="btn-end">
                                <Link className="cancel" to="/calendar/categories">
                                  Cancel
                                </Link>
                                <button
                                  className="formbold-btn"
                                  onClick={formSubmit}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                      </div>
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

export default EditLocations;
