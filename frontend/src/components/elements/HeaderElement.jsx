import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const HeaderElement = ({ el, onEdit, onSelect }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(el.text || "");

  useEffect(() => {
    setValue(el.text || "");
  }, [el.text]);

  const handleSave = () => {
    setEditing(false);
    if (onEdit) onEdit({ ...el, text: value });
  };

  return (
    <Box sx={{ mt: 1 }}>
      {editing ? (
        <TextField
          variant="standard"
          autoFocus
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          inputProps={{
            style: {
              fontFamily: el.fontFamily || "Roboto, sans-serif", // Added Roboto font
              fontWeight: el.fontWeight || 700,
              fontSize: el.fontSize || "32px",
              color: "#fff",
              background: "transparent",
              border: "none",
              outline: "none",
              padding: 0,
            },
          }}
        />
      ) : (
        <h1
          style={{
            fontFamily: el.fontFamily || "Roboto, sans-serif", // Added Roboto font
            fontWeight: el.fontWeight || 700,
            letterSpacing: 1,
            fontSize: el.fontSize || "32px",
            margin: 0,
            color: "#fff",
            background: "transparent",
            cursor: "text",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            onSelect && onSelect();
          }}
        >
          {value || "Header"}
        </h1>
      )}
    </Box>
  );
};

export default HeaderElement;