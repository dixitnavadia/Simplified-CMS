import React from "react";
import "../styles/NewPage.css"; // Assuming you have a CSS file for styles

const NewPage = () => {
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
            <div className="actions">
              <button className="preview">Preview</button>
              <button className="publish">Publish</button>
            </div>
          </header>
        </div>

        <main className="main-content">
          <div className="editor">
            <div className="field">Product Title: Smartphone X</div>
            <div className="field">
              Description: Latest model with improved battery life
            </div>
            <div className="field">Image: smartphone.jpg</div>
            <div className="field">Video: demo.mp4</div>
            <div className="drop-zone">Drag & Drop to Add Content</div>
          </div>
        </main>
      </div>

     <div className="right-panel">
        <div className="user-icon">U</div>
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
