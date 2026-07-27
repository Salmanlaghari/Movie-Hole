"use client";

import { useState, useEffect } from "react";

const SETTINGS_DRAWER_EVENT = "movie-hole-settings-drawer-toggle";

let drawerState = false;

export function useSettingsDrawer() {
  const [isOpen, setIsOpen] = useState(drawerState);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(drawerState);
    };

    window.addEventListener(SETTINGS_DRAWER_EVENT, handleToggle);
    return () => {
      window.removeEventListener(SETTINGS_DRAWER_EVENT, handleToggle);
    };
  }, []);

  const openDrawer = () => {
    drawerState = true;
    window.dispatchEvent(new Event(SETTINGS_DRAWER_EVENT));
  };

  const closeDrawer = () => {
    drawerState = false;
    window.dispatchEvent(new Event(SETTINGS_DRAWER_EVENT));
  };

  const toggleDrawer = () => {
    drawerState = !drawerState;
    window.dispatchEvent(new Event(SETTINGS_DRAWER_EVENT));
  };

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
