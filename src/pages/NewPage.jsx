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
          <form className="editor">
            <input
              type="text"
              className="field"
              placeholder="Product Title: Smartphone X"
            />
            <input
              type="text"
              className="field"
              placeholder="Description: Latest model with improved battery life"
            />
            <input type="price" className="field" placeholder="Price" />
            <input
              type="image"
              className="image"
              placeholder="Upload Image"
              src="https://placehold.jp/150x150.png"
              alt="Product Image"
            />
            <div className="drop-zone">Drag & Drop to Add Content</div>
          </form>
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
