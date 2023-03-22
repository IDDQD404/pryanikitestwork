import {
  Button,
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

  const [Rows, setRows] = useState([
    DataSortType(
      "Unsetted",
      "Unsetted",
      "Unsetted",
      "Unsetted",
      "Unsetted",
      "Unsetted",
      "Unsetted",
      "Unsetted"
    ),
  ]);

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
        console.log("|----1----|");
        console.log(response.data);
        console.log("|--------|");

        console.log("|----2----|");
        let Unsorted = response.data;
        let Sorted: {
          companySigDate: string;
          companySignatureName: string;
          documentName: string;
          documentStatus: string;
          documentType: string;
          employeeNumber: string;
          employeeSigDate: string;
          employeeSignatureName: string;
        }[] = [];
        Unsorted.forEach((element: any, index: number) =>
          Sorted.push(
            DataSortType(
              element.companySigDate,
              element.companySignatureName,
              element.documentName,
              element.documentStatus,
              element.documentType,
              element.employeeNumber,
              element.employeeSigDate,
              element.employeeSignatureName
            )
          )
        );

        console.log(Sorted);
        setRows(Sorted);

        console.log("|--------|");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    GetDataSet();
  }, [Rows]);

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

  return (
    <>
      {IsLogged ||
        (sessionStorage.getItem("authkey") && (
          <div className="App">
            <div className="ButtonLogOut">
              <h1>Token is: {sessionStorage.getItem("authkey")}</h1>

              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  sessionStorage.setItem("authkey", "");
                  window.location.reload();
                }}
              >
                Log out
              </Button>
            </div>

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
                  {Rows.map((row: any) => (
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
        ))}
      {!IsLogged && !sessionStorage.getItem("authkey") && <LoginPage />}
    </>
  );
}

export default App;
