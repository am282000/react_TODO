import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, baseURL } from "../main";
import toast from "react-hot-toast";
import Task from "../components/Task";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const addTodoHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Add TODO
    try {
      const { data } = await axios.post(
        `${baseURL}/task/new`,
        { title, description },
        {
          withCredentials: true,
        }
      );
      setRefreshList((prev) => !prev);
      toast.success(data.msg);
      setTitle("");
      setDescription("");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      const url = `${baseURL}/task/${id}`;
      const { data } = await axios.put(url, {}, { withCredentials: true });
      setRefreshList((prev) => !prev);
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const url = `${baseURL}/task/${id}`;
      const { data } = await axios.delete(url, { withCredentials: true });
      setRefreshList((prev) => !prev);
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  useEffect(() => {
    axios
      .get(`${baseURL}/task/my-task`, { withCredentials: true })
      .then((res) => setTasks(res.data.tasks))
      .catch((e) => toast.error(e.response.data.msg));
  }, [refreshList]);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={addTodoHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              Add Task
            </button>
          </form>
        </section>
        <div className="todosContainer">
          {tasks.map((task) => (
            <Task
              key={task._id}
              taskInfo={task}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
