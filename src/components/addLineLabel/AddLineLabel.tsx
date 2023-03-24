import React, { useState } from "react";
import styles from "./AddLineLabel.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../app/hooks";
import { UpdateApp } from "../../app/UpdateAppSlice";
import { CloseAddLineMenu } from "./AddLineSlice";

export default function AddLineLabel() {
  const dispatch = useAppDispatch();
  //   "companySignatureName",
  //   "documentName",
  //   "documentStatus",
  //   "documentType",
  //   "employeeNumber",
  //   "employeeSignatureName",
  let [CompanySignatureName, setCompanySignatureName] = useState("");
  let [DocumentName, setDocumentName] = useState("");
  let [DocumentStatus, setDocumentStatus] = useState("");
  let [DocumentType, setDocumentType] = useState("");
  let [EmployeeNumber, setEmployeeNumber] = useState("");
  let [EmployeeSignatureName, setEmployeeSignatureName] = useState("");

  async function AddRecord() {
    // console.log("---Add Page----");
    // console.log({
    //   companySigDate: new Date().toISOString(),
    //   companySignatureName: CompanySignatureName,
    //   documentName: DocumentName,
    //   documentStatus: DocumentStatus,
    //   documentType: DocumentType,
    //   employeeNumber: EmployeeNumber,
    //   employeeSigDate: new Date().toISOString(),
    //   employeeSignatureName: EmployeeSignatureName,
    // });
    // console.log("----------------");

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
          label="Enter a employeeNumber"
          placeholder="Type your data for new Line"
          onChange={(event) => {
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

      {/* "companySigDate",
    "companySignatureName",
    "documentName",
    "documentStatus",
    "documentType",
    "employeeNumber",
    "employeeSigDate",
    "employeeSignatureName", */}

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
