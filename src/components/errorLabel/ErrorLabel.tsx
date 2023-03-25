import React from "react";
import styles from "./ErrorLabel.module.css";
import Button from "@mui/material/Button";
import { SetErrorMessage, setErrorMessageSlice } from "./ErrorMessageSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CloseErrorMenu } from "./ErrorSlice";

export default function ErrorLabel() {
  const dispatch = useAppDispatch();
  const ErrorMessage = useAppSelector(setErrorMessageSlice);

  return (
    <div className={styles.ErrorLabel}>
      <h1>Oops there was an error ! Please try again </h1>
      <h2>Error message is: {ErrorMessage}</h2>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          dispatch(CloseErrorMenu());
          dispatch(SetErrorMessage(""));
        }}
      >
        Ok
      </Button>
    </div>
  );
}
