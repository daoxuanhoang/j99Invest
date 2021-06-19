import React from "react";
import { Card } from "antd";
import "./styles.scss";

const BlogReviews = ({ intl, btnEach, ...props }) => {
  const { status, icon, title, price, actionName, handleOnClick = () => {}, imgClass, link = "" } = props;

  return (
    <>
      <Card
        className="card-item-reviews"
        cover={
          <div className="card-item-cover">
            {btnEach ? btnEach : <img className={`card-item-img ${imgClass}`} alt="..." src={icon} />}
          </div>
        }
      >
        <div className="card-item-title">{title}</div>
        <div className="card-item-price">{price}</div>
      </Card>
    </>
  );
};

export default BlogReviews;
