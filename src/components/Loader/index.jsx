import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Loader = ({ open }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export const AdminPageLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
