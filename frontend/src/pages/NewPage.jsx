import * as React from "react";
import LeftNavBar from "../components/LeftNavBar";
import PropertiesBar from "../components/PropertiesBar";
import UserMenu from "../components/UserMenu";
import ElementRenderer from "../components/ElementRenderer";
import AddElementModal from "../components/AddElementModal";
import ActionsBar from "../components/ActionsBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material";

const NewPage = () => {
  const [open, setOpen] = React.useState(false);
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Load elements from localStorage on initial render
  React.useEffect(() => {
    const savedElements = localStorage.getItem("page-elements");
    if (savedElements) {
      try {
        setElements(JSON.parse(savedElements));
      } catch (e) {
        console.error("Failed to parse saved elements", e);
      }
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addElement = (type) => {
    const newElements = [...elements, { type }];
    setElements(newElements);
    saveElementsToJson(newElements);
    handleClose();
  };

  const deleteElement = (id) => {
    const newElements = elements.filter((_, i) => i !== id);
    setElements(newElements);
    saveElementsToJson(newElements);
    
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  const handleEditElement = (id, updatedEl) => {
    console.log("Editing element:", id, updatedEl);
    
    // Update the elements array
    const newElements = elements.map((el, idx) => 
      idx === id ? { ...el, ...updatedEl } : el
    );
    
    setElements(newElements);
    saveElementsToJson(newElements);
    
    // If this is the currently selected element, update that too
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...updatedEl });
    }
  };

  // Save elements to JSON
  const saveElementsToJson = (elementsToSave) => {
    try {
      localStorage.setItem("page-elements", JSON.stringify(elementsToSave));
    } catch (e) {
      console.error("Failed to save elements", e);
    }
  };

  // Manual save function for the Save button
  const handleSave = () => {
    saveElementsToJson(elements);
    setSnackbar({
      open: true,
      message: "Page saved successfully!",
      severity: "success"
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Debug function to help diagnose issues
  React.useEffect(() => {
    console.log("Elements:", elements);
    console.log("Selected Element:", selectedElement);
  }, [elements, selectedElement]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#181818",
        color: "#fff",
        display: "flex",
        flexDirection: "row",
      }}
      onClick={() => setSelectedElement(null)}
    >
      <LeftNavBar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ px: 4, py: 3, borderBottom: "1px solid #333" }}>
          <Typography variant="h4" component="h1">
            New Product Page
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            px: { xs: 1, md: 4 },
            py: 2,
          }}
        >
          {/* Main Content */}
          <Box sx={{ flex: 1, pr: { md: 4 }, mb: { xs: 3, md: 0 } }}>
            <Box>
              {elements.map((el, id) => (
                <ElementRenderer
                  key={id}
                  el={el}
                  id={id}
                  onSelect={() => setSelectedElement({ ...el, id })}
                  onDelete={deleteElement}
                  onEdit={handleEditElement}
                />
              ))}
            </Box>
            <ActionsBar onAdd={handleOpen} onSave={handleSave} />
            <AddElementModal
              open={open}
              handleClose={handleClose}
              addElement={addElement}
            />
          </Box>
          {/* Right Panel */}
          <Box
            sx={{
              width: { xs: "100%", md: 320 },
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              pl: { md: 2 },
              mt: { xs: 8, md: 6 },
              gap: 3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <UserMenu
              user={{ name: "Max", email: "Max.Mustermann@gmail.com" }}
            />
            {selectedElement && (
              <PropertiesBar
                element={selectedElement}
                onEdit={handleEditElement}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewPage;