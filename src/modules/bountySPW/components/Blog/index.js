import "./style.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Form } from "antd";
import Input from "commons/components/Input";
import ButtonMain from "commons/components/Buttons/ButtonMain";
import * as PATTERN from "commons/constants/pattern";
import { postFormBounty } from "../../redux/actions";

const FormItem = Form.Item;

const BlogPage = ({ source }) => {
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
    <div className="blog-page">
      <div className="blog-header">
        <h1>
          <FormattedMessage id="blog.title" />
        </h1>
      </div>
      <div className="blog-content">
        <ul>
          <li>
            <FormattedMessage id="blog.description.1" />
          </li>
          <li>
            + <FormattedMessage id="blog.description.2" />
          </li>
          <li>
            + <FormattedMessage id="blog.description.3" />
          </li>
          <li>
            + <FormattedMessage id="blog.description.4" />
          </li>
          <li>
            + <FormattedMessage id="blog.description.5" />
          </li>
          <li>
            <FormattedMessage id="blog.description.6" />
          </li>
          <li>
            <FormattedMessage id="blog.description.7" />
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
                      message: "Required",
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

export default injectIntl(BlogPage);
