import React from "react";
import { Modal } from "antd";
import { injectIntl } from "react-intl";

const ModalConfirmTransaction = ({ visible, title, MyForm, setVisible, onOk }) => {
  return (
    <Modal
      className="modal-confirm"
      title={title}
      visible={visible}
      onOk={onOk}
      wrapClassName="vertical-center-modal"
      footer={null}
      onCancel={() => setVisible(false)}
    >
      {MyForm}
    </Modal>
  );
};

export default ModalConfirmTransaction;
