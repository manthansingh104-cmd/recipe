import Header from "./components/Header";
import "./App.css";
import Main from "./components/Main";
export default function App() {
  function handleMouseOver() {
    console.log("Mouse is over the image!");
  }

  return (
    <>
      <Header />
      <Main/>
    </>
  );
}