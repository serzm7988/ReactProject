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
        <div className="Viewing">
            <div className="Buttons">
                <ButtonComponent
                    handleClick={() => Back()}
                    buttonName="Назад"
                    buttonId="BackButton"
                />
                <ButtonComponent
                    handleClick={OpenEditing}
                    buttonName="Редактировать"
                    buttonId="EditButton"
                />
                <ButtonComponent
                    handleClick={() => Delete()}
                    buttonName="Удалить"
                    buttonId="DeleteButton"
                />
            </div>
            <div className="Fields">
                <p className="fieldName">НАЗВАНИЕ ЗАДАЧИ</p>
                <p className="field">{task.name}</p>
                <p className="fieldName">ДАТА СОЗДАНИЯ</p>
                <p className="field">
                    {new Intl.DateTimeFormat("ru-RU", {
                        day: "2-digit",
                        month: "long",
                    }).format(new Date(task.date)) +
                        " " +
                        new Intl.DateTimeFormat("en-US", {
                            hour12: false,
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        }).format(new Date(task.date))}
                </p>
                <p className="fieldName">ПРИОРИТЕТ</p>
                <p className="field">{task.priority}</p>
                <p className="fieldName">ОТМЕТКИ</p>
                <p className="field">
                    {task.marks.map((elem, index) =>
                        index != task.marks.length - 1 ? `${elem}, ` : `${elem}`
                    )}
                </p>
                <p className="fieldName">ОПИСАНИЕ</p>
                <p className="field">{task.description}</p>
            </div>
        </div>
    );
};

export default ViewingComponent;
