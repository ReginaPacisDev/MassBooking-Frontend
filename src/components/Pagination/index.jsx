import React from "react";

import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";

const StyledPagination = styled(Pagination, {
  name: "StyledPagination",
})`
  font-family: Museo, sans-serif;
  & .Mui-selected {
    background-color: inherit !important;
    color: #007464 !important;
  }

  & .MuiPaginationItem-root {
    font-size: 16px;
    color: #2b2b2b;
    font-weight: 300;
    margin: 0;

    &:hover {
      background: inherit;
    }
  }

  & .MuiSvgIcon-root {
    width: 35px;
    height: 35px;
    background-color: #fff;
    border: 1px solid #dbdce0;
    border-radius: 4px;
    color: #007464;
  }
`;

export const AppPagination = ({
  count,
  handleChange,
}) => {
  return (
    <div className="mt-0 lg:mt-6 mb-8 p-2 lg:p-0">
      <StyledPagination count={count} onChange={handleChange} shape="rounded" />
    </div>
  );
};

export default AppPagination;
