import { useState } from "react";
import TaskListComponent from "./TasksListComponent";
import "./App.css";

function App() {
    const ChangePage = (newPage: React.ReactNode) => {
        setPage(newPage);
    };
    let [page, setPage] = useState<React.ReactNode>(
        <TaskListComponent ChangePage={ChangePage} />
    );
    console.log("rerender");
    return <div className="App">{page}</div>;
}

export default App;
