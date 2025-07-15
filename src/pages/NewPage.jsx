import * as React from "react";
import LeftNavBar from "../components/LeftNavBar";
import PropertiesBar from "../components/PropertiesBar";
import UserMenu from "../components/UserMenu";
import ElementRenderer from "../components/ElementRenderer";
import AddElementModal from "../components/AddElementModal";
import ActionsBar from "../components/ActionsBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NewPage = () => {
  const [open, setOpen] = React.useState(false);
  const [elements, setElements] = React.useState([]);
  const [selectedElement, setSelectedElement] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addElement = (type) => {
    setElements([...elements, { type }]);
    handleClose();
  };

  const deleteElement = (id) => {
    setElements(elements.filter((_, i) => i !== id));
    setSelectedElement(null);
  };

  const handleEditElement = (id, updatedEl) => {
  setElements(prev =>
    prev.map((el, idx) => (idx === id ? { ...el, ...updatedEl } : el))
  );
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
                  onSelect={setSelectedElement}
                  onDelete={deleteElement}
                  onEdit={handleEditElement}
                />
              ))}
            </Box>
            <ActionsBar onAdd={handleOpen} />
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
            {selectedElement && <PropertiesBar element={selectedElement} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPage;
