import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { TemplateProps } from "./types";

export const TemplateRegistry: Record<string, ComponentType<TemplateProps>> = {
  classic: dynamic(() => import("./ClassicTemplate")),
  modern: dynamic(() => import("./ModernTemplate")),
};

export const getTemplate = (id: string): ComponentType<TemplateProps> => {
  return TemplateRegistry[id] || TemplateRegistry["classic"];
};
