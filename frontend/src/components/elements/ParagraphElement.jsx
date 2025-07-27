import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ParagraphElement = ({ el, onEdit, onSelect }) => {
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
          multiline
          minRows={2}
          fullWidth
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          inputProps={{
            style: {
              fontFamily: el.fontFamily || "Roboto, sans-serif", // Added Roboto font
              fontWeight: el.fontWeight || 400,
              fontSize: el.fontSize || "16px",
              color: "#fff",
              background: "transparent",
              border: "none",
              outline: "none",
              padding: 0,
              whiteSpace: "pre-line",
            },
          }}
        />
      ) : (
        <p
          style={{
            fontFamily: el.fontFamily || "Roboto, sans-serif", // Added Roboto font
            fontWeight: el.fontWeight || 400,
            letterSpacing: 0.5,
            fontSize: el.fontSize || "16px",
            margin: 0,
            color: "#fff",
            background: "transparent",
            cursor: "text",
            whiteSpace: "pre-line",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            onSelect && onSelect();
          }}
        >
          {value || "Paragraph"}
        </p>
      )}
    </Box>
  );
};

export default ParagraphElement;