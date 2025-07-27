import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HeaderElement from "./elements/HeaderElement";
import ParagraphElement from "./elements/ParagraphElement";
import ImageElement from "./elements/ImageElement";

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
  const handleElementClick = (event) => {
    event.stopPropagation();
    onSelect && onSelect({ ...el, id });
  };

  const handleElementEdit = (updatedElement) => {
    if (onEdit) onEdit(id, updatedElement);
  };

  const handleElementSelect = () => {
    onSelect && onSelect({ ...el, id });
  };

  const renderElement = () => {
    switch (el.type) {
      case "header":
        return (
          <HeaderElement
            el={el}
            onEdit={handleElementEdit}
            onSelect={handleElementSelect}
          />
        );
      case "paragraph":
        return (
          <ParagraphElement
            el={el}
            onEdit={handleElementEdit}
            onSelect={handleElementSelect}
          />
        );
      case "image":
        return (
          <ImageElement
            el={el}
            onEdit={handleElementEdit}
            onSelect={handleElementSelect}
          />
        );
      default:
        return <div>Unknown element type</div>;
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
      {renderElement()}
    </Paper>
  );
};

export default ElementRenderer;