import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

const PropertiesBar = ({ element, onEdit }) => {
  if (!element) return null;

  const handleChange = (property, value) => {
    console.log(`Changing ${property} to ${value} for element ID: ${element.id}`);
    if (onEdit && element.id !== undefined) {
      onEdit(element.id, { ...element, [property]: value });
    }
  };

  // Helper function to ensure font size has 'px' unit
  const formatFontSize = (fontSize) => {
    if (!fontSize) return "";
    // If it's just a number, add 'px'
    if (/^\d+$/.test(fontSize)) {
      return fontSize + "px";
    }
    return fontSize;
  };

  // Helper function to extract numeric value from font size
  const getFontSizeValue = (fontSize) => {
    if (!fontSize) return "";
    // Extract number from strings like "32px", "2rem", etc.
    const match = fontSize.match(/^\d+/);
    return match ? match[0] : fontSize;
  };

  // Font family options
  const fontFamilyOptions = [
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Courier New, monospace", label: "Courier New" },
  ];

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
              select
              label="Font Family"
              variant="outlined"
              value={element.fontFamily || "Roboto, sans-serif"}
              onChange={(e) => handleChange("fontFamily", e.target.value)}
              sx={{
                "& .MuiSelect-select": { color: "#fff" },
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
            >
              {fontFamilyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Font Size"
              variant="outlined"
              type="number"
              value={getFontSizeValue(element.fontSize) || "32"}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "32px";
                handleChange("fontSize", formattedValue);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "32px";
                handleChange("fontSize", formattedValue);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px</InputAdornment>,
                inputProps: { min: 8, max: 200 }
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
              type="number"
              value={element.fontWeight || "700"}
              onChange={(e) => handleChange("fontWeight", e.target.value)}
              onBlur={(e) => {
                handleChange("fontWeight", e.target.value);
              }}
              InputProps={{
                inputProps: { min: 100, max: 900, step: 100 }
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
              select
              label="Font Family"
              variant="outlined"
              value={element.fontFamily || "Roboto, sans-serif"}
              onChange={(e) => handleChange("fontFamily", e.target.value)}
              sx={{
                "& .MuiSelect-select": { color: "#fff" },
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
            >
              {fontFamilyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Font Size"
              variant="outlined"
              type="number"
              value={getFontSizeValue(element.fontSize) || "16"}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "16px";
                handleChange("fontSize", formattedValue);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "16px";
                handleChange("fontSize", formattedValue);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px</InputAdornment>,
                inputProps: { min: 8, max: 200 }
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
              type="number"
              value={element.fontWeight || "400"}
              onChange={(e) => handleChange("fontWeight", e.target.value)}
              onBlur={(e) => {
                handleChange("fontWeight", e.target.value);
              }}
              InputProps={{
                inputProps: { min: 100, max: 900, step: 100 }
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
              type="number"
              value={getFontSizeValue(element.width) || "120"}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "120px";
                handleChange("width", formattedValue);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "120px";
                handleChange("width", formattedValue);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px</InputAdornment>,
                inputProps: { min: 50, max: 1000 }
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
              type="number"
              value={getFontSizeValue(element.height) || "120"}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "120px";
                handleChange("height", formattedValue);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : "120px";
                handleChange("height", formattedValue);
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end" sx={{ color: "#aaa" }}>px</InputAdornment>,
                inputProps: { min: 50, max: 1000 }
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