import * as React from "react";
import "../styles/NewPage.css";

const LeftNavBar = () => {
  return (
    <>
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
    </>
  );
};
export default LeftNavBar;
