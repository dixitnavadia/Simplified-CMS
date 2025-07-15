import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ActionsBar = ({ onSave, onAdd }) => (
  <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
    <Button
      variant="contained"
      onClick={(e) => {
        e.stopPropagation();
        onSave && onSave();
      }}
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        "&:hover": { bgcolor: "#1565c0" },
      }}
    >
      Save
    </Button>
    <Button
      variant="contained"
      onClick={onAdd}
      sx={{ bgcolor: "#333", color: "#fff", "&:hover": { bgcolor: "#444" } }}
    >
      Add New Element
    </Button>
  </Box>
);

export default ActionsBar;
