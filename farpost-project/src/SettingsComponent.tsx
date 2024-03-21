import "./Settings.css";
interface Props {
    sortByNew: boolean;
    priorityFilter: string[];
    marksFilter: string[];
    ChangeSort: (changedSort: boolean) => void;
    ChangePriorityFilter: (changedPriorityFilter: string[]) => void;
    ChangeMarksFilter: (changedMarksFilter: string[]) => void;
}

const SettingsComponent: React.FC<Props> = ({
    sortByNew,
    priorityFilter,
    marksFilter,
    ChangeSort,
    ChangePriorityFilter,
    ChangeMarksFilter,
}) => {
    const ChangePriority = (option: string) => {
        if (priorityFilter.includes(option)) {
            ChangePriorityFilter(
                priorityFilter.filter((item) => item !== option)
            );
        } else {
            ChangePriorityFilter([...priorityFilter, option]);
        }
    };
    const ChangeMarks = (option: string) => {
        if (marksFilter.includes(option)) {
            ChangeMarksFilter(marksFilter.filter((item) => item !== option));
        } else {
            ChangeMarksFilter([...marksFilter, option]);
        }
    };
    return (
        <form className="Settings">
            <div className="Sorting">
                <p className="Title">СОРТИРОВКА</p>
                <p>
                    <input
                        type="radio"
                        name="Sort"
                        checked={sortByNew}
                        onChange={() => ChangeSort(true)}
                    ></input>{" "}
                    <label htmlFor="Sort">Новые</label>
                </p>
                <p>
                    <input
                        type="radio"
                        name="Sort"
                        checked={!sortByNew}
                        onChange={() => ChangeSort(false)}
                    ></input>{" "}
                    <label htmlFor="Sort">Старые</label>
                </p>
            </div>
            <div className="Filters">
                <p className="Title">ПРИОРИТЕТ</p>
                <p>
                    <input
                        type="checkbox"
                        name="Priority"
                        checked={priorityFilter.includes("low")}
                        onChange={() => ChangePriority("low")}
                    ></input>{" "}
                    <label htmlFor="Priority">Low</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Priority"
                        checked={priorityFilter.includes("normal")}
                        onChange={() => ChangePriority("normal")}
                    ></input>{" "}
                    <label htmlFor="Priority">Normal</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Priority"
                        checked={priorityFilter.includes("high")}
                        onChange={() => ChangePriority("high")}
                    ></input>{" "}
                    <label htmlFor="Priority">High</label>
                </p>
                <p className="Title">ОТМЕТКА</p>
                <p>
                    <input
                        type="checkbox"
                        name="Mark"
                        checked={marksFilter.includes("reseach")}
                        onChange={() => ChangeMarks("reseach")}
                    ></input>{" "}
                    <label htmlFor="Mark">Reseach</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Mark"
                        checked={marksFilter.includes("design")}
                        onChange={() => ChangeMarks("design")}
                    ></input>{" "}
                    <label htmlFor="Mark">Design</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Mark"
                        checked={marksFilter.includes("development")}
                        onChange={() => ChangeMarks("development")}
                    ></input>{" "}
                    <label htmlFor="Mark">Development</label>
                </p>
            </div>
        </form>
    );
};

export default SettingsComponent;
