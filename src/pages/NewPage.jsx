import * as React from "react";
import "../styles/NewPage.css";
import LeftNavBar from "../components/LeftNavBar";
import PropertiesBar from "../components/PropertiesBar";
import UserMenu from "../components/UserMenu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const NewPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);

  const elementStyle = {
    border: "1px dashed grey",
    bgcolor: "slategray",
    color: "white",
    padding: "10px",
    alignContent: "center",
    margin: "10px",
  };

  const addElement = (type) => {
    setElements([...elements, { type }]);
    handleClose();
  };

  const deleteElement = (id) => {
    setElements(elements.filter((_, i) => i !== id));
    setSelectedElement(null);
  };

  return (
    <div className="app" onClick={() => setSelectedElement(null)}>
      <LeftNavBar />
      <div className="main-layout">
        <div className="top-bar">
          <header className="header">
            <h2>New Product Page</h2>
          </header>
        </div>
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
          <div style={{ flex: 1 }}>
            <div className="Elements">
              {elements.map((el, id) => {
                const handleElementClick = (event) => {
                  event.stopPropagation();
                  setSelectedElement({ ...el, id });
                };
                if (el.type === "header") {
                  return (
                    <Box
                      key={id}
                      component="header"
                      sx={elementStyle}
                      onClick={handleElementClick}
                      style={{ position: "relative" }}
                    >
                      <DeleteForeverOutlinedIcon
                        fontSize="medium"
                        color="error"
                        style={{ position: "absolute", top: 7, right: 10 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(id);
                        }}
                      />
                      Header
                    </Box>
                  );
                }
                if (el.type === "paragraph") {
                  return (
                    <Box
                      key={id}
                      component="p"
                      sx={elementStyle}
                      onClick={handleElementClick}
                      style={{ position: "relative" }}
                    >
                      <DeleteForeverOutlinedIcon
                        fontSize="medium"
                        color="error"
                        style={{ position: "absolute", top: 7, right: 10 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(id);
                        }}
                      />
                      Paragraph
                    </Box>
                  );
                }
                if (el.type === "image") {
                  return (
                    <Box>
                      <Box
                        key={id}
                        component={el.type === "image" ? "img" : el.type}
                        sx={elementStyle}
                        alt={el.type === "image" ? "Image" : undefined}
                        onClick={handleElementClick}
                        style={{ position: "relative", width: "100px", height: "100px" }}
                      ></Box>
                      <DeleteForeverOutlinedIcon
                        fontSize="medium"
                        color="error"
                        style={{position:"relative", top: 4, right: 10}}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(id);
                        }}
                      />
                    </Box>
                  );
                }
                return null;
              })}
            </div>
            <div className="actions">
              <div>
                <Button
                  variant="contained"
                  onClick={(e) => e.stopPropagation()}
                >
                  Save
                </Button>
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 900,
                      bgcolor: "black",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Select an element
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: "20px",
                        width: "100%",
                        flexDirection: "row",
                        gap: "10px",
                        padding: "10px",
                        backgroundColor: "black",
                        borderRadius: "8px",
                        justifyContent: "space-around",
                      }}
                    >
                      <Box
                        component="header"
                        sx={elementStyle}
                        onClick={() => addElement("header")}
                      >
                        Header
                      </Box>
                      <Box
                        component="p"
                        sx={elementStyle}
                        onClick={() => addElement("paragraph")}
                      >
                        Paragraph
                      </Box>
                      <Box
                        component="image"
                        sx={elementStyle}
                        onClick={() => addElement("image")}
                      >
                        Image
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
          <div className="right-panel" onClick={(e) => e.stopPropagation()}>
            <UserMenu
              user={{ name: "Max", email: "Max.Mustermann@gmail.com" }}
            />
            {selectedElement && <PropertiesBar element={selectedElement} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
