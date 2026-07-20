"use client";

/**
 * Defers desktop-only visual FX (custom cursor, cursor glow, scroll follower)
 * into their own lazy chunks. They are only fetched and mounted on devices
 * with a fine pointer, so phones/tablets never download this code.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CursorGlow = dynamic(() => import("./CursorGlow"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const ScrollFollower = dynamic(() => import("./ScrollFollower"), { ssr: false });

export default function DeferredFx() {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!finePointer) return null;

  return (
    <>
      <CursorGlow />
      <CustomCursor />
      <ScrollFollower />
    </>
  );
}
