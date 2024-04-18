import { useState } from "react";

import "./App.css";

import MyProfile from "./pages/MyProfile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyProfile />
    </>
  );
}

export default App;
