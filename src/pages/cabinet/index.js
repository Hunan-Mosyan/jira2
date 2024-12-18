import { Button, Flex, Typography } from "antd";
import { useState, useEffect } from "react";
import AddIssueModal from "../../components/sheard/IssueModal/Add";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueData } from "../../state-managment/slices/issues";
import EditIssueModal from "../../components/sheard/IssueModal/Edit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LoadingWrapper from "../../components/sheard/LoadingWrapper";
import { ISSUE_OPTIONS } from "../../core/utilis/issues";
import { changeIssueColumns } from "../../state-managment/slices/issues";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { FIRESTORE_PATH_NAMES } from "../../core/utilis/constants";

import "./index.css";

const { Title, Text } = Typography;

const Cabinet = () => {
  const dispatch = useDispatch();
  const [showModal, setShwModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const { data, isLoading } = useSelector((store) => store.issues);

  useEffect(() => {
    dispatch(fetchIssueData());
  }, [dispatch]);

  const handleOpenModal = () => {
    setShwModal(true);
  };

  const handleCloseModal = () => {
    setShwModal(false);
  };

  const handleChangeTaskStatus = async (result) => {
    if (result.destination) {
      const { source, destination } = result;
      const sourceArray = [...data[source.droppableId]];
      let destinationArray = [...data[destination.droppableId]];

      if (destination.droppableId === source.droppableId) {
        const [removedItem] = sourceArray.splice(source.index, 1);
        sourceArray.splice(destination.index, 0, removedItem);
      } else {
        const [removeItem] = sourceArray.splice(source.index, 1);
        destinationArray.splice(destination.index, 0, removeItem);
      }

      try {
        dispatch(changeIssueColumns({ source, destination }));
        if (source.droppableId !== destination.droppableId) {
          for (let i = 0; i < destinationArray.length; i++) {
            const item = destinationArray[i];
            const docRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, item.taskId);

            await updateDoc(docRef, {
              status: destination.droppableId,
              taskIndex: i,
            });
          }
          for (let i = 0; i < sourceArray.length; i++) {
            const item = sourceArray[i];
            const docRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, item.taskId);

            await updateDoc(docRef, {
              taskIndex: i,
            });
          }
        } else {
          for (let item of sourceArray) {
            const docRef = doc(db, FIRESTORE_PATH_NAMES.ISSUES, item.taskId);
            await updateDoc(docRef, {
              status: destination.droppableId,
              taskIndex: sourceArray.indexOf(item),
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Create Issue
      </Button>

      <AddIssueModal isOpen={showModal} onClose={handleCloseModal} />
      {Boolean(editModalData) && (
        <EditIssueModal
          isOpen={Boolean(editModalData)}
          onClose={() => setEditModalData(null)}
          data={editModalData}
        />
      )}
      <div className="drag_context_container">
        <LoadingWrapper loading={isLoading}>
          <DragDropContext onDragEnd={handleChangeTaskStatus}>
            {Object.entries(data).map(([columnId, column]) => {
              return (
                <div className="column_container" key={columnId}>
                  <div className="column_header">
                    <Title level={5} type="secondary">
                      {columnId} ({column.length})
                    </Title>
                  </div>

                  <div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="droppable_container"
                          >
                            {column.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.taskId}
                                  draggableId={item.taskId}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className="issue_card_container"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => setEditModalData(item)}
                                      >
                                        <Flex>
                                          <Text>{item.issueName}</Text>
                                          <div>
                                            {ISSUE_OPTIONS[item.type]?.icon}
                                          </div>
                                        </Flex>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </LoadingWrapper>
      </div>
    </div>
  );
};

export default Cabinet;
