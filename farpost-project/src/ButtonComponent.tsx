interface ButtonProps {
    handleClick: (parametr: any) => void;
    buttonName: string;
    buttonId: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
    handleClick,
    buttonName,
    buttonId,
}) => {
    return (
        <button onClick={handleClick} id={buttonId}>
            {buttonName}
        </button>
    );
};

export default ButtonComponent;
