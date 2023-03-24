import React from "react";
import styles from "./DeleteLineLabel.module.css";
import Button from "@mui/material/Button";
import { CloseDeleteMenu } from "./DeleteSlice";
import { useAppDispatch } from "../../app/hooks";
import { UpdateApp } from "../../app/UpdateAppSlice";

type DeleteParams = {
  UUID: string[];
  Index: number;
};

export default function DeleteLineLabel(args: DeleteParams) {
  const dispatch = useAppDispatch();

  async function GetDataSet() {
    await fetch(
      `${
        process.env.REACT_APP_API_URL
      }/ru/data/v3/testmethods/docs/userdocs/delete/${args.UUID[args.Index]}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth": `${sessionStorage.getItem("authkey")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.data) dispatch(UpdateApp());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className={styles.DeleteLineLabel}>
      <h1>Delete Current Line?</h1>

      <Button
        className={styles.LoginButton}
        variant="contained"
        color="error"
        size="large"
        onClick={() => {
          GetDataSet();
          dispatch(CloseDeleteMenu());
        }}
      >
        DELETE
      </Button>

      <Button
        className={styles.LoginButton}
        variant="contained"
        size="large"
        onClick={() => {
          dispatch(CloseDeleteMenu());
        }}
      >
        CANCEL
      </Button>
    </div>
  );
}
