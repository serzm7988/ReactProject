import { useState } from "react";
import Button from "./ButtonComponent";

type Task = {
    name: string;
    date: string;
    priority: string;
    marks: string[];
    description: string;
};

const Editing: React.FC<{ task: Task }> = (task) => {
    return (
        <div className="App-main">
            <div className="Buttons"></div>
        </div>
    );
};

export default Editing;
