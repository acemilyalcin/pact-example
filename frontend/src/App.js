import './App.css';
import AddBook from "./components/AddBook";
import ListBooks from "./components/ListBooks";
import "./asset/custom.css"

function App() {
  return (
    <div className={"wrapper"}>
      <h3>Add Book</h3>
      <AddBook />
      <h3>Books</h3>
      <ListBooks />
    </div>
  );
}

export default App;
