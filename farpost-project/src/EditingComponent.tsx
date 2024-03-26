import Button from "./ButtonComponent";
import ViewingComponent from "./ViewingComponent";
import Task from "./TaskType";
import { useState } from "react";
import "./Editing.css";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
    task: Task;
    id: any;
}

const EditingComponent: React.FC<Props> = ({ ChangePage, task, id }) => {
    const [name, setName] = useState<string>(task.name);
    const [priority, setPriority] = useState<string>(task.priority);
    const [marks, setMarks] = useState<string[]>(task.marks);
    const [description, setDescription] = useState<string>(task.description);
    const Back = () => {
        ChangePage(
            <ViewingComponent ChangePage={ChangePage} task={task} id={id} />
        );
    };
    const SaveEdit = async () => {
        if (name != "" && priority != "") {
            const editTask: Task = {
                name: name,
                priority: priority,
                marks: marks,
                description: description,
                date: task.date,
            };
            try {
                const response = await fetch(
                    `http://localhost:3000/tasks/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(editTask),
                    }
                );

                if (response.ok) {
                    //const responseData = await response.json();
                    console.log("Обновление элемента успешно");
                    ChangePage(
                        <ViewingComponent
                            ChangePage={ChangePage}
                            task={editTask}
                            id={id}
                        />
                    );
                } else {
                    throw new Error("Ошибка при обновлении элемента");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div className="Editing">
            <div className="Buttons">
                <Button
                    handleClick={() => Back()}
                    buttonName="Назад"
                    buttonId="BackButton"
                />
            </div>
            <div className="Fields">
                <p className="fieldName">НАЗВАНИЕ ЗАДАЧИ</p>
                <input
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <p className="fieldName">ПРИОРИТЕТ</p>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">low</option>
                    <option value="normal">normal</option>
                    <option value="high">high</option>
                </select>
                <p className="fieldName">ОТМЕТКИ</p>
                <select
                    defaultValue={marks}
                    multiple
                    size={3}
                    onChange={(e) =>
                        setMarks(
                            Array.from(
                                e.target.selectedOptions,
                                (item) => item.value
                            )
                        )
                    }
                >
                    <option value="reseach">reseach</option>
                    <option value="design">design</option>
                    <option value="development">development</option>
                </select>
                <p className="fieldName">ОПИСАНИЕ</p>
                <textarea
                    id="Description"
                    onChange={(e) => setDescription(e.target.value)}
                >
                    {description}
                </textarea>
                <Button
                    handleClick={() => SaveEdit()}
                    buttonName="Сохранить"
                    buttonId="SaveButton"
                />
            </div>
        </div>
    );
};

export default EditingComponent;
