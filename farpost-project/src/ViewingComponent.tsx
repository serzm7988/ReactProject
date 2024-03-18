import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import EditingComponent from "./EditingComponent";
import TasksListComponent from "./TasksListComponent";
import Task from "./TaskType";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
    task: Task;
}

const ViewingComponent: React.FC<Props> = ({ ChangePage, task }) => {
    const OpenEditing = (editingTask: Task) => {
        ChangePage(<EditingComponent task={editingTask} />);
    };
    const Back = () => {
        ChangePage(<TasksListComponent ChangePage={ChangePage} />);
    };
    const Delete = () => {
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Ресурс успешно удален");
                } else {
                    console.error("Ошибка при удалении ресурса");
                }
            })
            .catch((error) => {
                console.error(
                    "Произошла ошибка при выполнении запроса:",
                    error
                );
            });
        ChangePage(<TasksListComponent ChangePage={ChangePage} />);
    };
    return (
        <div className="App-main">
            <div className="Buttons">
                <ButtonComponent
                    handleClick={() => OpenEditing(task)}
                    buttonName="Редактировать"
                    buttonId="1"
                />
                <ButtonComponent
                    handleClick={() => Back()}
                    buttonName="Назад"
                    buttonId="2"
                />
                <ButtonComponent
                    handleClick={() => Delete()}
                    buttonName="Удалить"
                    buttonId="3"
                />
            </div>
            <div className="">
                <p>НАЗВАНИЕ ЗАДАЧИ</p>
                <p>{task.name}</p>
                <p>ДАТА СОЗДАНИЯ</p>
                <p>{new Date(task.date).toLocaleString()}</p>
                <p>ПРИОРИТЕТ</p>
                <p>{task.priority}</p>
                <p>ОТМЕТКИ</p>
                <p>{task.marks}</p>
                <p>ОПИСАНИЕ</p>
                <p>{task.description}</p>
                <p>{task.id}</p>
            </div>
        </div>
    );
};

export default ViewingComponent;
