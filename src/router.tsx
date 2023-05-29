/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";

import Headline from "./pages/Headline";
import Login from "./pages/Login";
import News from "./pages/News";
import { NavElement } from "./types/Navbar";
import GeneralLayout from "./layout/GeneralLayout";

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withLogin: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    label: "Headline",
    element: <Headline />,
    withLogin: false,
  },
  {
    id: 1,
    path: "/news",
    label: "News",
    element: <News />,
    withLogin: false,
  },
  {
    id: 2,
    path: "/login",
    label: "Login",
    element: <Login />,
    withLogin: false,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
    };
  })
);

export const NavbarContent: NavElement[] = routerData.reduce((prev, router) => {
  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      withLogin: router.withLogin,
    },
  ];
}, [] as NavElement[]);
