import React from "react";
import Filter from "../components/filter/Filter";
import { Box } from "@mui/material";
import FilterDetails from "../components/filter/FilterDetails";

function FilterPage() {
  return (
    <Box
      style={{
        backgroundColor: "#F7F7F7",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
        <FilterDetails />
        <Filter />
    </Box>
  );
}

export default FilterPage;
