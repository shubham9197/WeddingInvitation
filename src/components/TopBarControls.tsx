"use client";

import { LanguageToggle } from "./LanguageToggle";
import { MusicToggle } from "./MusicToggle";

/** Top-right: language (मराठी / English) + music */
export function TopBarControls() {
  return (
    <div className="fixed right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[90] flex items-center gap-2">
      <LanguageToggle />
      <MusicToggle />
    </div>
  );
}
