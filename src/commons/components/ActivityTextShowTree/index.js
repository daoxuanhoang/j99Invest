import { PLUS,SUBTRACT } from "modules/networks/components/TreeCollapse";
import React from "react";
import "./styles.scss";


const ActivityText = ({ hasChild = [], id }) => {
    return (
        <>
            {" "}
            <span id={`${PLUS}-${id}`} style={{ display: hasChild ? "" : "none" }} >
                +{" "}
            </span>
            <span id={`${SUBTRACT}-${id}`} style={{ display: hasChild ? "none" : "" }}>
                -{" "}
            </span>
        </>
    );
};

export default ActivityText;