import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import EditingComponent from "./EditingComponent";
import TasksListComponent from "./TasksListComponent";
import Task from "./TaskType";
import "./Viewing.css";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
    task: Task;
    id: any;
}

const ViewingComponent: React.FC<Props> = ({ ChangePage, task, id }) => {
    const OpenEditing = () => {
        ChangePage(
            <EditingComponent ChangePage={ChangePage} task={task} id={id} />
        );
    };
    const Back = () => {
        ChangePage(<TasksListComponent ChangePage={ChangePage} />);
    };
    const Delete = async () => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Ресурс успешно удален");
                    ChangePage(<TasksListComponent ChangePage={ChangePage} />);
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
    };
    return (
        <div className="App-main">
            <div className="Buttons">
                <ButtonComponent
                    handleClick={OpenEditing}
                    buttonName="Редактировать"
                    buttonId="EditButton"
                />
                <ButtonComponent
                    handleClick={() => Back()}
                    buttonName="Назад"
                    buttonId="BackButton"
                />
                <ButtonComponent
                    handleClick={() => Delete()}
                    buttonName="Удалить"
                    buttonId="DeleteButton"
                />
            </div>
            <div className="Fields">
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
            </div>
        </div>
    );
};

export default ViewingComponent;
