"use client";

import { constants } from "@/lib/constants";
import { useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const FloatingWhatsAppButton = () => {
  const getCountryByIp = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    localStorage.setItem("country", data.country);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("country")) return;

      getCountryByIp().then((res) => {
        console.log(res);
      });
    }
  }, []);

  const getPhoneNumber = () => {
    if (typeof window !== "undefined") {
      const country = localStorage.getItem("country");

      switch (country) {
        case "CU":
          return "+5541999568376";
        case "BR":
          return "+5541999568376";
        default:
          return "+5541999568376";
      }
    } else {
      return constants.supportTel;
    }
  };

  return (
    <div>
      <FloatingWhatsApp
        phoneNumber={
          typeof window !== "undefined" ? getPhoneNumber() : "5541999568376"
        }
        chatMessage={"Hi there! How can I help you?"}
        statusMessage={" Usually responds in less than 1 minute"}
        accountName={constants.appName}
        avatar={"/assets/img/Saas Factory.png"}
        darkMode={false}
        allowEsc
      />
    </div>
  );
};

export default FloatingWhatsAppButton;
