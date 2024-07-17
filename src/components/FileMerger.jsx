import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";

import { message } from "antd";

const FileMerger = ({ pdfUrl, qrCodeUrl, setMergedPdf }) => {
  useEffect(() => {
    const mergeFiles = async () => {
      try {
        const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const qrCodeBytes = await fetch(qrCodeUrl).then((res) =>
          res.arrayBuffer()
        );

        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);
        const { width, height } = qrCodeImage.scale(1);
        firstPage.drawImage(qrCodeImage, {
          x: firstPage.getWidth() - width - 256,
          y: 70,
          width,
          height,
        });

        const mergedPdfBytes = await pdfDoc.save();
        const mergedPdfBlob = new Blob([mergedPdfBytes], {
          type: "application/pdf",
        });
        const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);
        setMergedPdf(mergedPdfUrl);
      } catch (error) {
        message.error("Serverda MEDIA xatoligi");
      }
    };

    mergeFiles();
  }, [pdfUrl, qrCodeUrl]);

  return false;
};

export default FileMerger;
