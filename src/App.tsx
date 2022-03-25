import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Animals from "./components/Animals/Animals";
import AnimalDetails from "./components/AnimalDetails/AnimalDetails";
import NotFound from "./components/NotFound/NotFound";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Anids zoo</h1>
        <Routes>
          <Route path="/" element={<Animals />} />

          <Route path="/AnimalDetails/:id" element={<AnimalDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
