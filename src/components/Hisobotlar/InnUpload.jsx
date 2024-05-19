import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../helpers/index";
import { useEffect } from "react";

const InnUpload = () => {
  const params = useParams();
  let template_id = localStorage.getItem("template_id");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("typeletter_id", template_id);
    formData.append("id", params.id);

    try {
      const response = await fetch(`${BASE_URL}/v2/create_inn_number/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="excel_file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default InnUpload;
