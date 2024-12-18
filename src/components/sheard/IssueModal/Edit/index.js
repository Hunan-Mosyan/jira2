import { Modal, Form, notification } from "antd";
import ModalForm from "../Form";
import { db } from "../../../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utilis/constants";
import { updateDoc, doc } from "firebase/firestore";
import { fetchIssueData } from "../../../../state-managment/slices/issues";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const EditIssueModal = ({ isOpen, data, onClose }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleEditIssue = async (formData) => {
    setButtonLoading(true);
    try {
      const { taskId } = data;
      const issueDocRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
      await updateDoc(issueDocRef, formData);
      notification.success({
        message: "Issue data successfully updated",
      });
      onClose();
      dispatch(fetchIssueData());
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Modal
      title="Edit Issue"
      open={isOpen}
      width={600}
      okText="Edit Issue"
      centered
      onCancel={onClose}
      onOk={form.submit}
      confirmLoading={buttonLoading}
    >
      <ModalForm form={form} onFinish={handleEditIssue} />
    </Modal>
  );
};

export default EditIssueModal;
