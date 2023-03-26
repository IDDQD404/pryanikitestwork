import React from "react";
import styles from "./LoadingIndicator.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingIndicator() {
  return (
    <div className={styles.LoadingIndicator}>
      <h1>App is in update process</h1>

      <div>
        <CircularProgress disableShrink size="20%" />
      </div>
    </div>
  );
}
