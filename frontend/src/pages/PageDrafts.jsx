import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import axios from "axios";
import LeftNavBar from "../components/LeftNavBar";
import ElementRenderer from "../components/ElementRenderer";
import PropertiesBar from "../components/PropertiesBar";
import ActionsBar from "../components/ActionsBar";
import AddElementModal from "../components/AddElementModal";
import { Snackbar, Alert } from "@mui/material";

const PageDrafts = ({ handleLogout }) => {
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [addElementModalOpen, setAddElementModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/pages/drafts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setDrafts(response.data.drafts);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      setSnackbar({
        open: true,
        message: "Failed to fetch page drafts",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDraftClick = (draft) => {
    setSelectedDraft(draft);
    setElements(draft.elements || []);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDraft(null);
    setElements([]);
    setSelectedElement(null);
  };

  const handleEditElement = (id, updatedEl) => {
    const newElements = elements.map((el, idx) => 
      idx === id ? { ...el, ...updatedEl } : el
    );
    setElements(newElements);
    
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, ...updatedEl });
    }
  };

  const handleAddElement = (type) => {
    console.log(`➕ Adding new element of type: ${type}`);
    const newElements = [...elements, { type }];
    setElements(newElements);
    setAddElementModalOpen(false);
  };

  const handleDeleteElement = (id) => {
    const newElements = elements.filter((_, i) => i !== id);
    setElements(newElements);
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  const handleUpdateDraft = async (newTitle) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/pages/draft/${selectedDraft.id}`, {
        title: newTitle,
        elements
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSelectedDraft({ ...selectedDraft, title: newTitle });
      
      setSnackbar({
        open: true,
        message: "Draft updated successfully!",
        severity: "success"
      });
      
      fetchDrafts();
    } catch (error) {
      console.error('Error updating draft:', error);
      setSnackbar({
        open: true,
        message: "Failed to update draft",
        severity: "error"
      });
    }
  };

  const handleDeleteDraft = async (draftId) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/pages/draft/${draftId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSnackbar({
        open: true,
        message: "Draft deleted successfully!",
        severity: "success"
      });
      
      fetchDrafts();
    } catch (error) {
      console.error('Error deleting draft:', error);
      setSnackbar({
        open: true,
        message: "Failed to delete draft",
        severity: "error"
      });
    }
  };

  const getFirstHeaderElement = (elements) => {
    return elements.find(el => el.type === 'header');
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#181818",
        color: "#fff",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LeftNavBar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ px: 4, py: 3, borderBottom: "1px solid #333" }}>
          <Typography variant="h4" component="h1">
            Page Drafts
          </Typography>
        </Box>
        
        <Box sx={{ flex: 1, p: 4 }}>
          {loading ? (
            <Typography>Loading drafts...</Typography>
          ) : drafts.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
              No page drafts found. Create your first page!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {drafts.map((draft) => {
                const headerElement = getFirstHeaderElement(draft.elements);
                return (
                  <Grid item xs={12} sm={6} md={4} key={draft.id}>
                    <Card
                      sx={{
                        bgcolor: "#232323",
                        color: "#fff",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        "&:hover": { bgcolor: "#282828" }
                      }}
                      onClick={() => handleDraftClick(draft)}
                    >
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                          {draft.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
                          {headerElement ? headerElement.text || "Header" : "No header element"}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#666" }}>
                          Updated: {format(new Date(draft.updatedAt), 'MMM dd, yyyy HH:mm')}
                        </Typography>
                        <Typography variant="caption" sx={{ display: "block", color: "#666" }}>
                          Elements: {draft.elements.length}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          sx={{ color: "#90caf9" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDraftClick(draft);
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDraft(draft.id);
                          }}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Draft Edit Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#181818",
            color: "#fff",
            minHeight: "80vh"
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#232323",
            borderBottom: "1px solid #333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h6">
            Editing: {selectedDraft?.title}
          </Typography>
          <IconButton onClick={handleCloseModal} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Box sx={{ display: "flex", flex: 1, minHeight: "70vh" }}>
          <Box sx={{ flex: 1, p: 3 }}>
            {elements.map((el, id) => (
              <ElementRenderer
                key={id}
                el={el}
                id={id}
                onSelect={() => setSelectedElement({ ...el, id })}
                onDelete={handleDeleteElement}
                onEdit={handleEditElement}
              />
            ))}
            
            <ActionsBar 
              onAdd={() => setAddElementModalOpen(true)}
              onSaveDraft={() => {}}
              onUpdateDraft={handleUpdateDraft}
              elements={elements}
              isDraftMode={true}
              draftTitle={selectedDraft?.title || ""}
              draftId={selectedDraft?.id || null}
            />

            <AddElementModal
              open={addElementModalOpen}
              handleClose={() => setAddElementModalOpen(false)}
              addElement={handleAddElement}
            />
          </Box>
          
          {selectedElement && (
            <Box sx={{ width: 320, p: 2, borderLeft: "1px solid #333" }}>
              <PropertiesBar
                element={selectedElement}
                onEdit={handleEditElement}
              />
            </Box>
          )}
        </Box>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PageDrafts;