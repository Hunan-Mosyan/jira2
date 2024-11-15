import { Upload,   Progress, Image, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import {  PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const ImgUpload = ({progress, uploading, handleUpload}) => {
  const { userData: {  imgUrl, uid, firstName, lastName } } = useSelector(store => store.userProfile.authUserInfo);

  

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {uploading ? <Progress type="circle" size={80} percent={progress}/> : <PlusOutlined />}
    </button>
  );

  return (
    <div>
      {
        !imgUrl && (
          <Upload
          fileList={[
            {
              uid: uid,
              name:`${firstName}, ${lastName}`,
              status:'done',
              url: imgUrl
            }
          ]}
           customRequest={handleUpload}
                  listType="picture-card"
        >
          {uploadButton}
          </Upload>
        )
      }
  
  <Image width={100} src={imgUrl} />

    </div>
  )
};

ImgUpload.prototypes = {
  progress: PropTypes.number.isRequired,
  uploading:PropTypes.bool.isRequired,
  handleUpload:PropTypes.func,

}

export default ImgUpload;

