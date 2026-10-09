import SudokuGrid from "./components/SudokuGrid";
import "./App.css";

export const SIZE = 9;

function App() {
  return (
    <>
      <section id="center">
        <SudokuGrid />
      </section>
    </>
  );
}

export default App;
