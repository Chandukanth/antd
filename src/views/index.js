import React, { useState } from "react";
import { Space, Layout, message, Typography, Modal, Button, InputNumber, Upload, Image, Rate } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Sidebar from "./sidebar";

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { Dragger } = Upload;

const Photos = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [photoCount, setPhotoCount] = useState(1);
    const [fileList, setFileList] = useState([]);
    const [isDoneClicked, setIsDoneClicked] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
        if (isDoneClicked) {
            clearImageData()
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsDoneClicked(true);
        message.success('Photos rated successfully  😄!');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDoneClicked(false);
        clearImageData();
    };

    const handleLogout = () => {
        message.success('Logout successful!');
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList.map(file => ({
            ...file,
            preview: URL.createObjectURL(file.originFileObj), // Add preview URL
        })));
    };

    const clearImageData = () => {
        setFileList([]);
        setPhotoCount(1);
    };

    const props = {
        fileList,
        onChange: handleFileChange,
        beforeUpload: () => false, // Returning false prevents automatic upload
    };

    const getRandomRating = () => {
        return Math.floor(Math.random() * 5) + 1; // Generate a random rating between 1 and 5
    };

    const renderRatedPhotos = () => {
        return fileList.map(file => (
            <div key={file.uid} style={{ textAlign: 'center', margin: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image
                    src={file.preview}
                    alt={file.name}
                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
                />
                <Rate disabled value={getRandomRating()} />
            </div>
        ));
    };

    return (
        <Layout style={{ height: '100%', overflow: 'hidden' }}>
            <Sidebar onLogout={handleLogout} />
            <Layout>
                <Header style={{ backgroundColor: '#fff', padding: 10 }}>
                    <Space>
                        <Text strong>Welcome, {localStorage.getItem("user")}</Text>
                        <span role="img" aria-label="Happy Face" style={{ fontSize: 24 }}>
                            😄
                        </span>
                    </Space>
                </Header>
                <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, height: '100vh' }}>
                    <Button type="primary" onClick={showModal}>
                        {isDoneClicked ? 'Upload Another' : 'Upload Photo'}
                    </Button>
                    <Modal
                        title="Photo Count"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <p>How many photos are you confused with?</p>
                        <InputNumber
                            min={1}
                            max={5}
                            defaultValue={1}
                            onChange={(value) => setPhotoCount(value)}
                        />
                        {photoCount && (
                            <>
                                <p>Selected Photo Count: {photoCount}</p>
                                <Dragger disabled={fileList.length === photoCount ? true : false} {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Dragger>
                            </>
                        )}
                    </Modal>
                    {isDoneClicked && fileList.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {renderRatedPhotos()}
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Photos;
