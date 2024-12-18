import { taskStatuses } from "../utilis/issues";

export const transformIssueData = async (data) => {
  const container = {};
  for (let i in taskStatuses) {
    container[taskStatuses[i].key] = [];
  }

  const sortedArray = data.sort((a, b) => a.taskIndex - b.taskIndex);

  for (let item of sortedArray) {
    if (container.hasOwnProperty(item.status)) {
      container[item.status].push(item);
    }
  }
  return container;
};
