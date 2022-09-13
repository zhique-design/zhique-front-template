import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "antd";
import "./global.less";

const container = document.getElementById("root") as Element;
const root = createRoot(container);

const Hello: React.FC = () => (
  <div>
    <Button type="primary">测试</Button>
  </div>
);

root.render(<Hello />);
