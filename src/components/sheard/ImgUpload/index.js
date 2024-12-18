import { Upload, Progress } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ImgUpload = ({ progress, uploading, handleUpload }) => {
    const { userData: { imgUrl, uid, firstName, lastName } } = useSelector(store => store.userProfile.authUserInfo);

    const uploadButton = (
        <button style={{ border: 0, background: 'none'}} type="button">
            {uploading ? <Progress type="circle" percent={progress} size={70}/> : <PlusOutlined/>}
            <div style={{ marginTop: 8}}>Upload</div>
        </button>
    );

    return(
        <div>
            <Upload
            fileList={[{
                uid: uid,
                name: `${firstName} ${lastName}`,
                status: 'done',
                url: imgUrl
            }]}

            customRequest={handleUpload}
            listType="picture-card"
            >
                {uploadButton}
            </Upload>
        </div>
    )
};

ImgUpload.propTypes = {
    progress: PropTypes.number.isRequired,
    uploading: PropTypes.bool.isRequired,
    handleUpload: PropTypes.func.isRequired
}

export default ImgUpload;