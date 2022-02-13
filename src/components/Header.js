import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <header>dreamy randomizer</header>
      <div className="header--underline"></div>
      <a href="https://www.danielfenner.dev" target="_blank">
        by @danielfennerdev
      </a>
    </div>
  );
}
