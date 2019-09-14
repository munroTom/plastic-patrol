import React, { useState, useEffect } from "react";
import classnames from "classnames";

import "./FieldLabel.scss";

const FieldLabel = ({ label, required, children }) => {
  return (
    <div className={"FieldLabel__container"}>
      <p className={"FieldLabel__label"}>
        {label}
        {required && <span className={"FieldLabel__required"}> *</span>}
      </p>
      {children}
    </div>
  );
};

export default FieldLabel;
