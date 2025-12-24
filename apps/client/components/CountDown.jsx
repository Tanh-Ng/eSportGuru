import { useEffect, useState } from "react";
import React from "react";

export default function CountDown({ targetTime }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetTime) - new Date();

      if (diff <= 0) {
        setRemaining("00:00:00");
        clearInterval(timer);
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setRemaining(
        `${String(h).padStart(2, "0")}:${String(m).padStart(
          2,
          "0",
        )}:${String(s).padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return <span className="font-mono">{remaining}</span>;
}
