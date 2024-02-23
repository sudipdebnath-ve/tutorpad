import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Icon } from 'react-icons-kit';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
function OptionBox({label,icon,options}){
    return (
        <DropdownButton color='white' id="dropdown-basic-button" title={<><Icon icon={icon} /><span> {label}</span></>}>
            {
                options.map((e)=>{
                    return (
                            <Dropdown.Item href={e.route}>{e.label}</Dropdown.Item>
                        );
                })
                
            }
        </DropdownButton>)
}
OptionBox.propTypes = {
    label: PropTypes.string,
    icon:PropTypes.any,
    options:PropTypes.array,
}
export default OptionBox;
