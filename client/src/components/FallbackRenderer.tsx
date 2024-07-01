import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ICustomDivThemed {
  bgColor?: string;
}

const CustomDivThemed = styled("div")<ICustomDivThemed>(
  ({ theme, bgColor }) => ({
    backgroundColor: bgColor || theme.palette.background.paper,
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    // margin: theme.spacing(3),
    margin: "0 auto",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: "21px",
    fontWeight: "bold",
    height: 300,
    width: 400,
    justifyContent: "center",
  })
);

const CustomDiv = styled("div")({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  fontSize: "21px",
  fontWeight: "bold",
  height: "100%",
  justifyContent: "center",
});

const FallbackRenderer = () => (
  <>
    <CustomDivThemed
    // bgColor='#eee'
    >
      <Typography variant="h4">Loading...</Typography>
      <CircularProgress style={{ marginTop: 30 }} />
    </CustomDivThemed>
  </>
);

export default FallbackRenderer;
