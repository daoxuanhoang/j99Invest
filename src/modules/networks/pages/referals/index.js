import "./styles.scss";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { cloneDeep } from "lodash";
import { listToTree } from "helpers/CommonHelper";
import { getReferal, getCountCommission, getReferalDetail, openUserHistoryModal } from "modules/networks/redux/actions";
import TreeCollapse from "../../components/TreeCollapse/index";
import Sponsor from "commons/components//Sponsor";
import { injectIntl } from "react-intl";
import UserHistoryModal from "../../components/UserHistoryModal";
import CheckCircleIcon from "assets/images/Icon-feather-check-circle.png";

export const REFERAL = "referals";

const Index = () => {
  const dispatch = useDispatch();
  const [treeDataRender, setTreeData] = useState([]);
  const [showTree, setShowTree] = useState(true);
  const userInfo = useSelector((state) => state.profile.profileData);
  const { listRef, listFetchApi } = useSelector((state) => state.networks);

  const handleCollapse = (key, isCall = false) => {
    if (listFetchApi[key] || !isCall) return;
    dispatch(
      getReferal({
        customer_id: key,
        type: REFERAL,
      })
    );
  };

  const handleCustome = (userAuth) => {
    let infoUser = {
      full_name: `${userAuth?.first_name || ""} ${userAuth?.last_name || ""}`,
      email: userAuth?.email || "",
      id: userAuth?.id || 0,
      pocket_active: userAuth?.pocket_active || 0,
    };
    handleOpenModel(infoUser);
  };

  const handleOpenModel = (item) => {
    // setDataRefItem(item);
    // setShowDetail(!showDetail);
    const { id } = item;
    const query = {
      page: 1,
      limit: 10,
      customer_id: id,
    };
    dispatch(getReferalDetail(query));
    dispatch(openUserHistoryModal({ value: true, data: item }));
  };

  // const handleCloseDetailRef = () => {
  //   setShowDetail(!showDetail);
  // };

  useEffect(() => {
    const params = {
      type: REFERAL,
      customer_id: userInfo.id,
      isRefresh: true,
    };
    dispatch(getReferal(params));
    dispatch(getCountCommission());
  }, [userInfo, dispatch]);

  useEffect(() => {
    const data = listToTree(cloneDeep(listRef));
    setTreeData(data);
  }, [listRef]);

  if (!userInfo) return <></>;
  return (
    <section className="your-refs">
      <Row gutter={30}>
        <Col span={24}>
          <div className="tree-container your-refs-tree">
            <section className="management-ref">
              <Row gutter={10}>
                <Col className="customer" sm={24} xs={24}>
                  <div className="full-name-customer">
                    <div>
                      <span onClick={() => setShowTree(!showTree)} className="icon-plus">
                        {!showTree ? "+" : "-"}
                      </span>
                      <span onClick={() => handleCustome(userInfo)}>{`${userInfo?.first_name} ${userInfo?.last_name}`}</span>
                    </div>
                    <div className="ref-level">
                      <img
                        onClick={() => setShowTree(!showTree)}
                        alt="icon"
                        width="25"
                        height="25"
                        src={CheckCircleIcon}
                      />
                    </div>
                  </div>
                  <div>{userInfo?.sponsor && <Sponsor sponsor={userInfo.sponsor} />}</div>
                </Col>
                {showTree && (
                  <Col sm={24} xs={24} className="your-refs-list">
                    <TreeCollapse data={treeDataRender} handleCollapse={handleCollapse} handleOpenModel={handleOpenModel} />
                  </Col>
                )}
              </Row>
            </section>
          </div>
        </Col>
        <UserHistoryModal />
      </Row>
    </section>
  );
};

export default injectIntl(Index);
