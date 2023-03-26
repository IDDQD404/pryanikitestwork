import React, { useState } from "react";
import styles from "./AddLineLabel.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../app/hooks";
import { UpdateApp } from "../../app/UpdateAppSlice";
import { CloseAddLineMenu } from "./AddLineSlice";
import { SetErrorMessage } from "../errorLabel/ErrorMessageSlice";
import { OpenErrorMenu } from "../errorLabel/ErrorSlice";

export default function AddLineLabel() {
  const dispatch = useAppDispatch();

  let [CompanySignatureName, setCompanySignatureName] = useState("");
  let [DocumentName, setDocumentName] = useState("");
  let [DocumentStatus, setDocumentStatus] = useState("");
  let [DocumentType, setDocumentType] = useState("");
  let [EmployeeNumber, setEmployeeNumber] = useState("");
  let [EmployeeSignatureName, setEmployeeSignatureName] = useState("");

  async function AddRecord() {
    await fetch(
      `${process.env.REACT_APP_API_URL}/ru/data/v3/testmethods/docs/userdocs/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth": `${sessionStorage.getItem("authkey")}`,
        },
        body: JSON.stringify({
          companySigDate: new Date().toISOString(),
          companySignatureName: CompanySignatureName,
          documentName: DocumentName,
          documentStatus: DocumentStatus,
          documentType: DocumentType,
          employeeNumber: EmployeeNumber,
          employeeSigDate: new Date().toISOString(),
          employeeSignatureName: EmployeeSignatureName,
        }),
      }
    ).catch((error) => {
      console.error("Error:", error);
      dispatch(SetErrorMessage(error));
      dispatch(OpenErrorMenu());
    });
  }

  return (
    <div className={styles.AddLineLabel}>
      <h1>AddLine</h1>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label="Enter a companySignatureName"
          placeholder="Type your data for new Line"
          onChange={(event) => {
            setCompanySignatureName(
              (CompanySignatureName = event.target.value)
            );
          }}
          InputProps={{
            value: CompanySignatureName,
          }}
          variant="standard"
        />

        <br />

        <TextField
          id="input-with-icon-textfield"
          label="Enter a documentName"
          placeholder="Type your data for new Line"
          onChange={(event) => {
            setDocumentName((DocumentName = event.target.value));
          }}
          InputProps={{
            value: DocumentName,
          }}
          variant="standard"
        />

        <br />

        <TextField
          id="input-with-icon-textfield"
          label="Enter a documentStatus"
          placeholder="Type your data for new Line"
          onChange={(event) => {
            setDocumentStatus((DocumentStatus = event.target.value));
          }}
          InputProps={{
            value: DocumentStatus,
          }}
          variant="standard"
        />

        <br />

        <TextField
          id="input-with-icon-textfield"
          label="Enter a documentType"
          placeholder="Type your data for new Line"
          onChange={(event) => {
            setDocumentType((DocumentType = event.target.value));
          }}
          InputProps={{
            value: DocumentType,
          }}
          variant="standard"
        />

        <br />

        <TextField
          id="input-with-icon-textfield"
          label="Enter a employeeNumber(numbers only)"
          placeholder="Type your data for new Line"
          onChange={(event) => {
            const regex = /^[0-9\b]+$/;
            if (event.target.value === "" || regex.test(event.target.value))
              setEmployeeNumber((EmployeeNumber = event.target.value));
          }}
          InputProps={{
            value: EmployeeNumber,
          }}
          variant="standard"
        />

        <br />

        <TextField
          id="input-with-icon-textfield"
          label="Enter a employeeSignatureName"
          placeholder="Type your data for new Line"
          onChange={(event) => {
            setEmployeeSignatureName(
              (EmployeeSignatureName = event.target.value)
            );
          }}
          InputProps={{
            value: EmployeeSignatureName,
          }}
          variant="standard"
        />
      </Box>

      <Button
        className={styles.LoginButton}
        variant="contained"
        size="large"
        onClick={() => {
          AddRecord();
          dispatch(CloseAddLineMenu());
          dispatch(UpdateApp());
        }}
      >
        CONFIRM
      </Button>

      <Button
        className={styles.LoginButton}
        variant="contained"
        color="error"
        size="large"
        onClick={() => {
          dispatch(CloseAddLineMenu());
        }}
      >
        CANCEL
      </Button>
    </div>
  );
}
