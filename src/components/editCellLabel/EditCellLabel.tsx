import React, { useState } from "react";
import styles from "./EditCellLabel.module.css";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type EditParams = {
  ElementCategory: string;
  Element: string;
  Position: [];
  FullArray: [];
};

export default function EditCellLabel(args: EditParams) {
  let [OverwriteData, setOverwriteData] = useState(args.Element);

  return (
    <div className={styles.EditCellLabel}>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label={`Change ${args.ElementCategory}`}
          placeholder="Type your data to edit"
          onChange={(event) => {
            setOverwriteData((OverwriteData = event.target.value));
          }}
          InputProps={{
            startAdornment: <ModeEditIcon sx={{ fontSize: 18 }} />,
            value: OverwriteData,
          }}
          variant="standard"
        />
      </Box>

      <Button
        className={styles.LoginButton}
        variant="contained"
        size="large"
        onClick={() => {
          alert("A");
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
          alert("A");
        }}
      >
        CANCEL
      </Button>
    </div>
  );
}
