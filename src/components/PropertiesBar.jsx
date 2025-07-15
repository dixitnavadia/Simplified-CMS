// import * as React from "react";
// import "../styles/NewPage.css";

// const PropertiesBar = ({ element }) => {
//   if (!element) return null;

//   return (
//     <>
//       <aside className="properties">
//         <h3>Quick Properties</h3>
//         {element.type === "header" && (
//           <>
//             <div className="prop-field">Header Text</div>
//             <div className="prop-field">Font Size</div>
//             <div className="prop-field">Font Weight</div>
//           </>
//         )}
//         {element.type === "paragraph" && (
//           <>
//             <div className="prop-field">Paragraph Text</div>
//             <div className="prop-field">Font Size</div>

//           </>
//         )}
//         {element.type === "image" && (
//           <>
//             <div className="prop-field">Image URL</div>
//             <div className="prop-field">Width</div>
//             <div className="prop-field">Height</div>
//             <div className="prop-field">Alt Text</div>
//           </>
//         )}
//       </aside>
//     </>
//   );
// };

// export default PropertiesBar;

// Umbau mit MUI

import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const PropertiesBar = ({ element }) => {
  if (!element) return null;

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
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Quick Properties
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {element.type === "header" && (
          <>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Header Text
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Font Size
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Font Weight
            </Button>
          </>
        )}
        {element.type === "paragraph" && (
          <>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Paragraph Text
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Font Size
            </Button>
          </>
        )}
        {element.type === "image" && (
          <>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Image URL
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Width
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Height
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#555" }}
            >
              Alt Text
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PropertiesBar;
