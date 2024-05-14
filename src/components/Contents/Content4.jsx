import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, token } from "../../helpers";
import AppLoader from "../AppLoader";
import { message } from "antd";

const Content4 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const res = await fetch(
          `${BASE_URL}/mainletter/typeletter/`,
          requestOptions
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setOptions(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target);

      const response = await axios.post(
        `${BASE_URL}/mainletter/template-create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (!response.ok) {
        message.error("Xatolik yuz berdi!");
      }
      message.success("Muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("Error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <div className="space-y-2">
          <label
            htmlFor="typeletter"
            className="block text-base font-medium text-gray-700"
          >
            Xat turini tanlang
          </label>
          <div className="inline-block relative w-96">
            <select
              id="typeletter"
              name="typeletter"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
              required
            >
              {options &&
                options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700"
          >
            Kompaniya
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="title"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="body"
            className="block text-base font-medium text-gray-700"
          >
            Shablon
          </label>
          <textarea
            id="body"
            name="body"
            className="appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            placeholder="template"
            required
          ></textarea>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="report_date"
            className="block text-base font-medium text-gray-700"
          >
            Sana
          </label>
          <input
            type="date"
            id="report_date"
            name="report_date"
            className="appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-gradient-to-r from-green-500 via-green-500 to-green-700 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
        >
          Yaratish
        </button>
      </form>
      {loading && <AppLoader />}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Content4;
