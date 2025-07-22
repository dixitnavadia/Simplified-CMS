import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const PropertiesBar = ({ element, onEdit }) => {
  if (!element) return null;

  const handleChange = (property, value) => {
    console.log(`Changing ${property} to ${value} for element ID: ${element.id}`);
    if (onEdit && element.id !== undefined) {
      onEdit(element.id, { ...element, [property]: value });
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        background: "#232323",
        color: "#fff",
        borderRadius: "12px",
        padding: "28px 20px",
        marginTop: "24px",
        minWidth: "220px",
        width: "90%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Quick Properties
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {element.type === "header" && (
          <>
            <TextField
              label="Header Text"
              variant="outlined"
              value={element.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              onBlur={(e) => {
                handleChange("text", e.target.value);
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
            <TextField
              label="Font Size"
              variant="outlined"
              value={element.fontSize || "2rem"}
              onChange={(e) => handleChange("fontSize", e.target.value)}
              onBlur={(e) => {
                handleChange("fontSize", e.target.value);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px/rem</InputAdornment>,
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
            <TextField
              label="Font Weight"
              variant="outlined"
              value={element.fontWeight || "700"}
              onChange={(e) => handleChange("fontWeight", e.target.value)}
              onBlur={(e) => {
                handleChange("fontWeight", e.target.value);
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
          </>
        )}
        {element.type === "paragraph" && (
          <>
            <TextField
              label="Paragraph Text"
              variant="outlined"
              multiline
              rows={3}
              value={element.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              onBlur={(e) => {
                handleChange("text", e.target.value);
              }}
              sx={{
                textarea: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
            <TextField
              label="Font Size"
              variant="outlined"
              value={element.fontSize || "1rem"}
              onChange={(e) => handleChange("fontSize", e.target.value)}
              onBlur={(e) => {
                handleChange("fontSize", e.target.value);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px/rem</InputAdornment>,
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
          </>
        )}
        {element.type === "image" && (
          <>
            <TextField
              label="Image URL"
              variant="outlined"
              value={element.src || ""}
              onChange={(e) => handleChange("src", e.target.value)}
              onBlur={(e) => {
                handleChange("src", e.target.value);
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
            <TextField
              label="Width"
              variant="outlined"
              value={element.width || "120px"}
              onChange={(e) => handleChange("width", e.target.value)}
              onBlur={(e) => {
                handleChange("width", e.target.value);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px</InputAdornment>,
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
            <TextField
              label="Height"
              variant="outlined"
              value={element.height || "120px"}
              onChange={(e) => handleChange("height", e.target.value)}
              onBlur={(e) => {
                handleChange("height", e.target.value);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px</InputAdornment>,
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
            <TextField
              label="Alt Text"
              variant="outlined"
              value={element.alt || ""}
              onChange={(e) => handleChange("alt", e.target.value)}
              onBlur={(e) => {
                handleChange("alt", e.target.value);
              }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#777" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputLabel-root": {
                  color: "#aaa",
                  "&.Mui-focused": { color: "#90caf9" },
                },
              }}
            />
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PropertiesBar;