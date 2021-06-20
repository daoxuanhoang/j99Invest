import React from "react";
import { useDispatch } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Form } from "antd";

import "./style.scss";
import Input from "commons/components/Input";
import TextArea from "commons/components/TextArea";
import ButtonMain from "commons/components/Buttons/ButtonMain";
import * as PATTERN from "commons/constants/pattern";
import { postFormBounty } from "../../redux/actions";

const FormItem = Form.Item;

const Webinar = ({ intl, source }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = () => {
    form.validateFields().then((values) => {
      if (source?.id !== undefined) {
        dispatch(
          postFormBounty(
            {
              ...values,
              bounty_id: source.id,
            },
            () => {
              form.resetFields();
            }
          )
        );
      }
    });
  };

  return (
    <div className="webinar-page">
      <div className="header mb-20">
        <div className="d-flex align-center">
          <h1>
            <FormattedMessage id="webinar.title" />
          </h1>
          <p className="ml-20">
            <FormattedMessage id="webinar.bounty.content" />
          </p>
        </div>
      </div>
      <div className="content">
        <ul>
          <li>
            <FormattedMessage id="webinar.description.1" />
          </li>
          <li>
            + <FormattedMessage id="webinar.description.2" />
          </li>
          <li>
            + <FormattedMessage id="webinar.description.3" />
          </li>
          <li>
            + <FormattedMessage id="webinar.description.4" />
          </li>
        </ul>
        <Form
          form={form}
          name="normal_login"
          onFinish={onFinish}
          wrapperCol={{ xs: { span: 24 }, md: { span: 12, offset: 6 } }}
          preserve={false}
          scrollToFirstError
        >
          <FormItem
            name="link"
            rules={
              !(source?.status === 1 || source?.status === 2)
                ? [
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                    {
                      pattern: PATTERN.URL,
                      message: "Must be a link!",
                    },
                  ]
                : []
            }
          >
            <Input placeholder={"#your_link"} />
          </FormItem>
          <FormItem
            name="content"
            rules={
              !(source?.status === 1 || source?.status === 2)
                ? [
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]
                : []
            }
          >
            <TextArea rows={4} placeholder={intl.formatMessage({ id: "webinar.form.description" })} />
          </FormItem>
          <FormItem style={{ textAlign: "center" }}>
            <ButtonMain
              type="primary"
              htmlType="submit"
              style={{ width: "120px", background: source?.status === 1 || source?.status === 2 ? "rgb(183, 183, 183)" : "" }}
              disabled={source?.status === 1 || source?.status === 2}
            >
              {source?.status === 1 || source?.status === 2 ? (
                <FormattedMessage id="Submitted" />
              ) : (
                <FormattedMessage id="Submit" />
              )}
            </ButtonMain>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default injectIntl(Webinar);
