import React from "react";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import { makeStyles } from '@material-ui/core/styles';
import dynamic from "next/dynamic";

const useStyles = makeStyles({
    steper: {
     color:"#000000",
    },
  });
 function CheckoutProgress({ activeStep = 0 }) {
    const classes = useStyles();

  return (
    <Stepper  className={classes.steper} activeStep={activeStep} alternativeLabel>
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => (
          <Step className={classes.steper} key={step}>
            <StepLabel className={classes.steper}>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}

export default dynamic(() => Promise.resolve(CheckoutProgress), { ssr: false })