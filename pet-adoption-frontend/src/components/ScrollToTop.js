// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // możesz zmienić na "smooth" dla animowanego scrolla
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
