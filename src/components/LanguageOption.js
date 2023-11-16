import React from "react";

const LanguageOption = (props) => {
  return (
    <select onChange={props.onChange}>
      <option>Select Language</option>
      <option value={"en"}>English</option>
      <option value={"fr"}>French</option>
    </select>
  );
};

export default LanguageOption;
