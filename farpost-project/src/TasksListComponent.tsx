import { useState, useEffect } from "react";
import Tasks from "./TaskComponent";
import Button from "./ButtonComponent";
import "./TaskList.css";
import EditingComponent from "./EditingComponent";
import ViewingComponent from "./ViewingComponent";
import TaskComponent from "./TaskComponent";
import Task from "./TaskType";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
}

let arr: any[] = [];

const TasksListComponent: React.FC<Props> = ({ ChangePage }) => {
    let [tasks, setTasks] = useState<Task[]>([]);
    const GetTasks = async () => {
        fetch("http://localhost:3000/tasks", {
            method: "GET",
        })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(
                        "Ошибка при получении списка элементов с бэкенда"
                    );
                }
            })
            .then((data: any[]) => {
                setTasks(data);
                arr = data.map((element: any) => element.id);
                console.log("Массив ID всех элементов:", arr);
            })
            .catch((error: Error) => {
                console.error(
                    "Произошла ошибка при выполнении запроса:",
                    error
                );
            });
    };
    const AddTask = async () => {
        let task: Task = {
            name: "",
            date: new Date().toString(),
            priority: "",
            marks: [],
            description: "...",
        };
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data added successfully:", data);
                OpenEditing(task, data.id);
            })
            .catch((error) => {
                console.error("Error adding data:", error);
            });
    };

    useEffect(() => {
        GetTasks();
    }, []);

    const OpenEditing = (editingTask: Task, id: any) => {
        ChangePage(
            <EditingComponent
                ChangePage={ChangePage}
                task={editingTask}
                id={id}
            />
        );
    };

    const OpenViewing = (viewingTask: Task, id: string) => {
        ChangePage(
            <ViewingComponent
                ChangePage={ChangePage}
                task={viewingTask}
                id={id}
            />
        );
    };

    return (
        <div className="App-main">
            <div className="Buttons">
                <Button
                    handleClick={AddTask}
                    buttonName="Добавить задачу"
                    buttonId="1"
                />
            </div>
            <div className="Settings">
                <div className="Sorting">
                    <p>Сортировка</p>
                    <p>
                        <input type="radio" name="Sort" checked></input> Новые
                    </p>
                    <p>
                        <input type="radio" name="Sort"></input> Старые
                    </p>
                </div>
                <div className="Filters">
                    <p>Приоритет</p>
                    <p>
                        <input type="checkbox" name="Priority"></input> Low
                    </p>
                    <p>
                        <input type="checkbox" name="Priority"></input> Normal
                    </p>
                    <p>
                        <input type="checkbox" name="Priority"></input> High
                    </p>
                    <p>Отметка</p>
                    <p>
                        <input type="checkbox" name="Mark>"></input> Reseach
                    </p>
                    <p>
                        <input type="checkbox" name="Mark>"></input> Design
                    </p>
                    <p>
                        <input type="checkbox" name="Mark>"></input> Development
                    </p>
                </div>
            </div>
            <div className="Tasks">
                {tasks.map((task, index) => (
                    <TaskComponent
                        openViewing={OpenViewing}
                        task={task}
                        id={arr[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default TasksListComponent;
