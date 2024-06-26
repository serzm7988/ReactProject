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
        <div className="Settings">
            <div className="Sorting">
                <p className="Title">СОРТИРОВКА</p>
                <p>
                    <input
                        type="radio"
                        id="SortByNew"
                        checked={sortByNew}
                        onChange={() => ChangeSort(true)}
                    ></input>{" "}
                    <label htmlFor="SortByNew">Новые</label>
                </p>
                <p>
                    <input
                        type="radio"
                        id="SortByOld"
                        checked={!sortByNew}
                        onChange={() => ChangeSort(false)}
                    ></input>{" "}
                    <label htmlFor="SortByOld">Старые</label>
                </p>
            </div>
            <div className="Filters">
                <p className="Title">ПРИОРИТЕТ</p>
                <p>
                    <input
                        type="checkbox"
                        id="PriorityLow"
                        checked={priorityFilter.includes("low")}
                        onChange={() => ChangePriority("low")}
                    ></input>{" "}
                    <label htmlFor="PriorityLow">Low</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        id="PriorityNormal"
                        checked={priorityFilter.includes("normal")}
                        onChange={() => ChangePriority("normal")}
                    ></input>{" "}
                    <label htmlFor="PriorityNormal">Normal</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        id="PriorityHigh"
                        checked={priorityFilter.includes("high")}
                        onChange={() => ChangePriority("high")}
                    ></input>{" "}
                    <label htmlFor="PriorityHigh">High</label>
                </p>
                <p className="Title">ОТМЕТКА</p>
                <p>
                    <input
                        type="checkbox"
                        id="MarkReseach"
                        checked={marksFilter.includes("reseach")}
                        onChange={() => ChangeMarks("reseach")}
                    ></input>{" "}
                    <label htmlFor="MarkReseach">Reseach</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        id="MarkDesign"
                        checked={marksFilter.includes("design")}
                        onChange={() => ChangeMarks("design")}
                    ></input>{" "}
                    <label htmlFor="MarkDesign">Design</label>
                </p>
                <p>
                    <input
                        type="checkbox"
                        id="MarkDevelopment"
                        checked={marksFilter.includes("development")}
                        onChange={() => ChangeMarks("development")}
                    ></input>{" "}
                    <label htmlFor="MarkDevelopment">Development</label>
                </p>
            </div>
        </div>
    );
};

export default SettingsComponent;
