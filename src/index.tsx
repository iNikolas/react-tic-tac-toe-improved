import React from "react";
import { createRoot } from "react-dom/client";
import Game from "./components/Game";
import "./index.css";

createRoot(document.getElementById("root")!).render(<Game />);
