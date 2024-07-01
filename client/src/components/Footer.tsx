import React from "react";
import { Typography, styled, TypographyProps } from "@mui/material";

const CustomTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  // border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  textAlign: "center",
  marginBottom: 10,
  userSelect: "none",
}));

export default function () {
  return (
    <CustomTypography variant="body2">
      Powered by Nikolai (Nolesh) Oleshko, 2024
    </CustomTypography>
  );
}
