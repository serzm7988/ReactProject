import Button from "./ButtonComponent";
import ViewingComponent from "./ViewingComponent";
import Task from "./TaskType";

interface Props {
    ChangePage: (newPage: React.ReactNode) => void;
    task: Task;
    id: any;
}

const EditingComponent: React.FC<Props> = ({ ChangePage, task, id }) => {
    const Back = () => {
        ChangePage(
            <ViewingComponent ChangePage={ChangePage} task={task} id={id} />
        );
    };
    const SaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message);
            } else {
                throw new Error("Ошибка при обновлении элемента");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="App-main">
            <div className="Buttons">
                <Button
                    handleClick={() => Back()}
                    buttonName="Назад"
                    buttonId="BackButton"
                />
            </div>
            <form className="EditingWindow">
                <p>НАЗВАНИЕ ЗАДАЧИ</p>
                <input type="text" value={task.name}></input>
                <p>ПРИОРИТЕТ</p>
                <select>
                    <option selected={task.priority == "low"}>low</option>
                    <option selected={task.priority == "normal"}>normal</option>
                    <option selected={task.priority == "high"}>high</option>
                </select>
                <p>ОТМЕТКИ</p>
                <select multiple size={3}>
                    <option selected={task.marks.includes("reseach")}>
                        reseach
                    </option>
                    <option selected={task.marks.includes("design")}>
                        design
                    </option>
                    <option selected={task.marks.includes("development")}>
                        development
                    </option>
                </select>
                <p>ОПИСАНИЕ</p>
                <input type="text" value={task.description}></input>
                <Button
                    handleClick={() => SaveEdit()}
                    buttonName="Сохранить"
                    buttonId="SaveButton"
                />
            </form>
        </div>
    );
};

export default EditingComponent;
