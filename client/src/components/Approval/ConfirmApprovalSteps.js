import { Step, StepLabel, Stepper } from '@material-ui/core';
import { Typography } from '@mui/material';
import React, { Fragment } from 'react'
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';import './ConfirmApprovalSteps.css'

const ConfirmApprovalSteps = ({activeStep}) => {

    const steps = [
        {
          label: <Typography>Tester Details</Typography>,
          icon: <PermIdentityIcon />,
        },
        {
          label: <Typography>Confirm Approval</Typography>,
          icon: <LibraryAddCheckIcon />,
        }
      ];

      const stepStyles = {
        boxSizing: "border-box",
      };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  )
}

export default ConfirmApprovalSteps