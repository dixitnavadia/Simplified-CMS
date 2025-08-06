import * as React from "react";
import LeftNavBar from "../components/LeftNavBar";
import PropertiesBar from "../components/PropertiesBar";
import ElementRenderer from "../components/ElementRenderer";
import AddElementModal from "../components/AddElementModal";
import ActionsBar from "../components/ActionsBar";
import PageMetaData from "../components/PageMetaData";
import useUnsavedChanges from "../hooks/useUnsavedChanges";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";

const NewPage = ({handleLogout}) => {
  const [open, setOpen] = React.useState(false);
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [pageMetaData, setPageMetaData] = React.useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
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
        const parsedElements = JSON.parse(savedElements);
        setElements(parsedElements);
        setHasUnsavedChanges(parsedElements.length > 0);
        console.log('🔄 Loaded elements from localStorage:', parsedElements);
      } catch (e) {
        console.error("❌ Failed to parse saved elements", e);
      }
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addElement = (type) => {
    console.log(`➕ Adding new element of type: ${type}`);
    const newElements = [...elements, { type }];
    setElements(newElements);
    setHasUnsavedChanges(true);
    saveElementsToJson(newElements);
    handleClose();
  };

  const deleteElement = (id) => {
    console.log(`🗑️ Deleting element with id: ${id}`);
    const newElements = elements.filter((_, i) => i !== id);
    setElements(newElements);
    setHasUnsavedChanges(newElements.length > 0);
    saveElementsToJson(newElements);
    
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
      console.log('🔄 Cleared selected element');
    }
  };

  const handleEditElement = (id, updatedEl) => {
    console.log("✏️ Editing element:", id, updatedEl);
    
    const newElements = elements.map((el, idx) => 
      idx === id ? { ...el, ...updatedEl } : el
    );
    
    setElements(newElements);
    setHasUnsavedChanges(true);
    saveElementsToJson(newElements);
    
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...updatedEl });
      console.log('🔄 Updated selected element:', { ...selectedElement, ...updatedEl });
    }
  };

  const saveElementsToJson = (elementsToSave) => {
    try {
      localStorage.setItem("page-elements", JSON.stringify(elementsToSave));
      console.log('💾 Elements saved to localStorage:', elementsToSave);
    } catch (e) {
      console.error("❌ Failed to save elements", e);
    }
  };

  const handleSave = () => {
    saveElementsToJson(elements);
    console.log('💾 Manual save triggered');
    setSnackbar({
      open: true,
      message: "Page saved successfully!",
      severity: "success"
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSaveDraft = async (title) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/pages/draft', {
        title,
        elements
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setHasUnsavedChanges(false);
      localStorage.removeItem("page-elements");
      
      setSnackbar({
        open: true,
        message: "Page saved as draft successfully!",
        severity: "success"
      });
      
      console.log('📄 Draft saved:', response.data.draft);
    } catch (error) {
      console.error('Error saving draft:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to save draft",
        severity: "error"
      });
    }
  };

  const { showUnsavedWarning } = useUnsavedChanges(hasUnsavedChanges, elements, handleSaveDraft);

  React.useEffect(() => {
    console.group('🔄 State Update');
    console.log("Elements:", elements);
    console.log("Selected Element:", selectedElement);
    console.log("Has Unsaved Changes:", hasUnsavedChanges);
    console.log("Page Metadata:", pageMetaData);
    console.groupEnd();
  }, [elements, selectedElement, pageMetaData, hasUnsavedChanges]);

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
      <LeftNavBar showUnsavedWarning={showUnsavedWarning} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ px: 4, py: 3, borderBottom: "1px solid #333" }}>
          <Typography variant="h4" component="h1">
            New Product Page
            {hasUnsavedChanges && (
              <Typography component="span" sx={{ color: "#ff9800", ml: 1, fontSize: "0.8em" }}>
                (Unsaved changes)
              </Typography>
            )}
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
            <ActionsBar 
              onAdd={handleOpen} 
              onSave={handleSave}
              onSaveDraft={handleSaveDraft}
              elements={elements}
              isDraftMode={false}
            />
            <AddElementModal
              open={open}
              handleClose={handleClose}
              addElement={addElement}
            />
          </Box>
          {/* Right Panel - Removed UserMenu from here */}
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