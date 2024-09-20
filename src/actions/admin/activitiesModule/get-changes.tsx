import _ from "lodash";

export const getChanges = (oldData: any, newData: any) => {
  const changes: any = {};

  Object.keys(newData).forEach((key) => {
    if (!_.isEqual(oldData[key], newData[key])) {
      changes[key] = { before: oldData[key], after: newData[key] };
    }
  });

  return changes;
};
