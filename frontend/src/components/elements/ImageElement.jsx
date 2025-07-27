import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageElement = ({ el, onEdit, onSelect }) => {
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = (e) => {
        if (onEdit) onEdit({ ...el, src: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect();
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
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current.click();
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
        </Button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </Box>
  );
};

export default ImageElement;