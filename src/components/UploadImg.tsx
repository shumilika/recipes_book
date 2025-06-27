import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { UploadOutlined } from '@ant-design/icons';
import { API_KEY } from '@/constants/constants';
import { RcFile,UploadFile} from 'antd/es/upload';
import type { UploadChangeParam } from 'antd/es/upload';

interface UploadProps{
    setUrl: (value:string)=> void;
}
  

const UploadImg:React.FC<UploadProps> = ({setUrl}) => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCustomRequest = async ({ file, onSuccess, onError }: UploadRequestOption) => {
        const formData = new FormData();
        formData.append('key', API_KEY);
        formData.append('image', file as RcFile);
    
        try {
          const response = await fetch(
            `https://api.imgbb.com/1/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
    
          const result = await response.json();
    
          if (response.ok) {
            message.success('Image uploaded successfully!');
            onSuccess?.(result);
            setUrl(result.data.url)
          } else {
            message.error(result.error.message || 'Upload failed.');
            onError?.(new Error(result.error.message || 'Upload failed.'));
          }
        } catch (error) {
          message.error('An error occurred during upload.');
          onError?.(error as Error);
        }
      };
      const handleChange = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setFileList(fileList);
      };
    

    return (
  <Upload
    customRequest={handleCustomRequest}
    listType="picture"
    fileList={fileList}
    onChange={handleChange}
    onRemove={e=>console.log(e)}
  >
    <Button type='primary' icon={<UploadOutlined />}>Upload image</Button>
  </Upload>
 
    );
}

export default UploadImg;