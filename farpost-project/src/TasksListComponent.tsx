import { useState, useEffect } from "react";
import Tasks from "./TaskComponent";
import Button from "./ButtonComponent";
import "./TaskList.css";
import EditingComponent from "./EditingComponent";
import ViewingComponent from "./ViewingComponent";
import TaskComponent from "./TaskComponent";
import Task from "./TaskType";
import SettingsComponent from "./SettingsComponent";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
}

type TaskWithId = {
    task: Task;
    id: any;
};

const TasksListComponent: React.FC<Props> = ({ ChangePage }) => {
    let [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    let [tasks, setTasks] = useState<TaskWithId[]>([]);
    let [sortByNew, setSort] = useState<boolean>(true);
    let [priorityFilter, setPriorityFilter] = useState<string[]>([
        "low",
        "normal",
        "high",
    ]);
    let [marksFilter, setMarksFilter] = useState<string[]>([
        "reseach",
        "design",
        "development",
    ]);
    const ChangeSort = (changedSort: boolean) => {
        setSort(changedSort);
    };
    const ChangePriorityFilter = (changedPriorityFilter: string[]) => {
        setPriorityFilter(changedPriorityFilter);
    };
    const ChangeMarksFilter = (changedMarksFilter: string[]) => {
        setMarksFilter(changedMarksFilter);
    };
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
                let arrayOfElements: TaskWithId[] = [];
                for (let i in data) {
                    let marks: string[] = data[i].marks;
                    if (
                        priorityFilter.includes(data[i].priority) &&
                        marks.every((element) => marksFilter.includes(element))
                    ) {
                        let element: TaskWithId = {
                            task: data[i],
                            id: data[i].id,
                        };
                        arrayOfElements.push(element);
                    }
                }
                if (sortByNew)
                    arrayOfElements.sort(
                        (e1, e2) =>
                            new Date(e2.task.date).getTime() -
                            new Date(e1.task.date).getTime()
                    );
                else
                    arrayOfElements.sort(
                        (e1, e2) =>
                            new Date(e1.task.date).getTime() -
                            new Date(e2.task.date).getTime()
                    );
                setTasks(arrayOfElements);
                console.log("Массив элементов успешно получен");
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
            description: "",
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
    });
    useEffect(() => {
        window.addEventListener("resize", () =>
            setWindowWidth(window.innerWidth)
        );
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
        <>
            {windowWidth > 320 ? (
                <SettingsComponent
                    sortByNew={sortByNew}
                    priorityFilter={priorityFilter}
                    marksFilter={marksFilter}
                    ChangeSort={ChangeSort}
                    ChangePriorityFilter={ChangePriorityFilter}
                    ChangeMarksFilter={ChangeMarksFilter}
                />
            ) : (
                ""
            )}
            <div className="TaskList">
                <div className="Buttons">
                    <Button
                        handleClick={AddTask}
                        buttonName="Добавить задачу"
                        buttonId="AddButton"
                    />
                </div>
                {windowWidth <= 320 ? (
                    <SettingsComponent
                        sortByNew={sortByNew}
                        priorityFilter={priorityFilter}
                        marksFilter={marksFilter}
                        ChangeSort={ChangeSort}
                        ChangePriorityFilter={ChangePriorityFilter}
                        ChangeMarksFilter={ChangeMarksFilter}
                    />
                ) : (
                    ""
                )}
                <div className="Tasks">
                    {tasks.map((element) => (
                        <TaskComponent
                            openViewing={OpenViewing}
                            task={element.task}
                            id={element.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TasksListComponent;
