import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

export default function PaymentSuccessPage() {
  const [pdfId, setPdfId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem("pdfId");
    if (id) {
      setPdfId(id);
    }
  }, []);

  const downloadTicket = async (id: any) => {
    try {
      const resp = await axios.get(
        `https://api.goalplus.az/api/tickets/${id}/pdf`
      );
      // create csv file from data
      const url = `https://api.goalplus.az/api/tickets/${id}/pdf`;
      const link = document.createElement("a");
      // download file
      document.body.appendChild(link);
      link.href = url;
      link.download = "goalplus.pdf";
      link.click();
    } catch (error) {
      toast.error(
        "Something went wrong while downloading ticket. Please make sure you have paid for the ticket"
      );
    }
  };

  return (
    <div className="mx-auto max-w-[1140px] flex flex-col items-center">
      <h1 className="text-4xl text-center text-green-500 mt-10">
        Payment has been successful!
      </h1>
      <p className="text-center">
        Thank you for purchasing a Goalpass! You can either download your ticket
        in a PDF form by returning to the previous page or checking you email.
        See you soon!
      </p>

      {pdfId && (
        <>
          <button
            className="w-full m-3  flex justify-center items-center gap-3 bg-[#031F57] text-white py-2 rounded-md h-[64px] text-[20px]"
            type="button"
            onClick={() => downloadTicket(pdfId)}
          >
            <FontAwesomeIcon icon={faTicket} />
            <span>Download my Goalpass / Goalpass-imi yüklə</span>
          </button>
          {/* <span className="text-yellow-500">
            *Please make payment and come back to download ticket / Ödənişi edin
            və biletinizi yükləmək üçün geri qayıdın
          </span> */}
        </>
      )}

      <Link
        href="/"
        className="text-center bg-[#1E40AF] text-white py-2 px-4 rounded-md mt-10 mx-auto"
      >
        Go to home
      </Link>
    </div>
  );
}
