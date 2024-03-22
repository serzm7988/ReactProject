import { useState, useEffect } from "react";
import Task from "./TaskType";

interface Props {
    openViewing: (task: Task, id: any) => void;
    task: Task;
    id: any;
}

const TaskComponent: React.FC<Props> = ({ openViewing, task, id }) => {
    let [now, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="Task">
            <p id="Name" onClick={() => openViewing(task, id)}>
                {task.name}
            </p>
            <p>{AddDate(new Date(task.date), now)}</p>
            <p>Приоритет: {task.priority}</p>
            <p>
                Отметки:{" "}
                {task.marks.map((elem, index) =>
                    index != task.marks.length - 1 ? `${elem}, ` : `${elem}`
                )}
            </p>
        </div>
    );
};

function AddDate(date: Date, now: Date) {
    let text: string = `создано: `;
    if (date.toLocaleDateString() != now.toLocaleDateString()) {
        text +=
            new Intl.DateTimeFormat("ru-RU", {
                day: "2-digit",
                month: "long",
            }).format(date) +
            " " +
            new Intl.DateTimeFormat("en-US", {
                hour12: false,
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            }).format(date);
    } else {
        let diff: number =
            now.getHours() * 60 +
            now.getMinutes() -
            (date.getHours() * 60 + date.getMinutes());
        if (diff >= 60) {
            diff = Math.floor(diff / 60);
            let lastNum: number;
            if (Math.floor(diff / 10) != 0)
                lastNum = diff % (Math.floor(diff / 10) * 10);
            else lastNum = diff;
            if (lastNum == 1 && diff != 11) text += diff + ` час назад`;
            else if (
                [2, 3, 4].includes(lastNum) &&
                ![12, 13, 14].includes(diff)
            )
                text += diff + ` часа назад`;
            else text += diff + ` часов назад`;
        } else if (diff >= 1) {
            let lastNum: number;
            if (Math.floor(diff / 10) != 0)
                lastNum = diff % (Math.floor(diff / 10) * 10);
            else lastNum = diff;
            if (lastNum == 1 && diff != 11) text += diff + ` минуту назад`;
            else if (
                [2, 3, 4].includes(lastNum) &&
                ![12, 13, 14].includes(diff)
            )
                text += diff + ` минуты назад`;
            else text += diff + ` минут назад`;
        } else text += `только что`;
    }
    return text;
}

export default TaskComponent;
