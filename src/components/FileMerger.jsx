import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const FileMerger = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [mergedPdf, setMergedPdf] = useState(null);

  const handlePdfChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleQrCodeChange = (event) => {
    setQrCodeFile(event.target.files[0]);
  };

  const mergeFiles = async () => {
    if (!pdfFile || !qrCodeFile) {
      alert("Please select both PDF and QR code files.");
      return;
    }

    const pdfBytes = await pdfFile.arrayBuffer();
    const qrCodeBytes = await qrCodeFile.arrayBuffer();
    const qrCodeUrl = URL.createObjectURL(qrCodeFile);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const img = new Image();
    img.src = qrCodeUrl;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imgDataUrl = canvas.toDataURL("image/png");
      const imgBytes = await fetch(imgDataUrl).then((res) => res.arrayBuffer());

      const qrCodeImage = await pdfDoc.embedPng(imgBytes);
      const { width, height } = qrCodeImage.scale(1);
      firstPage.drawImage(qrCodeImage, {
        x: firstPage.getWidth() - width - 256,
        y: 70,
        width,
        height,
      });

      const mergedPdfBytes = await pdfDoc.save();
      const mergedPdfUrl = URL.createObjectURL(
        new Blob([mergedPdfBytes], { type: "application/pdf" })
      );
      setMergedPdf(mergedPdfUrl);
    };
  };

  return (
    <div>
      <h1>Merge PDF with QR Code</h1>
      <input type="file" accept="application/pdf" onChange={handlePdfChange} />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleQrCodeChange}
      />
      <button onClick={mergeFiles}>Merge Files</button>
      {mergedPdf && (
        <iframe
          src={mergedPdf}
          title="Merged PDF"
          width="600"
          height="800"
        ></iframe>
      )}
    </div>
  );
};

export default FileMerger;
