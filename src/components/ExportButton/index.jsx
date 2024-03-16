import { Tooltip } from "@mui/material";

import ExportIcon from "../../assets/images/export.svg";

const ExportButton = ({ text, handleClick, disabled }) => {
  return (
    <button
      onClick={handleClick}
      className="p-[10px] border-2 border-customGreen-100 rounded-lg font-bold"
      disabled={disabled}
    >
      <Tooltip
        title={disabled && "There are no intentions to export"}
        placement="bottom"
      >
        <div className="flex">
          <img src={ExportIcon} alt="Export" />
          <h6 className="ml-3 text-customGreen-100">{text}</h6>
        </div>
      </Tooltip>
    </button>
  );
};

export default ExportButton;
