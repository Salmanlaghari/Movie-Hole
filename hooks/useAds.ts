"use client";

import { useState, useEffect } from "react";

const ADS_SYNC_EVENT = "movie-hole-ads-sync";

export function useAds() {
  const [adsRemoved, setAdsRemoved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAdsState = () => {
      try {
        const stored = localStorage.getItem("movie-hole-remove-ads");
        setAdsRemoved(stored === "true");
      } catch (e) {
        console.error(e);
      }
    };

    loadAdsState();

    window.addEventListener(ADS_SYNC_EVENT, loadAdsState);
    return () => {
      window.removeEventListener(ADS_SYNC_EVENT, loadAdsState);
    };
  }, []);

  const setAdsRemovedState = (val: boolean) => {
    setAdsRemoved(val);
    try {
      localStorage.setItem("movie-hole-remove-ads", String(val));
      window.dispatchEvent(new Event(ADS_SYNC_EVENT));
    } catch (e) {
      console.error(e);
    }
  };

  // Interstitial ad frequency controller (1 ad per 5 minutes)
  const shouldShowInterstitial = (): boolean => {
    if (adsRemoved) return false;
    try {
      const lastAd = localStorage.getItem("movie-hole-last-interstitial");
      if (!lastAd) return true;

      const elapsed = Date.now() - Number(lastAd);
      return elapsed > 5 * 60 * 1000; // 5 minutes
    } catch (e) {
      return true;
    }
  };

  const recordInterstitialShown = () => {
    try {
      localStorage.setItem("movie-hole-last-interstitial", String(Date.now()));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    adsRemoved,
    setAdsRemovedState,
    shouldShowInterstitial,
    recordInterstitialShown,
  };
}
