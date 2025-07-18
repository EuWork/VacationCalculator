/// <reference types="vite-plugin-svgr/client" />
import "./optimize";

import "@app/ui/dist/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { setDefaultErrorComponent } from "@app/front-modules";

import DefaultErrorCard from "components/DefaultErrorCard";

import Pages from "./pages";

setDefaultErrorComponent(DefaultErrorCard);

ReactDOM.createRoot(document.getElementById("root")!).render(React.createElement(Pages));
