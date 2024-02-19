import React from "react";

const Task = ({ taskInfo, updateHandler, deleteHandler }) => {
  return (
    <div className="todo">
      <div>
        <h2>{taskInfo.title}</h2>
        <p>{taskInfo.description}</p>
      </div>
      <div>
        <input
          type="checkbox"
          checked={taskInfo.isCompleted}
          onChange={() => updateHandler(taskInfo._id)}
        />
        <button className="btn" onClick={() => deleteHandler(taskInfo._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
