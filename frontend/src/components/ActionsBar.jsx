import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";

const ActionsBar = ({ 
  onAdd, 
  onSaveDraft, 
  elements, 
  isDraftMode = false, 
  draftTitle = "",
  draftId = null,
  onUpdateDraft
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [duplicateDialog, setDuplicateDialog] = useState(false);
  const [existingDraft, setExistingDraft] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleSaveDraft = () => {
    if (elements.length === 0) {
      alert("Please add some elements before saving as draft");
      return;
    }
    
    if (isDraftMode) {
      setTitle(draftTitle);
    } else {
      setTitle("");
    }
    
    setOpen(true);
  };

  const checkTitleAvailability = async (titleToCheck) => {
    if (!titleToCheck.trim()) return { exists: false };

    setIsChecking(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/pages/draft/check-title', {
        title: titleToCheck.trim(),
        excludeId: isDraftMode ? draftId : null
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error checking title:', error);
      return { exists: false };
    } finally {
      setIsChecking(false);
    }
  };

  const handleConfirmSave = async () => {
    if (!title.trim()) {
      alert("Please enter a page title");
      return;
    }

    // Check for duplicate title
    const titleCheck = await checkTitleAvailability(title);
    
    if (titleCheck.exists) {
      setExistingDraft(titleCheck.draft);
      setOpen(false);
      setDuplicateDialog(true);
      return;
    }

    // Proceed with save
    proceedWithSave(title.trim());
  };

  const proceedWithSave = (finalTitle) => {
    if (isDraftMode && onUpdateDraft) {
      onUpdateDraft(finalTitle);
    } else {
      onSaveDraft(finalTitle);
    }
    
    setTitle("");
    setOpen(false);
    setDuplicateDialog(false);
    setExistingDraft(null);
  };

  const handleOverwrite = () => {
    proceedWithSave(title.trim());
  };

  const handleSaveWithNewTitle = () => {
    setDuplicateDialog(false);
    setOpen(true); // Reopen title dialog
  };

  const handleClose = () => {
    setTitle("");
    setOpen(false);
    setDuplicateDialog(false);
    setExistingDraft(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          onClick={handleSaveDraft}
          disabled={isChecking}
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          {isChecking ? "Checking..." : (isDraftMode ? "Update Draft" : "Save as Draft")}
        </Button>
        
        <Button
          variant="contained"
          onClick={onAdd}
          sx={{ bgcolor: "#333", color: "#fff", "&:hover": { bgcolor: "#444" } }}
        >
          Add New Element
        </Button>
        
        {isDraftMode && (
          <>
            <Button
              variant="outlined"
              sx={{ color: "#90caf9", borderColor: "#90caf9" }}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#ff9800", color: "#fff", "&:hover": { bgcolor: "#f57c00" } }}
            >
              Publish
            </Button>
          </>
        )}
      </Box>

      {/* Title Input Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#232323", color: "#fff" }}>
          {isDraftMode ? "Update Draft Title" : "Save Page as Draft"}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#232323", pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Page Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isChecking}
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
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#232323", p: 2 }}>
          <Button onClick={handleClose} sx={{ color: "#aaa" }}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSave} 
            variant="contained"
            disabled={isChecking}
            sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" } }}
          >
            {isDraftMode ? "Update Draft" : "Save Draft"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Duplicate Title Warning Dialog */}
      <Dialog 
        open={duplicateDialog} 
        onClose={() => setDuplicateDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#ff5722", color: "#fff" }}>
          ⚠️ Duplicate Title Found
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#232323", pt: 3 }}>
          <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
            A page with the title <strong>"{title}"</strong> already exists.
          </Typography>
          
          {existingDraft && (
            <Box sx={{ bgcolor: "#333", p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "#90caf9", mb: 1 }}>
                Existing Draft Details:
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Created: {formatDate(existingDraft.createdAt)}
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Last Updated: {formatDate(existingDraft.updatedAt)}
              </Typography>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Elements: {existingDraft.elements?.length || 0}
              </Typography>
            </Box>
          )}

          <Typography variant="body2" sx={{ color: "#ccc" }}>
            What would you like to do?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#232323", p: 2, gap: 1 }}>
          <Button 
            onClick={() => setDuplicateDialog(false)} 
            sx={{ color: "#aaa" }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveWithNewTitle}
            variant="outlined"
            sx={{ 
              color: "#90caf9", 
              borderColor: "#90caf9",
              "&:hover": { bgcolor: "#1a237e" }
            }}
          >
            Use Different Title
          </Button>
          <Button 
            onClick={handleOverwrite}
            variant="contained"
            sx={{ 
              bgcolor: "#ff5722", 
              "&:hover": { bgcolor: "#e64a19" }
            }}
          >
            Overwrite Existing
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionsBar;
