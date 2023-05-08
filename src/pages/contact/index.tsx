import React from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="mx-auto max-w-[1140px] px-[15px]">
      <div className="mt-10 pb-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-bold">
            FOR PARTNERSHIPS AND COLLABORATION
          </h1>
          <p>Vafa Ahmadova</p>
          <p>
            <a href="mailto:partners@goalplus.az">partners@goalplus.az</a>
          </p>
          <p>
            <a href="mailto:learninglab@goalplus.az">learninglab@goalplus.az</a>
          </p>
          <p>
            <a href="tel:+994 50 315 00 12">+994 50 315 00 12</a>
          </p>
        </div>

        <h1 className="text-2xl font-bold mt-10">
          FOR SPORTS-RELATED INQUIRIES
        </h1>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-blue-800">
            Goal+ U-21 and Recreational Basketball
          </h2>
          <p>Project Manager: Nail Eyvazov</p>
          <p>Assistant Manager & Contact Person: Kamran Mammadov</p>

          <p>
            Contact Information:
            <a href="tel:+994 50 722 00 016">+994 50 722 00 016</a>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-blue-800">
            Goal+ U-21 and Recreational Beach Volleyball
          </h2>
          <p>Project Manager: Ilkin Mirzoyev</p>
          <p>Assistant Manager & Contact Person: Kamran Mammadov</p>

          <p>
            Contact Information:
            <a href="tel:+994 50 722 00 016">+994 50 722 00 016</a>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-blue-800">Goal+ U-16 Soccer</h2>
          <p>Project Manager: Javid Rashidbayli</p>
          <p>Assistant Manager: Kamran Mammadov</p>
          <p>Contact Person: Vagif Huseynov</p>

          <p>
            Contact Information:
            <a> +90 534 254 3885 (WhatsApp only)</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
