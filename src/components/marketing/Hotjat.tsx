"use client";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import { constants } from "@/lib/constants";

function HotJar() {
  useEffect(() => {
    if (window.location.hostname === "localhost") return;
    hotjar.initialize({ id: constants.hotjarId, sv: 6 });
  }, []);

  return null;
}

export default HotJar;
