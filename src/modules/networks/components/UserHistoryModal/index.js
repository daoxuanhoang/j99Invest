/* eslint-disable */
import React, { useState, useEffect } from "react";
import { injectIntl, intl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import RightModal from "commons/components/ModalCommons/rightModal";
import UserWalletHistoryList from "modules/networks/components/UserWalletHistoryList";
import { openUserHistoryModal, getUserWalletHistoryList } from "modules/networks/redux/actions";

const KWD = "UG";
const LIMIT = 10;
const PAGE = 1;

const UserHistoryModal = (props) => {
  const [searchParams, setSearchParams] = useState({
    pageSize: LIMIT,
    pageIndex: PAGE,
    currency: KWD,
  });

  const dispatch = useDispatch();

  const { toggle, data } = useSelector((state) => state.networks.modalUserHistory);

  useEffect(() => {
    const data = {
      ...searchParams,
      pageIndex: 1,
      currency: KWD,
    };
    dispatch(getUserWalletHistoryList(data));
    setSearchParams(data);
  }, [toggle]);

  const handleClose = () => {
    dispatch(openUserHistoryModal({ data: null, value: false }));
  };
  const { innerWidth: width } = window;
  return (
    <div className="pool-list-pool">
      <RightModal
        width={width < 768 ? "75%" : "75%"}
        padding={width < 768 ? "20px 15px 20px 15px" : "20px 35px 20px 50px"}
        isShow={toggle}
        handleClose={() => {
          handleClose();
        }}
        customContainerClass={"pool-detail-modal"}
      >
        <div>
          <UserWalletHistoryList />
        </div>
      </RightModal>
    </div>
  );
};

export default injectIntl(UserHistoryModal);
