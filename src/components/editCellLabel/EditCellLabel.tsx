import React, { useState } from "react";
import styles from "./EditCellLabel.module.css";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CloseEditMenu } from "./EditSlice";
import { useAppDispatch } from "../../app/hooks";

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

  async function EditRecord() {
    console.log("---Edit Page----");
    console.log(JSON.stringify({ ...EditObject, [EditCategory]: EditData }));
    console.log(`${args.UUID[args.Index]}`);
    console.log("----------------");

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
      {args.UUID[args.Index]}
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label={`Change ${args.ElementCategory}`}
          placeholder="Type your data to edit"
          onChange={(event) => {
            setEditData((EditData = event.target.value));
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
