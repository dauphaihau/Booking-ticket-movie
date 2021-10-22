import {notification} from "antd";
import {SmileOutlined} from "@ant-design/icons";

export const notifiFuntion = (message, description) => {
    notification.open({
        message: message,
        description: description,
        duration: 3.5,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    })
}