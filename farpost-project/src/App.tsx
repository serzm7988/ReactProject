import { useState } from "react";
import TaskListComponent from "./TasksListComponent";
import Editing from "./Editing";
import "./App.css";

type Task = {
    name: string;
    date: string;
    priority: string;
    marks: string[];
    description: string;
};

function App() {
    const changePage = (newPage: React.ReactNode) => {
        setPage(newPage);
    };
    let [page, setPage] = useState<React.ReactNode>(
        <TaskListComponent changePage={changePage} />
    );

    return (
        <div className="App">
            <header className="App-header"></header>
            {page}
        </div>
    );
}

export default App;
