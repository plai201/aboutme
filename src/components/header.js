import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="bg-dark text-light sticky-top py-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
          {/* Logo */}
          <div className="d-flex flex-column align-items-center">
            <a className="navbar-brand fw-bold fs-3 text-uppercase" href="#" style={{ color: "#a97822" }}>
              WebMaster Pro
            </a>
          </div>

          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler mt-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse justify-content-center mt-3" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-light mx-3" href="#about">
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light mx-3" href="#services">
                  Dịch vụ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light mx-3" href="#portfolio">
                  Dự án
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light mx-3" href="#contact">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
