import { Editor } from "@tinymce/tinymce-react";
import { plugins } from "../../constants/plugins";
import { toolbars } from "../../constants/toolbar";

const API_KEY = "p2mdh6c2rib3n2knlak74u4778yb0659xt2hvdjkso2sizio";

const Revision = () => {
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
