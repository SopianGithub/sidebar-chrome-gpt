import { ThunderboltOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Popup() {

  return (
    <div id="extension-container" className="relative">
      <Button
        id="btn-toggle-assistant"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '10000',
          padding: '10px',
          borderRadius: '5px',
        }}
        type="primary"
      >
        Toggle Side Panel
        <ThunderboltOutlined />
      </Button>
    </div>
  );
}