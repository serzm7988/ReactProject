import { useState } from "react";
import TaskListComponent from "./TasksListComponent";
import "./App.css";

function App() {
    console.log("rerender");
    const ChangePage = (newPage: React.ReactNode) => {
        setPage(newPage);
    };
    let [page, setPage] = useState<React.ReactNode>(
        <TaskListComponent ChangePage={ChangePage} />
    );

    return <div className="App">{page}</div>;
}

export default App;
