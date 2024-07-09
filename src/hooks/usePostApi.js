import { useState } from "react";
import axios from "axios";
import { BASE_URL, token } from "../../helpers";

const usePostApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postApi = async (endpoint, payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postApi, loading, error };
};

export default usePostApi;
