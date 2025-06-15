// type ContentTypes =
//   | {
//       type: "paragraph";
//       content: string;
//     }
//   | {
//       type: "code";
//       language: "javascript" | "typescript" | "html" | "css";
//       content: string;
//     }
//   | {
//       type: "image";
//       src: string;
//       alt?: string;

import { JSX } from "react";
import { dontMixLogicInYourControllerRouterOrMiddleware } from "./posts/dont-mix-logic-in-your-controller-router-or-middleware";
import { dontPutDatabaseAccessInLogicFunctions } from "./posts/dont-put-database-access-in-logic-functions";
import { interfacesForAgilityAndTestabilityInTypescript } from "./posts/interfaces-for-agility-and-testability-in-typescript";
import { fromModularMonolithToMicroservices } from "./posts/from-modular-monolith-to-microservices";

//     };
export type BlogList = {
  [key: string]: {
    title: string;
    description: string;
    date: string;
    content: JSX.Element | string;
  };
};

export type BlogPostKey = keyof BlogList;
export type BlogPostUrl = `/blog/${BlogPostKey}`;
export type BlogPost = BlogList[BlogPostKey];
export const blogList: BlogList = {
  "dont-mix-logic-in-your-controller-router-or-middleware":
    dontMixLogicInYourControllerRouterOrMiddleware,
  "dont-put-database-access-in-logic-functions":
    dontPutDatabaseAccessInLogicFunctions,
  "interfaces-for-agility-and-testability-in-typescript":
    interfacesForAgilityAndTestabilityInTypescript,
  "from-modular-monolith-to-microservices": fromModularMonolithToMicroservices,
};
