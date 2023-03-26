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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import LoginPage from "./components/loginpage/LoginPage";
import { setLoggedStatus } from "./components/loginpage/LoginSlice";
import EditCellLabel from "./components/editCellLabel/EditCellLabel";
import {
  OpenEditMenu,
  setEditingStatus,
} from "./components/editCellLabel/EditSlice";
import {
  setUpdatedAppStatus,
  UpdateApp,
  AppisUpdated,
} from "./app/UpdateAppSlice";
import {
  OpenDeleteMenu,
  setDeletingStatus,
} from "./components/deleteLineLabel/DeleteSlice";
import DeleteCellLabel from "./components/deleteLineLabel/DeleteLineLabel";
import DeleteLineLabel from "./components/deleteLineLabel/DeleteLineLabel";
import {
  OpenAddLineMenu,
  setAddLineMenuStatus,
} from "./components/addLineLabel/AddLineSlice";
import AddLineLabel from "./components/addLineLabel/AddLineLabel";
import LoadingIndicator from "./components/loadingIndicator/LoadingIndicator";
import ErrorLabel from "./components/errorLabel/ErrorLabel";
import {
  CloseErrorMenu,
  OpenErrorMenu,
  setErrorSliceStatus,
} from "./components/errorLabel/ErrorSlice";
import { SetErrorMessage } from "./components/errorLabel/ErrorMessageSlice";

function App() {
  const isErrorMessage = useAppSelector(setErrorSliceStatus);
  const isAddingLine = useAppSelector(setAddLineMenuStatus);
  const isDeleting = useAppSelector(setDeletingStatus);
  const IsUpdateApp = useAppSelector(setUpdatedAppStatus);
  const IsLogged = useAppSelector(setLoggedStatus);
  const isEditing = useAppSelector(setEditingStatus);

  const dispatch = useAppDispatch();

  const [CategoryList, setCategoryList] = useState([
    "companySigDate",
    "companySignatureName",
    "documentName",
    "documentStatus",
    "documentType",
    "employeeNumber",
    "employeeSigDate",
    "employeeSignatureName",
  ]);

  const [UpdateSpiner, setUpdateSpiner] = useState(false);
  const [UnsortedData, setUnsortedData] = useState([{}]);
  const [ElementCategory, setElementCategory] = useState("");
  const [ElementToEdit, setElementToEdit] = useState("");
  const [ElementsUUIDs, setElementsUUIDs] = useState([""]);
  const [ElementIndex, setElementIndex] = useState(0);

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
        if (response.data) {
          let Unsorted = response.data;
          setUnsortedData(response.data);

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

          let UUIDs: string[] = [];
          Unsorted.forEach((element: any, index: number) =>
            UUIDs.push(element.id)
          );
          setElementsUUIDs(UUIDs);

          setRows(Sorted);

          dispatch(AppisUpdated());
        }
      })
      .catch((error) => {
        console.error("Error:");
        dispatch(SetErrorMessage(error));
        dispatch(OpenErrorMenu());
      });
  }

  useEffect(() => {
    GetDataSet();
  }, [IsUpdateApp, IsLogged]);

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
      {sessionStorage.getItem("authkey") && (
        <div className="App">
          <div className="ButtonLogOut">
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

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {CategoryList.map((element: string, index: number) => (
                    <TableCell key={index}>{element}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Rows.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div
                        className="DeleteCellBox"
                        onClick={() => {
                          dispatch(OpenDeleteMenu());
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 25 }} />
                        {row.companySigDate}
                      </div>
                    </TableCell>

                    <TableCell>
                      {row.companySignatureName}
                      <div className="EditCellBox">
                        <div
                          onClick={() => {
                            setElementCategory(CategoryList[1]);
                            setElementToEdit(row.companySignatureName);
                            setElementIndex(index);

                            dispatch(OpenEditMenu());
                          }}
                        >
                          <ModeEditIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {row.documentName}
                      <div className="EditCellBox">
                        <div
                          onClick={() => {
                            setElementCategory(CategoryList[2]);
                            setElementToEdit(row.documentName);
                            setElementIndex(index);

                            dispatch(OpenEditMenu());
                          }}
                        >
                          <ModeEditIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {row.documentStatus}
                      <div className="EditCellBox">
                        <div
                          onClick={() => {
                            setElementCategory(CategoryList[3]);
                            setElementToEdit(row.documentStatus);
                            setElementIndex(index);

                            dispatch(OpenEditMenu());
                          }}
                        >
                          <ModeEditIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {row.documentType}
                      <div className="EditCellBox">
                        <div
                          onClick={() => {
                            setElementCategory(CategoryList[4]);
                            setElementToEdit(row.documentType);
                            setElementIndex(index);

                            dispatch(OpenEditMenu());
                          }}
                        >
                          <ModeEditIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {row.employeeNumber}
                      <div className="EditCellBox">
                        <div
                          onClick={() => {
                            setElementCategory(CategoryList[5]);
                            setElementToEdit(row.employeeNumber);
                            setElementIndex(index);

                            dispatch(OpenEditMenu());
                          }}
                        >
                          <ModeEditIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{row.employeeSigDate}</TableCell>

                    <TableCell>
                      {row.employeeSignatureName}
                      <div className="EditCellBox">
                        <div
                          onClick={() => {
                            setElementCategory(CategoryList[7]);
                            setElementToEdit(row.employeeSignatureName);
                            setElementIndex(index);

                            dispatch(OpenEditMenu());
                          }}
                        >
                          <ModeEditIcon sx={{ fontSize: 20 }} />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              className="AddLineMenu"
              onClick={() => {
                dispatch(OpenAddLineMenu());
              }}
            >
              <AddIcon sx={{ fontSize: 50 }} />
            </div>
          </TableContainer>

          {isErrorMessage && <ErrorLabel />}

          {IsUpdateApp && <LoadingIndicator />}

          {isEditing && (
            <EditCellLabel
              ElementCategory={ElementCategory}
              ElementToEdit={ElementToEdit}
              Elements={Rows}
              UUID={ElementsUUIDs}
              Index={ElementIndex}
            />
          )}

          {isAddingLine && <AddLineLabel />}

          {isDeleting && (
            <DeleteLineLabel UUID={ElementsUUIDs} Index={ElementIndex} />
          )}
        </div>
      )}
      {!IsLogged && !sessionStorage.getItem("authkey") && <LoginPage />}
    </>
  );
}

export default App;
