import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleError = (err) => {
    setLoading(false);
    setError(err);
    if (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.clientErrMsg
    ) {
      toast(err.response.data.clientErrMsg, { toastId: "error1" });
      return;
    }
    if (err && err.response && err.response.status == 401) {
      toast("Sorry, you must be signed in", { toastId: "error2" });
      navigate("/login");
      return;
    }
    toast("error", { toastId: "error2" });
  };

  const handleCustomError = (err) => {
    if (err.clientErrMsg) {
      toast(err.clientErrMsg, { toastId: "error3" });
    } else {
      toast("error", { toastId: "error4" });
    }
  };

  const fetchData = async (url, method, payload = [], isAuth = false) => {
    const header = isAuth
      ? {
          "Content-Type": "application/json",
          "x-api-key": localStorage.getItem("token"),
        }
      : { "Content-Type": "application/json" };
    setLoading(true);
    setData(null);
    setError(null);
    switch (method) {
      case "get":
        await axios[method](url, { headers: header })
          .then((res) => {
            setLoading(false);
            if (!res.data || !res.data.status) {
              handleCustomError(res.data);
            } else {
              res.data && res.data.data && setData(res.data.data);
            }
          })
          .catch((err) => {
            handleError(err);
          });
        break;
      case "post":
        await axios
          .post(url, payload, { headers: header })
          .then((res) => {
            setLoading(false);
            if (!res.data || !res.data.status) {
              handleCustomError(res.data);
            } else {
              res.data && res.data.data && setData(res.data.data);
            }
          })
          .catch((err) => {
            handleError(err);
          });
        break;
      case "put":
        break;
    }
  };
  return { data, loading, error, fetchData, setData, setLoading };
}
