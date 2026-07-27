"use client";

import { useEffect, useState } from "react";

export function useSearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-movie-search", handleOpen);
    window.addEventListener("close-movie-search", handleClose);

    return () => {
      window.removeEventListener("open-movie-search", handleOpen);
      window.removeEventListener("close-movie-search", handleClose);
    };
  }, []);

  const openSearch = () => {
    window.dispatchEvent(new Event("open-movie-search"));
  };

  const closeSearch = () => {
    window.dispatchEvent(new Event("close-movie-search"));
  };

  return {
    isOpen,
    openSearch,
    closeSearch,
  };
}
