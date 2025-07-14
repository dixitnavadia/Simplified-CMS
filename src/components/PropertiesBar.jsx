import * as React from "react";
import "../styles/NewPage.css";

const PropertiesBar = ({ element }) => {
  if (!element) return null;
    
  return (
    <div className="right-panel" onClick={e => e.stopPropagation()}>
      <aside className="properties">
        <h3>Quick Properties</h3>
        {element.type === "header" && (
          <>
            <div className="prop-field">Header Text</div>
            <div className="prop-field">Font Size</div>
            <div className="prop-field">Font Weight</div>
          </>
        )}
        {element.type === "paragraph" && (
          <>
            <div className="prop-field">Paragraph Text</div>
            <div className="prop-field">Font Size</div>
            
          </>
        )}
        {element.type === "image" && (
          <>
            <div className="prop-field">Image URL</div>
            <div className="prop-field">Width</div>
            <div className="prop-field">Height</div>
            <div className="prop-field">Alt Text</div>
          </>
        )}
      </aside>
    </div>
  );
};

export default PropertiesBar;
