import Button from "./ButtonComponent";
import Task from "./TaskType";

const EditingComponent: React.FC<{ task: Task }> = (task) => {
    const Back = () => {};
    return (
        <div className="App-main">
            <div className="Buttons">
                <Button
                    handleClick={() => Back()}
                    buttonName="Назад"
                    buttonId="2"
                />
            </div>
        </div>
    );
};

export default EditingComponent;
