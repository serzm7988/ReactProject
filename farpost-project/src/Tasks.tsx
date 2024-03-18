import { useState, useEffect } from "react";
type Task = {
    name: string;
    date: string;
    priority: string;
    marks: string[];
    description: string;
};

const Tasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    let [now, setTime] = useState<Date>(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="Tasks">
            {tasks.map((task) => (
                <div className="Task">
                    <p>{task.name}</p>
                    <p>{AddDate(new Date(task.date), now)}</p>
                    <p>Приоритет: {task.priority}</p>
                    <p>Отметки: {task.marks}</p>
                </div>
            ))}
        </div>
    );
};

function AddDate(date: Date, now: Date) {
    let text: string = `создано: `;
    if (date.toLocaleDateString() != now.toLocaleDateString()) {
        text += date.toLocaleString();
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

export default Tasks;
