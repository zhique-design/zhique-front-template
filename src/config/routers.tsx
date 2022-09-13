import React from "react";
import Welcome from "@/pages/Welcome";

export interface RouterConfig {
  path?: string;
  redirect?: string;
  element?: React.ReactNode | null;
  children?: Array<RouterConfig>;
}

const config: Array<RouterConfig> = [
  {
    path: "/",
    element: <Welcome />,
  },
];

export default config;
