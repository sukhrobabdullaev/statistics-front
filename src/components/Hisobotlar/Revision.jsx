import { Editor } from "@tinymce/tinymce-react";
import { plugins } from "../../constants/plugins";
import { toolbars } from "../../constants/toolbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../helpers";
import axios from "axios";

const API_KEY = "p2mdh6c2rib3n2knlak74u4778yb0659xt2hvdjkso2sizio";

const Revision = () => {
  const [template, setTemplate] = useState([]);
  const params = useParams();
  let token = localStorage.getItem("access_token");

  useEffect(() => {
    async function getData() {
      try {
        const idsResponse = await axios.get(
          `${BASE_URL}/mainletter/typeletter/`
        );
        const ids = idsResponse?.data?.results;

        const promises = ids.map((id) =>
          axios.get(
            `${BASE_URL}/mainletter/typeletter/${id?.id}/${params?.id}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        const responses = await Promise.all(promises);
        console.log(responses);
        const data = responses.map((response) => response.data);
        setTemplate(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  // console.log(template);
  return (
    <div className="max-w-[1200px] mx-auto mt-5">
      <h1>Revision</h1>
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
        initialValue="<h1 style='color:red;text-align:center'>salom</h1>"
      />
    </div>
  );
};

export default Revision;
