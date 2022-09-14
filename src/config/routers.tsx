import React from "react";

export interface RouterConfig {
  path?: string;
  redirect?: string;
  component?: any;
  models?: string[];
  children?: Array<RouterConfig>;
}

const config: Array<RouterConfig> = [];

export default config;
