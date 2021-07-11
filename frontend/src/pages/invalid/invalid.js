import React from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";
import "./styles.css"

// Formatting/styles need to be updated (this is a placeholder)
const invalidPage = () => {
  return (
    <div className="invalid-container">
      <h1 style={{ margin: 0, fontSize: 72, color: "rgba(0, 0, 0, 0.2)" }}>404</h1>
      <h1 style={{ margin: 0, marginTop: -10, fontSize: 28, color: "rgba(0, 0, 0, 0.2)" }}>This page doesn't exist!</h1>
      <div class="invalid-page">
        <HiOutlineEmojiSad style={{ marginTop: 0 }} size={128} color="rgba(0, 0, 0, 0.1)" />
      </div>
    </div>
  );
};

export default invalidPage;