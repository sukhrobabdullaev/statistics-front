import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../helpers";
import axios from "axios";
import AppLoader from "../AppLoader";

const API_KEY = "p2mdh6c2rib3n2knlak74u4778yb0659xt2hvdjkso2sizio";

const Revision = () => {
  const [template, setTemplate] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  let token = localStorage.getItem("access_token");

  const templateId = localStorage.getItem("template_id");

  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const res = await axios.get(
          `${BASE_URL}/mainletter/typeletter/${templateId}/${params?.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTemplate(res.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="max-w-[1200px] h-full mx-auto mt-5 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">{template.title}</h1>
          <Editor
            apiKey={API_KEY}
            init={{
              // height: 1300,
              // menubar: false,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            initialValue={template.body}
          />
          <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Saqlash
          </button>
        </div>
      )}
    </>
  );
};

export default Revision;
