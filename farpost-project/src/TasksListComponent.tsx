import { useState, useEffect } from "react";
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
    id: string;
};

const TasksListComponent: React.FC<Props> = ({ ChangePage }) => {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [1.0],
    };
    let [count, setCount] = useState<number>(1);
    let [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    let [tasks, setTasks] = useState<TaskWithId[]>([]);
    let [sortByNew, setSort] = useState<boolean>(true);
    let [priorityFilter, setPriorityFilter] = useState<string[]>([
        "low",
        "normal",
        "high",
    ]);
    let [marksFilter, setMarksFilter] = useState<string[]>([]);

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
                        "Ошибка при получении списка элементов с базы данных"
                    );
                }
            })
            .then((data: any[]) => {
                let arrayOfElements: TaskWithId[] = [];
                for (let i in data) {
                    let marks: string[] = data[i].marks;
                    if (
                        priorityFilter.includes(data[i].priority) &&
                        marksFilter.every((element) => marks.includes(element))
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

                if (15 * count >= arrayOfElements.length) {
                    setTasks(arrayOfElements);
                    setCount(-1);
                } else if (count == -1) setTasks(arrayOfElements);
                else setTasks(arrayOfElements.slice(0, 15 * count));
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
            name: "Новая задача",
            date: new Date().toString(),
            priority: "low",
            marks: ["reseach", "design", "development"],
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
    }, [sortByNew, priorityFilter, marksFilter, count]);

    useEffect(() => {
        window.addEventListener("resize", () =>
            setWindowWidth(window.innerWidth)
        );
    }, []);

    useEffect(() => {
        if (count != -1) {
            var target = document.getElementById("Penultimate");
            const observer = new IntersectionObserver(callback, options);
            if (target) observer.observe(target);
            return () => {
                if (target) observer.unobserve(target);
            };
        }
    }, [tasks]);

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

    const callback = function (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
    ) {
        if (entries.every((elem) => elem.isIntersecting)) {
            setCount((count) => count + 1);
        }
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
            {count}
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
                    {tasks.map((element, index) => (
                        <TaskComponent
                            openViewing={OpenViewing}
                            task={element.task}
                            id={element.id}
                            key={element.id}
                            isPenultimate={
                                index == tasks.length - 2 ? true : false
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TasksListComponent;
