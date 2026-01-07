import { Provider } from "jotai";
import { RouterProvider } from "react-router-dom";

import "@/translations";

import { router } from "@/router";

import "./App.scss";

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
