import React, { useState } from "react";
import styles from "./EditCellLabel.module.css";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CloseEditMenu } from "./EditSlice";
import { useAppDispatch } from "../../app/hooks";
import { loggedOut } from "../loginpage/LoginSlice";
import { UpdateApp } from "../../app/UpdateAppSlice";

type EditParams = {
  ElementCategory: string;
  ElementToEdit: string;
  Elements: {}[];
  UUID: string[];
  Index: number;
};

export default function EditCellLabel(args: EditParams) {
  let [EditData, setEditData] = useState(args.ElementToEdit);
  const [EditObject, setEditObject] = useState(args.Elements[args.Index]);
  const [EditCategory, setEditCategory] = useState(args.ElementCategory);
  const [IncorrectDataHelp, setIncorrectDataHelp] = useState("");

  async function EditRecord() {
    await fetch(
      `${
        process.env.REACT_APP_API_URL
      }/ru/data/v3/testmethods/docs/userdocs/set/${args.UUID[args.Index]}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth": `${sessionStorage.getItem("authkey")}`,
        },
        body: JSON.stringify({ ...EditObject, [EditCategory]: EditData }),
      }
    ).catch((error) => {
      console.error("Error:", error);
    });
  }

  const dispatch = useAppDispatch();
  return (
    <div className={styles.EditCellLabel}>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          helperText={IncorrectDataHelp}
          label={`Change ${args.ElementCategory}`}
          placeholder="Type your data to edit"
          onChange={(event) => {
            if (args.ElementCategory.toLowerCase().includes("number")) {
              setIncorrectDataHelp("Numbers only allowed");

              const regex = /^[0-9\b]+$/;
              if (event.target.value === "" || regex.test(event.target.value)) {
                setIncorrectDataHelp("");
                setEditData((EditData = event.target.value));
              }
            } else {
              setEditData((EditData = event.target.value));
            }
          }}
          InputProps={{
            startAdornment: <ModeEditIcon sx={{ fontSize: 18 }} />,
            value: EditData,
          }}
          variant="standard"
        />
      </Box>

      <Button
        className={styles.LoginButton}
        variant="contained"
        size="large"
        onClick={() => {
          EditRecord();
          dispatch(UpdateApp());
          dispatch(CloseEditMenu());
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
          dispatch(CloseEditMenu());
        }}
      >
        CANCEL
      </Button>
    </div>
  );
}
