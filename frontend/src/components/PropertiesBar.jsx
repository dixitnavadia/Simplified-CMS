import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

const PropertiesBar = ({ element, onEdit }) => {
  if (!element) return null;

  const handleChange = (property, value) => {
    console.log(`Changing ${property} to ${value} for element ID: ${element.id}`);
    if (onEdit && element.id !== undefined) {
      onEdit(element.id, { ...element, [property]: value });
    }
  };

  // Handle multiple property updates at once
  const handleMultipleChanges = (updates) => {
    console.log(`Updating multiple properties for element ID: ${element.id}`, updates);
    if (onEdit && element.id !== undefined) {
      const updatedElement = { ...element, ...updates };
      onEdit(element.id, updatedElement);
    }
  };

  // Handle font styling toggle
  const handleFontStyleChange = (event, newStyles) => {
    const isBold = newStyles.includes('bold');
    const isItalic = newStyles.includes('italic');
    const isUnderline = newStyles.includes('underline');
    
    // Prepare updates object
    let updates = {
      isBold,
      isItalic,
      isUnderline
    };
    
    // Adjust font weight based on bold state
    if (isBold !== element.isBold) {
      if (isBold) {
        // Turning bold ON - increase font weight if it's low
        const currentWeight = parseInt(element.fontWeight) || (element.type === 'header' ? 700 : 400);
        updates.fontWeight = currentWeight < 600 ? '700' : currentWeight.toString();
      } else {
        // Turning bold OFF - decrease font weight if it's high
        const currentWeight = parseInt(element.fontWeight) || (element.type === 'header' ? 700 : 400);
        updates.fontWeight = currentWeight > 600 ? '400' : currentWeight.toString();
      }
    }
    
    // Apply all updates at once
    handleMultipleChanges(updates);
  };

  // Get current font styles for toggle buttons
  const getCurrentFontStyles = () => {
    const styles = [];
    if (element.isBold) styles.push('bold');
    if (element.isItalic) styles.push('italic');
    if (element.isUnderline) styles.push('underline');
    return styles;
  };

  // Helper function to extract numeric value from font size
  const getFontSizeValue = (fontSize) => {
    if (!fontSize) return "";
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

  // Predefined color options
  const fontColorOptions = [
    { value: "#fff", label: "White" },
    { value: "#000", label: "Black" },
    { value: "#ff0000", label: "Red" },
    { value: "#00ff00", label: "Green" },
    { value: "#0000ff", label: "Blue" },
    { value: "#ffff00", label: "Yellow" },
    { value: "#ff00ff", label: "Magenta" },
    { value: "#00ffff", label: "Cyan" },
    { value: "#ffa500", label: "Orange" },
    { value: "#800080", label: "Purple" },
    { value: "#808080", label: "Gray" },
    { value: "#90caf9", label: "Light Blue" },
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
        {(element.type === "header" || element.type === "paragraph") && (
          <>
            <TextField
              label={element.type === "header" ? "Header Text" : "Paragraph Text"}
              variant="outlined"
              multiline={element.type === "paragraph"}
              rows={element.type === "paragraph" ? 3 : 1}
              value={element.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              onBlur={(e) => {
                handleChange("text", e.target.value);
              }}
              sx={{
                input: { color: "#fff" },
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

            {/* Font Styling Toggle Buttons */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "#aaa" }}>
                Font Style
              </Typography>
              <ToggleButtonGroup
                value={getCurrentFontStyles()}
                onChange={handleFontStyleChange}
                aria-label="font styling"
                size="small"
                sx={{ mb: 2 }}
              >
                <ToggleButton 
                  value="bold" 
                  aria-label="bold"
                  sx={{ 
                    color: "#fff", 
                    borderColor: "#555",
                    "&.Mui-selected": { 
                      bgcolor: "#90caf9", 
                      color: "#000",
                      "&:hover": { bgcolor: "#64b5f6" }
                    },
                    "&:hover": { borderColor: "#777" }
                  }}
                >
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton 
                  value="italic" 
                  aria-label="italic"
                  sx={{ 
                    color: "#fff", 
                    borderColor: "#555",
                    "&.Mui-selected": { 
                      bgcolor: "#90caf9", 
                      color: "#000",
                      "&:hover": { bgcolor: "#64b5f6" }
                    },
                    "&:hover": { borderColor: "#777" }
                  }}
                >
                  <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton 
                  value="underline" 
                  aria-label="underlined"
                  sx={{ 
                    color: "#fff", 
                    borderColor: "#555",
                    "&.Mui-selected": { 
                      bgcolor: "#90caf9", 
                      color: "#000",
                      "&:hover": { bgcolor: "#64b5f6" }
                    },
                    "&:hover": { borderColor: "#777" }
                  }}
                >
                  <FormatUnderlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Subscript and Superscript Checkboxes */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={element.isSubscript || false}
                      onChange={(e) => {
                        const updates = {
                          isSubscript: e.target.checked,
                          isSuperscript: e.target.checked ? false : element.isSuperscript
                        };
                        handleMultipleChanges(updates);
                      }}
                      sx={{
                        color: "#aaa",
                        "&.Mui-checked": { color: "#90caf9" },
                      }}
                    />
                  }
                  label="Subscript"
                  sx={{ 
                    color: "#aaa", 
                    "& .MuiFormControlLabel-label": { fontSize: "0.875rem" }
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={element.isSuperscript || false}
                      onChange={(e) => {
                        const updates = {
                          isSuperscript: e.target.checked,
                          isSubscript: e.target.checked ? false : element.isSubscript
                        };
                        handleMultipleChanges(updates);
                      }}
                      sx={{
                        color: "#aaa",
                        "&.Mui-checked": { color: "#90caf9" },
                      }}
                    />
                  }
                  label="Superscript"
                  sx={{ 
                    color: "#aaa", 
                    "& .MuiFormControlLabel-label": { fontSize: "0.875rem" }
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ bgcolor: "#444" }} />

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
              value={getFontSizeValue(element.fontSize) || (element.type === "header" ? "32" : "16")}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : (element.type === "header" ? "32px" : "16px");
                handleChange("fontSize", formattedValue);
              }}
              onBlur={(e) => {
                const value = e.target.value;
                const formattedValue = value ? `${value}px` : (element.type === "header" ? "32px" : "16px");
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
              value={element.fontWeight || (element.type === "header" ? "700" : "400")}
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

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                select
                label="Font Color"
                variant="outlined"
                value={element.fontColor || "#fff"}
                onChange={(e) => handleChange("fontColor", e.target.value)}
                sx={{
                  flex: 1,
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
                {fontColorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: option.value,
                          borderRadius: "50%",
                          border: "1px solid #666",
                        }}
                      />
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Custom"
                variant="outlined"
                type="color"
                value={element.fontColor || "#ffffff"}
                onChange={(e) => handleChange("fontColor", e.target.value)}
                sx={{
                  width: 80,
                  "& input": {
                    height: "20px",
                    padding: "8px",
                    cursor: "pointer",
                  },
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
            </Box>
          </>
        )}

        {/* Image properties remain unchanged */}
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