import React, { useState, useCallback, useRef } from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import EditIcon from "../../assets/images/editable.svg";

const Editable = ({ children, textArea }) => {
  const [editing, setEditing] = useState(false);
  const mainElemRef = useRef(null);

  const handleClickOutside = useCallback(() => {
    if (editing) {
      setEditing(false);
    }
  }, [editing]);

  useClickOutside(mainElemRef, handleClickOutside);

  return (
    <div
      className="relative"
      ref={mainElemRef}
      onClick={() => {
        setEditing((prev) => !prev);
      }}
    >
      {children}
      {!editing && (
        <div
          className={`absolute right-[10px] ${
            textArea ? "top-[30px]" : "top-[10px]"
          }`}
        >
          <img src={EditIcon} alt="Edit Icon" />
        </div>
      )}
    </div>
  );
};

export default Editable;
