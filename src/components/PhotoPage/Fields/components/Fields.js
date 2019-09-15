import React, { useState, useCallback } from "react";

import Button from "@material-ui/core/Button";

import CategoryField from "../../CategoryField";

import "./Fields.scss";

const INITIAL_CATEGORY_VALUES = [{ keyIndex: 0, values: { error: true } }];

const Fields = ({ imgSrc, handleChange }) => {
  const [categoryValues, setCategoryValues] = useState(INITIAL_CATEGORY_VALUES);
  const [childIndex, setNextChildIndex] = useState(categoryValues.length);
  const [totalCount, setTotalCount] = useState(0);

  const handleClickAdd = categoryValues => {
    categoryValues.push({ keyIndex: childIndex, values: {} });
    setNextChildIndex(childIndex + 1);
    setCategoryValues(categoryValues);
  };

  const handleClickRemove = index => e => {
    if (categoryValues.length <= 1) return;
    setCategoryValues(
      categoryValues.filter(({ keyIndex }) => index !== keyIndex)
    );
  };

  const handleCategoryChange = index => newValue => {
    let error = false;
    let count = 0;
    const updatedCategoryValues = categoryValues.map(categoryValue => {
      const { keyIndex, values } = categoryValue;

      if (newValue.error) error = true;

      if (index === keyIndex) {
        if (!isNaN(newValue.number)) count += Number(newValue.number);

        return { keyIndex, values: newValue };
      }

      if (!isNaN(values.number)) count += Number(values.number);

      return categoryValue;
    });

    handleChange(error, updatedCategoryValues);
    setCategoryValues(updatedCategoryValues);
    setTotalCount(count);
  };

  return (
    <>
      <div className="Fields__container">
        <img src={imgSrc} alt={""} className={"Fields__pictureThumbnail"} />
        <div className="Fields__numberOfPieces">
          Total number of pieces in photo: {totalCount}
        </div>
      </div>
      {categoryValues.map(({ keyIndex }) => {
        return (
          <div key={keyIndex} className="Fields__category">
            <CategoryField
              handleClickRemove={handleClickRemove(keyIndex)}
              handleChange={handleCategoryChange(keyIndex)}
            />
          </div>
        );
      })}
      <div className="Fields__button">
        <Button
          // disabled={anyCategoryErrors}
          fullWidth
          variant="outlined"
          onClick={() => handleClickAdd(categoryValues)}
        >
          add another category
        </Button>
      </div>
    </>
  );
};

export default Fields;
