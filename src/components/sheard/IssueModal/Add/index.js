import { Modal, Form, notification } from "antd";
import { useState } from "react";
import ModalForm from "../Form";
import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../../core/utilis/constants";
import { db } from "../../../../services/firebase";
import { generateUid } from "../../../../core/helpers/generateUid";
import { useDispatch } from "react-redux";
import { fetchIssueData } from "../../../../state-managment/slices/issues";
import { taskStatuses } from "../../../../core/utilis/issues";

const AddIssueModal = ({ isOpen, onClose }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCreateIssue = (values) => {
    setButtonLoading(true);
    const taskId = generateUid();

    const taskModel = {
      taskId,
      date: new Date().toLocaleTimeString(),
      status: taskStatuses.TODO.key,
      ...values,
    };
    try {
      const issueRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, taskId);
      setDoc(issueRef, taskModel);
      onClose();
      form.resetFields();
      dispatch(fetchIssueData());
      notification.success({
        message: "Your task has been created",
      });
    } catch {
      notification.error({
        message: "Error creating task!",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Create Issue"
      open={isOpen}
      onCancel={handleClose}
      confirmLoading={buttonLoading}
      onOk={form.submit}
      okText="Create Issue"
      width={600}
      centered
    >
      <ModalForm form={form} onFinish={handleCreateIssue} />
    </Modal>
  );
};

export default AddIssueModal;
