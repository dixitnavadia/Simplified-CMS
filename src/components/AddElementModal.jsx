import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const AddElementModal = ({ open, handleClose, addElement }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "#232323",
        border: "2px solid #333",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ color: "#fff" }}
      >
        Select an element
      </Typography>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          width: "100%",
          flexDirection: "column",
          gap: "16px",
          padding: "10px",
          backgroundColor: "#181818",
          borderRadius: "8px",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="outlined"
          sx={{ color: "#fff", borderColor: "#555" }}
          onClick={() => addElement("header")}
          fullWidth
        >
          Header
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#fff", borderColor: "#555" }}
          onClick={() => addElement("paragraph")}
          fullWidth
        >
          Paragraph
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#fff", borderColor: "#555" }}
          onClick={() => addElement("image")}
          fullWidth
        >
          Image
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default AddElementModal;
