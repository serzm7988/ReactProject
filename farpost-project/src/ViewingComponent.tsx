import { useState } from "react";
import Button from "./ButtonComponent";
import Editing from "./Editing";

type Task = {
    name: string;
    date: string;
    priority: string;
    marks: string[];
    description: string;
};

interface Props {
    changePage: (newPage: React.ReactNode) => void;
    task: Task;
}

const ViewingComponent: React.FC<Props> = ({ changePage, task }) => {
    const OpenEditing = (editingTask: Task) => {
        changePage(<Editing task={editingTask} />);
    };
    return (
        <div className="App-main">
            <div className="Buttons">
                <Button
                    handleClick={OpenEditing}
                    buttonName="Добавить задачу"
                    buttonId="1"
                />
            </div>
        </div>
    );
};

export default ViewingComponent;
