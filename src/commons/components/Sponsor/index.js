import "./styles.scss";
import React from "react";

const Index = ({ sponsor = {} }) => {
  const { first_name = "", last_name = "" } = sponsor;
  return (
    <>
      <div className="sponsor">
        <span className="label">Sponsor by: </span>
        <span className="fullname">{`${first_name} ${last_name}`}</span>
      </div>
    </>
  );
};

export default Index;
