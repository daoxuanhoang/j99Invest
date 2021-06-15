import React from "react";
import { Layout } from "antd";

const PublicLayout = ({children}) => {
    return <Layout className="public-layout-container">{children}</Layout>
}
export default PublicLayout;