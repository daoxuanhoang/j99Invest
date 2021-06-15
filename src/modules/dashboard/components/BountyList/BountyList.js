import React from "react";
import { Card } from "antd";
import "./styles.scss";

const BountyList = ({ intl, btnEach, ...props }) => {
    const { icon, title, price, imgClass } = props;

    return (
        <Card className="card-bounty-item" cover={<div className="bounty-item-cover">
            {btnEach ? btnEach : <img className={`bounty-item-icon ${imgClass}`} src={icon} alt="..." />}
        </div>}>
            <div className="bounty-item-title">{title}</div>
            <div className="bounty-item-price">{price}</div>
        </Card>
    );
};
export default BountyList;