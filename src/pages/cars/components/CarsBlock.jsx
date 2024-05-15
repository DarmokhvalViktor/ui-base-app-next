import {createUseStyles} from "react-jss";
import classNames from "classnames";
import React from 'react';
import useTheme from "../../../misc/hooks/useTheme";

const getClasses = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        height: '100%',
        userSelect: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    hovered: {
        '&:hover': {
            background: theme.hover.background,
        },
    },
    hoveredLight: {
        '&:hover': {
            background: theme.hover.backgroundLight,
        },
    },
    selected: {
        background: theme.hover.selected.background,
    },
}));

function CarsBlock({
   children,
   light = false,
   onClick,
   selected = false,
}) {
    const {theme} = useTheme();
    const classes = getClasses({theme});
    return (
        <div
            className={classNames(
                classes.container,
                selected && classes.selected,
                light
                    ? !selected && classes.hoveredLight
                    : !selected && classes.hovered,
            )}
            onClick={onClick}
        >
            {children}

        </div>
    )
}

export default CarsBlock;