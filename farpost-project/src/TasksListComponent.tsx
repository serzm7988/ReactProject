import { useState, useEffect } from "react";
import Tasks from "./Tasks";
import Button from "./ButtonComponent";
import "./TaskList.css";
import EditingComponent from "./EditingComponent";
import ViewingComponent from "./ViewingComponent";
import Task from "./TaskType";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
}

const fetchDataFromApi = async (): Promise<Task[] | null> => {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const TasksListComponent: React.FC<Props> = ({ ChangePage }) => {
    let [tasks, setTasks] = useState<Task[]>([]);
    const AddTask = () => {
        let task: Task = {
            id: "",
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
            })
            .catch((error) => {
                console.error("Error adding data:", error);
            });
        OpenEditing(task);
    };

    const OpenEditing = (editingTask: Task) => {
        ChangePage(<EditingComponent task={editingTask} />);
    };

    const OpenViewing = (editingTask: Task) => {
        ChangePage(
            <ViewingComponent ChangePage={ChangePage} task={editingTask} />
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const apiData = await fetchDataFromApi();
            if (apiData) {
                setTasks(apiData);
            }
        };

        fetchData();
    }, []);

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
            <Tasks openViewing={OpenViewing} tasks={tasks} />
        </div>
    );
};

export default TasksListComponent;
