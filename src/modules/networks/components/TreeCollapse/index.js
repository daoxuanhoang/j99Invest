import React from "react";
import { Collapse } from "antd";
import { get } from "lodash";
import "./styles.scss";
import CkeckCircleIcon from "assets/images/Icon-feather-check-circle.png";

import ActivityText from "commons/components/ActivityTextShowTree";
export const PLUS = "plus";
export const SUBTRACT = "substract";
const INLINE = "inline";
const DISPLAY = "display";
const NONE = "none";

const changeStatusPlusAndSubtract = (id) => {
  let plusHook = document.getElementById(`${PLUS}-${id}`);
  let stylePlus = window.getComputedStyle(plusHook);
  let displayPlus = stylePlus.getPropertyValue(DISPLAY);

  let substractHook = document.getElementById(`${SUBTRACT}-${id}`);
  let styleTubstract = window.getComputedStyle(substractHook);
  let displaySubstract = styleTubstract.getPropertyValue(DISPLAY);

  plusHook.style.display = displayPlus === INLINE ? NONE : INLINE;
  substractHook.style.display = displaySubstract === INLINE ? NONE : INLINE;

  return;
};

const { Panel } = Collapse;

export default function TreeCollapse({ data = [], handleCollapse = () => {}, handleOpenModel = () => {}, count = 1 }) {
  return (
    <div className="collapse-children ">
      <Collapse defaultActiveKey={["1"]} className={"children"}>
        {data.map((item) => (
          <Panel
            showArrow={false}
            className={item.hasChildrent ? `activity-data` : `inactivity-data`}
            header={
              <div className="tree-item">
                <div
                  onClick={(event) => {
                    if (!item.hasChildrent) {
                      event.stopPropagation();
                      return;
                    }
                    changeStatusPlusAndSubtract(item.id);
                    handleCollapse(item.id, item.hasChildrent);
                  }}
                  className={`box-ref box-ref-${count}`}
                >
                  <span className="line-ref" />
                  <div className={item.hasChildrent ? `activity-text` : `inactivity-text`}>
                    <ActivityText id={item.id} hasChild={item.hasChildrent} />
                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenModel(item);
                      }}
                    >
                      {get(item, "full_name") || "N/A"}
                    </span>
                  </div>
                  <div className="ref-level">
                    <img alt="icon" width="25" height="25" src={CkeckCircleIcon} />
                  </div>
                </div>
                {/* <div className="sponsor">
                  <span className="label">Sponsor by: {" "}</span>
                  <span className="fullname">{` Le Phuc`}</span>
                </div> */}
              </div>
            }
            key={item.id}
          >
            {item.children.length ? (
              <TreeCollapse
                data={item.children}
                handleCollapse={handleCollapse}
                handleOpenModel={handleOpenModel}
                className={"child-loop"}
                count={count + 1}
              />
            ) : (
              <></>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
