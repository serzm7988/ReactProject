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
                <p id="Title">Сортировка</p>
                <p>
                    <input
                        type="radio"
                        name="Sort"
                        checked={sortByNew}
                        onChange={() => ChangeSort(true)}
                    ></input>{" "}
                    Новые
                </p>
                <p>
                    <input
                        type="radio"
                        name="Sort"
                        checked={!sortByNew}
                        onChange={() => ChangeSort(false)}
                    ></input>{" "}
                    Старые
                </p>
            </div>
            <div className="Filters">
                <p id="Title">Приоритет</p>
                <p>
                    <input
                        type="checkbox"
                        name="Priority"
                        checked={priorityFilter.includes("low")}
                        onChange={() => ChangePriority("low")}
                    ></input>{" "}
                    Low
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Priority"
                        checked={priorityFilter.includes("normal")}
                        onChange={() => ChangePriority("normal")}
                    ></input>{" "}
                    Normal
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Priority"
                        checked={priorityFilter.includes("high")}
                        onChange={() => ChangePriority("high")}
                    ></input>{" "}
                    High
                </p>
                <p id="Title">Отметка</p>
                <p>
                    <input
                        type="checkbox"
                        name="Mark"
                        checked={marksFilter.includes("reseach")}
                        onChange={() => ChangeMarks("reseach")}
                    ></input>{" "}
                    Reseach
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Mark"
                        checked={marksFilter.includes("design")}
                        onChange={() => ChangeMarks("design")}
                    ></input>{" "}
                    Design
                </p>
                <p>
                    <input
                        type="checkbox"
                        name="Mark"
                        checked={marksFilter.includes("development")}
                        onChange={() => ChangeMarks("development")}
                    ></input>{" "}
                    Development
                </p>
            </div>
        </form>
    );
};

export default SettingsComponent;
