import React, { useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Input } from "antd";
import "./styles.scss";
import { Link } from "react-router-dom";
import Path from "assets/images/Path.png";


const Index = ({ className, title, code, setShowModalInvite = () => {}, disabled, accessCopy = true, link }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const onCopy = () => {
        if(disabled || !accessCopy) return;
        setCopySuccess(true);
    }
    return (
        <>
            <div className={`style-input ${className}`}>
                <div className="style-input-title">
                    { title && <h3 className="title">{title}</h3> }
                </div>
                <CopyToClipboard text={code} onCopy={onCopy}>
                    <div>
                        <div className="unit">
                            <div className="wrapper-input">
                                <Input
                                    readOnly
                                    suffix={<img className="icon-copy" src={Path} alt="..."/>}
                                    value={code}
                                />
                                {copySuccess && (
                                    <div className="copy-success">
                                        <FormattedMessage id="Success" />
                                    </div>
                                )}
                                {link && <Link className="link" to={link} />}
                            </div>
                        </div>
                    </div>  
                </CopyToClipboard>
            </div>
        </>
    );
}
export default injectIntl(Index);