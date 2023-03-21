import React, { useEffect, useState } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import LoginPage from "./components/loginpage/LoginPage";
import { setLoggedStatus } from "./components/loginpage/LoginSlice";

function App() {
  const IsLogged = useAppSelector(setLoggedStatus);
  const dispatch = useAppDispatch();

  const [DataSet, setDataSet] = useState(0);

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
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    GetDataSet();
  });

  return (
    <>
      {IsLogged && (
        <div className="App">
          <h1>Token is: {sessionStorage.getItem("authkey")}</h1>
          <img
            src="https://media.tenor.com/4YuPV92egH0AAAAC/%D0%B3%D0%BE%D0%B1%D0%BB%D0%B8%D0%BD-%D1%81%D0%B2%D0%B8%D0%BD%D1%8C%D0%B8.gif"
            alt=""
          />
        </div>
      )}
      {!IsLogged && <LoginPage />}
    </>
  );
}

export default App;
