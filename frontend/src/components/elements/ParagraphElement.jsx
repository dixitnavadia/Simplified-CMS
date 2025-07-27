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

  // Helper function to get font weight based on bold styling
  const getFontWeight = () => {
    // If bold is explicitly set, use the fontWeight or default to 700
    if (el.isBold) {
      return el.fontWeight || "700";
    }
    // If bold is false, use fontWeight or default to 400
    return el.fontWeight || "400";
  };

  // Helper function to get text decoration
  const getTextDecoration = () => {
    const decorations = [];
    if (el.isUnderline) decorations.push("underline");
    return decorations.length > 0 ? decorations.join(" ") : "none";
  };

  // Helper function to get vertical alignment for sub/superscript
  const getVerticalAlign = () => {
    if (el.isSubscript) return "sub";
    if (el.isSuperscript) return "super";
    return "baseline";
  };

  // Helper function to get font size with sub/superscript adjustment
  const getFontSize = () => {
    const baseSize = el.fontSize || "16px";
    if (el.isSubscript || el.isSuperscript) {
      // Reduce font size for sub/superscript
      const sizeValue = parseInt(baseSize);
      return `${Math.max(sizeValue * 0.75, 10)}px`;
    }
    return baseSize;
  };

  const getElementStyles = () => ({
    fontFamily: el.fontFamily || "Roboto, sans-serif",
    fontWeight: getFontWeight(),
    fontStyle: el.isItalic ? "italic" : "normal",
    textDecoration: getTextDecoration(),
    verticalAlign: getVerticalAlign(),
    letterSpacing: 0.5,
    fontSize: getFontSize(),
    margin: 0,
    color: el.fontColor || "#fff",
    background: "transparent",
    cursor: "text",
    whiteSpace: "pre-line",
  });

  // Debug logging
  useEffect(() => {
    console.log("ParagraphElement props:", {
      isBold: el.isBold,
      isItalic: el.isItalic,
      isUnderline: el.isUnderline,
      isSubscript: el.isSubscript,
      isSuperscript: el.isSuperscript,
      fontWeight: el.fontWeight,
      calculatedWeight: getFontWeight(),
    });
  }, [el]);

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
              ...getElementStyles(),
              border: "none",
              outline: "none",
              padding: 0,
            },
          }}
        />
      ) : (
        <p
          style={getElementStyles()}
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
