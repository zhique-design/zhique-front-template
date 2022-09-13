import React from "react";
import { createRoot } from "react-dom/client";
import ZhiQue from "./ZhiQue";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

root.render(<ZhiQue />);
