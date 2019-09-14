import React, { useState, useEffect } from "react";

import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";

import { FieldLabelWithInput } from "./CategoryDropdown/FieldLabel";

import { validateString, validateIsPositiveNumber } from "./validation";
import CategoryDropdown from "./CategoryDropdown";

import "./Category.scss";

const CategoryField = ({ handleClickRemove }) => {
  const [numberOfPieces, setNumberOfPieces] = useState(null);
  const [numberOfPiecesError, setNumberOfPiecesError] = useState(false);
  const [brand, setBrand] = useState(null);
  const [brandError, setBrandError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [categoryFieldInfo, setCategoryFieldInfo] = useState(null);

  useEffect(() => {
    const validBrand = validateString(brand);
    const validCategory =
      validBrand &&
      validateIsPositiveNumber(numberOfPieces) &&
      validateIsPositiveNumber(selectedOption && selectedOption.key);

    setCategoryFieldInfo({
      leafKey: selectedOption && selectedOption.key,
      number: numberOfPieces,
      brand: validBrand && brand.trim(),
      error: !validCategory
    });
  }, [numberOfPieces, brand, selectedOption]);

  return (
    <div className={"CategoryField__container"}>
      <div className="CategoryField__dropdownContainer">
        <CategoryDropdown
          label="Type of rubbish"
          placeholder={"e.g. plastic bottle"}
          value={selectedOption}
          setValue={setSelectedOption}
        />
        <RemoveIcon onClick={handleClickRemove} />
      </div>

      <FieldLabelWithInput
        label={"Brand of rubbish"}
        placeholder={'e.g. coca cola or "none"'}
        value={brand}
        setValue={setBrand}
        validationFn={validateString}
        required
      />

      <FieldLabelWithInput
        label="Number of pieces"
        placeholder={"e.g. 1"}
        validationFn={validateIsPositiveNumber}
        value={numberOfPieces}
        setValue={setNumberOfPieces}
        required
      />
    </div>
  );
};

export default CategoryField;
