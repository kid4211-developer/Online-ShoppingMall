import React, { useState } from 'react';
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuillEditor from '../../../editor/QuillEditor';
const { Title } = Typography;

function CreatePage({ history }) {
    const user = useSelector((state) => state.user);
    const [Content, setContent] = useState('');
    const [Files, setFiles] = useState([]);
    const onSubmit = (e) => {
        e.preventDefault();
        setContent('');
        if (user.userData && !user.userData.isAuth) {
            return alert('Please log-in first');
        }

        const variables = {
            content: Content,
            writer: user.userData._id,
            files: Files,
        };
        axios.post('/api/blog/createPost', variables).then((response) => {
            console.log('포스트 파일업로드 목록', Files);
            if (response.data.success) {
                message.success('Post successfuly Created !');
                setTimeout(() => {
                    history.push('/blog');
                }, 2000);
            } else {
                alert('Failed create Post !');
            }
        });
    };

    const onEditorChange = (value) => {
        setContent(value);
    };

    const onFilesChange = (files) => {
        console.log(files);
    };

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2}>Editor</Title>
                </div>
                <QuillEditor
                    placeholder="Start Posting Somehing"
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                    setFiles={setFiles}
                    files={Files}
                />

                <Form onSubmit={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem' }}>
                        <Button size="large" htmlType="submit" className="" onSubmit={onSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;
