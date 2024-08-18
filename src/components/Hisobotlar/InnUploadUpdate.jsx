import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, token } from "../../helpers";
import AppLoader from "../AppLoader";
import AlertDialogSlide from "./Modal";
import { Editor } from "@tinymce/tinymce-react";

const API_KEY = "p2mdh6c2rib3n2knlak74u4778yb0659xt2hvdjkso2sizio";

const InnUploadUpdate = () => {
  const [letterData, setLetterData] = useState(null);
  const [bodyContent, setBodyContent] = useState(letterData?.body);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const { xat, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLetter = async () => {
      setLoading(true); // Set loading to true before starting the request
      try {
        const response = await axios.get(
          `${BASE_URL}/v4/typeletter/letter3-update/${xat}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setLetterData(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };
    fetchLetter();
  }, [xat]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${BASE_URL}/v4/typeletter/letter3-update/${xat}/`,
        {
          body: bodyContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        navigate(`/revison/${id}/inn_upload`);
        message.success("Muvaffiqaytli saqlandi.");
      }
    } catch (err) {
      message.error("Xatolik yuz berdi!");
      handleClose();
    } finally {
      setLoading(false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <AppLoader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="max-w-[1200px] h-full mx-auto mt-5 flex flex-col gap-6">
          <h1 className="text-3xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400 ">
            {letterData?.company_name}
          </h1>
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
            initialValue={letterData?.body}
            value={bodyContent}
            onEditorChange={(content, editor) => {
              setBodyContent(content);
            }}
          />

          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleClickOpen}
          >
            Saqlash
          </button>
          <AlertDialogSlide
            open={open}
            handleClose={handleClose}
            handleSave={handleSave}
          />
        </div>
      )}
    </>
  );
};

export default InnUploadUpdate;
