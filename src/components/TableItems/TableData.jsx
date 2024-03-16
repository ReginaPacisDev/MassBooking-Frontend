import React from "react";

const TableData = ({ text, imageUrl, imageAlt, handleClick }) => {
  return (
    <td className="px-4 py-2 border border-customSlate-100 text-sm font-light">
      {imageUrl ? (
        <button onClick={handleClick}>
          <img src={imageUrl} alt={imageAlt} />
        </button>
      ) : (
        text
      )}
    </td>
  );
};

export default TableData;
