import * as React from "react";
import "../styles/NewPage.css"; // Assuming you have a CSS file for styles
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>CMS</h1>
        <nav>
          <ul>
            <li className="nav-bar-item">Dashboard</li>
            <li className="nav-bar-item">Product Pages</li>
            <li className="nav-bar-item">Media Library</li>
            <li className="nav-bar-item">Settings</li>
          </ul>
        </nav>
        <button className="new-page-btn">+ New Page</button>
      </aside>

      <div className="main-layout">
        <div className="top-bar">
          <header className="header">
            <h2>New Product Page</h2>
          </header>
          <div className="user-icon">U</div>
        </div>

        <main className="main-content">
          <form className="editor">
            <input type="text" className="field" placeholder="Beispiel Text" />
            <input
              type="image"
              className="image"
              placeholder="Upload Image"
              src="https://placehold.jp/150x150.png"
              alt="Product Image"
            />
          </form>

          <div className="actions">
            <div>
              <Button variant="contained">Save</Button>
            </div>
            <div>
            <Button variant="contained" onClick={handleOpen}>
              Add New Element
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
            </div>
          </div>
        </main>
      </div>

      <div className="right-panel">
        <aside className="properties">
          <h3>Quick Properties</h3>
          <div className="prop-field">Font: Arial</div>
          <div className="prop-field">Size: 14px</div>
        </aside>
      </div>
    </div>
  );
};

export default NewPage;
