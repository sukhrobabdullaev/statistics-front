import { Editor } from "@tinymce/tinymce-react";
import { plugins } from "../../constants/plugins";
import { toolbars } from "../../constants/toolbar";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../helpers";
import axios from "axios";

const API_KEY = "p2mdh6c2rib3n2knlak74u4778yb0659xt2hvdjkso2sizio";

const Revision = () => {
  const [template, setTemplate] = useState([]);
  const params = useParams();
  let token = localStorage.getItem("access_token");

  const templateId = localStorage.getItem("template_id");

  useEffect(() => {
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
        console.log(err);
      }
    }
    getData();
  }, []);

  console.log(template);
  return (
    <div className="max-w-[1200px] mx-auto mt-5">
      <h1>{template.title}</h1>
      <Editor
        apiKey={API_KEY}
        init={{
          plugins: plugins,
          toolbar: toolbars,
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue={template.body}
      />
    </div>
  );
};

export default Revision;
