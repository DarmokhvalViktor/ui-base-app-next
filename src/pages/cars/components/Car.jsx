import {createUseStyles} from "react-jss";
import useTheme from "../../../misc/hooks/useTheme";
import classNames from "classnames";
import React, {useState} from "react";

const getClasses = createUseStyles((theme) => ({
    container: {
        flex: '1 1 calc(25% - 10px)',
        maxWidth: 'calc(25% - 10px)',
        color: 'darkblue',
        boxSizing: 'border-box',
        userSelect: 'none',
        width: '25%',
        background: 'lightgray',
        borderRadius: "10px",
        border: '1px solid #ccc',
        padding: '5px',
        margin: "5px",
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            cursor: 'pointer',
            background: 'purple',
            color: 'gold'
        },
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'none',
    },
    showDeleteButton: {
        display: 'block',
    },
}));

function Car({
                 children,
                 onClick,
                 onDelete
             }) {
    const {theme} = useTheme();
    const classes = getClasses({theme});
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={classNames(
                classes.container
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
            {isHovered && (
                <button
                    className={classNames(classes.deleteButton, classes.showDeleteButton)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    )
}

export default Car;