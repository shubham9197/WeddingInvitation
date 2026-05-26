"use client";

import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { MusicToggle } from "./MusicToggle";

type Props = {
  /** Hand sweeps between English / मराठी (envelope intro only) */
  showLanguageHint?: boolean;
};

/** Top-right: language (English / मराठी) + music */
export function TopBarControls({ showLanguageHint = false }: Props) {
  const [hintVisible, setHintVisible] = useState(showLanguageHint);

  useEffect(() => {
    if (showLanguageHint) setHintVisible(true);
    else setHintVisible(false);
  }, [showLanguageHint]);

  return (
    <div className="fixed right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[95] flex items-start gap-2">
      <LanguageToggle
        showHandHint={hintVisible && showLanguageHint}
        onInteract={() => setHintVisible(false)}
      />
      <MusicToggle />
    </div>
  );
}
