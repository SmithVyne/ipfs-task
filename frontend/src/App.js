import React, { useState } from "react";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Input } from "antd";
import styled from "styled-components";
import "./utils/web3Modal";
import Header from "./components/Header";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 50px;
  background-color: rgb(50 54 57);
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
`;

const ROUTES = {
  ipfs: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/ipfs",
};

const props = {
  name: "file uploaded",
  action: ROUTES.ipfs,
  headers: {},
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      message.success(`IPFS Hash: ${info.file.response.ipfsHash}`, 10000);
    } else if (info.file.response?.error) {
      message.error(`${info.file.name} file upload failed.`);
      message.error(`${info.file.response.error.message}`);
    }
  },
};

const App = () => {
  const [cid, setcid] = useState("");

  return (
    <Wrapper>
      <Header />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload a file to IPFS</Button>
      </Upload>
      <div>
        <Input
          placeholder="Enter IPFS CID to download"
          onChange={(e) => setcid(e.target.value)}
        />
        <Button href={`${ROUTES.ipfs}/${cid}`} icon={<DownloadOutlined />}>
          Download File from IPFS
        </Button>
      </div>
    </Wrapper>
  );
};
export default App;
