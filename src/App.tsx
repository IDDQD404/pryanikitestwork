import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import LoginPage from "./components/loginpage/LoginPage";
import { setLoggedStatus } from "./components/loginpage/LoginSlice";

function App() {
  const IsLogged = useAppSelector(setLoggedStatus);
  const dispatch = useAppDispatch();

  const [DataSet, setDataSet] = useState({
    documentStatus: "A",
    employeeNumber: "A",
    documentType: "A",
    documentName: "A",
    companySignatureName: "A",
    employeeSignatureName: "A",
    employeeSigDate: "A",
    companySigDate: "A",
  });
  const DataRef = useRef(false);

  async function GetDataSet() {
    await fetch(
      `${process.env.REACT_APP_API_URL}/ru/data/v3/testmethods/docs/userdocs/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth": `${sessionStorage.getItem("authkey")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setDataSet(response.data[0]);
        console.log("|----1----|");
        console.log(response.data[0]);
        console.log("-----2----");
        console.log(DataSet);
        console.log("|--------|");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    DataRef.current = true;
    GetDataSet();
  }, [!DataRef.current]);

  function DataSortType(
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
    employeeSignatureName: string
  ) {
    return {
      companySigDate,
      companySignatureName,
      documentName,
      documentStatus,
      documentType,
      employeeNumber,
      employeeSigDate,
      employeeSignatureName,
    };
  }

  const rows = [
    DataSortType(
      DataSet.companySigDate,
      DataSet.companySignatureName,
      DataSet.documentName,
      DataSet.documentStatus,
      DataSet.documentType,
      DataSet.employeeNumber,
      DataSet.employeeSigDate,
      DataSet.employeeSignatureName
    ),
  ];

  return (
    <>
      {IsLogged && (
        <div className="App">
          <h1>Token is: {sessionStorage.getItem("authkey")}</h1>
          <img
            src="https://media.tenor.com/4YuPV92egH0AAAAC/%D0%B3%D0%BE%D0%B1%D0%BB%D0%B8%D0%BD-%D1%81%D0%B2%D0%B8%D0%BD%D1%8C%D0%B8.gif"
            alt=""
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>companySigDate</TableCell>
                  <TableCell>companySignatureName</TableCell>
                  <TableCell>documentName</TableCell>
                  <TableCell>documentStatus</TableCell>
                  <TableCell>documentType</TableCell>
                  <TableCell>employeeNumber</TableCell>
                  <TableCell>employeeSigDate</TableCell>
                  <TableCell>employeeSignatureName</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.companySigDate}>
                    <TableCell>{row.companySigDate}</TableCell>

                    <TableCell>{row.companySignatureName}</TableCell>

                    <TableCell>{row.documentName}</TableCell>

                    <TableCell>{row.documentStatus}</TableCell>

                    <TableCell>{row.documentType}</TableCell>

                    <TableCell>{row.employeeNumber}</TableCell>

                    <TableCell>{row.employeeSigDate}</TableCell>

                    <TableCell>{row.employeeSignatureName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {!IsLogged && <LoginPage />}
    </>
  );
}

export default App;
