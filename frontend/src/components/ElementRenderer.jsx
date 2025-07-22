import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const elementStyle = {
  bgcolor: "#232323",
  color: "#fff",
  padding: "22px 32px",
  margin: "28px 0",
  borderRadius: "16px",
  fontSize: "1.18rem",
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
  transition: "box-shadow 0.2s, background 0.2s",
  border: "none",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
    background: "#282828",
  },
};

const ElementRenderer = ({ el, id, onSelect, onDelete, onEdit }) => {
  const [editingHeader, setEditingHeader] = useState(false);
  const [editingParagraph, setEditingParagraph] = useState(false);
  const [headerValue, setHeaderValue] = useState(el.text || "");
  const [paragraphValue, setParagraphValue] = useState(el.text || "");
  const fileInputRef = useRef();

  
  useEffect(() => {
    setHeaderValue(el.text || "");
    setParagraphValue(el.text || "");
  }, [el.text]);

  const handleElementClick = (event) => {
    event.stopPropagation();
    onSelect && onSelect({ ...el, id });
  };

  const handleHeaderSave = () => {
    setEditingHeader(false);
    if (onEdit) onEdit(id, { ...el, text: headerValue });
  };

  const handleParagraphSave = () => {
    setEditingParagraph(false);
    if (onEdit) onEdit(id, { ...el, text: paragraphValue });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = (e) => {
        if (onEdit) onEdit(id, { ...el, src: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={6} sx={elementStyle} onClick={handleElementClick}>
      <Box
        sx={{
          position: "absolute",
          top: 17,
          right: 18,
          justifyContent: "flex-end",
        }}
      >
        <CloseOutlinedIcon
          fontSize="medium"
          color="error"
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        />
      </Box>
      {el.type === "header" && (
        <Box sx={{ mt: 1 }}>
          {editingHeader ? (
            <TextField
              variant="standard"
              autoFocus
              fullWidth
              value={headerValue}
              onChange={(e) => setHeaderValue(e.target.value)}
              onBlur={handleHeaderSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleHeaderSave();
              }}
              inputProps={{
                style: {
                  fontWeight: el.fontWeight || 700,
                  fontSize: el.fontSize || "2rem",
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
                fontWeight: el.fontWeight || 700,
                letterSpacing: 1,
                fontSize: el.fontSize || "2rem",
                margin: 0,
                color: "#fff",
                background: "transparent",
                cursor: "text",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setEditingHeader(true);
                onSelect && onSelect({ ...el, id });
              }}
            >
              {headerValue || "Header"}
            </h1>
          )}
        </Box>
      )}
      {el.type === "paragraph" && (
        <Box sx={{ mt: 1 }}>
          {editingParagraph ? (
            <TextField
              variant="standard"
              multiline
              minRows={2}
              fullWidth
              autoFocus
              value={paragraphValue}
              onChange={(e) => setParagraphValue(e.target.value)}
              onBlur={handleParagraphSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleParagraphSave();
              }}
              inputProps={{
                style: {
                  fontWeight: el.fontWeight || 400,
                  fontSize: el.fontSize || "1rem",
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
                fontWeight: el.fontWeight || 400,
                letterSpacing: 0.5,
                fontSize: el.fontSize || "1rem",
                margin: 0,
                color: "#fff",
                background: "transparent",
                cursor: "text",
                whiteSpace: "pre-line",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setEditingParagraph(true);
                onSelect && onSelect({ ...el, id });
              }}
            >
              {paragraphValue || "Paragraph"}
            </p>
          )}
        </Box>
      )}
      {el.type === "image" && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {el.src ? (
            <Box
              component="img"
              src={el.src}
              alt={el.alt || "Image"}
              sx={{
                width: el.width || "120px",
                height: el.height || "120px",
                objectFit: "cover",
                borderRadius: "10px",
                background: "#181818",
                border: "1px solid #444",
                display: "block",
                mb: 1,
              }}
            />
          ) : (
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{
                color: "#90caf9",
                borderColor: "#555",
                background: "#181818",
                borderRadius: "10px",
                fontWeight: 500,
                px: 2,
                py: 1,
                mb: 1,
                "&:hover": { borderColor: "#1976d2", background: "#222" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.click();
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ElementRenderer;