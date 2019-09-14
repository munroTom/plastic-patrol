import React, { useRef } from "react";
import ReactSwipe from "react-swipe";

import Button from "@material-ui/core/Button";

import PageWrapper from "components/PageWrapper";

import TutorialItem from "../../TutorialItem";
import { tutorialSteps } from "../static";
import "./TutorialPage.scss";

const swipeConfig = { continuous: false, widthOfSiblingSlidePreview: 15 };

const TutorialPage = ({ handleClose, label }) => {
  const reactSwipeEl = useRef();

  return (
    <PageWrapper label={label} handleClose={handleClose} hasLogo>
      <ReactSwipe
        swipeOptions={swipeConfig}
        ref={el => (reactSwipeEl.current = el)}
      >
        {Object.values(tutorialSteps).map((value, index) => (
          <div key={index}>
            <TutorialItem
              stepNumber={index + 1}
              text={value.text}
              photo={value.photo}
            />
          </div>
        ))}
      </ReactSwipe>
    </PageWrapper>
  );
};

export default TutorialPage;
