import { useEffect, useState } from "react";

function parts(target: number, now: number) {
  const diff = Math.max(0, target - now);
  const s = Math.floor(diff / 1000);
  return [
    { label: "Days", value: Math.floor(s / 86400) },
    { label: "Hours", value: Math.floor((s % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((s % 3600) / 60) },
    { label: "Seconds", value: s % 60 },
  ];
}

export function Countdown({ startISO }: { startISO: string }) {
  const target = new Date(startISO).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = parts(target, now ?? target);

  return (
    <dl className="grid grid-cols-4 divide-x divide-border border-y border-border">
      {items.map((item) => (
        <div key={item.label} className="px-2 py-5 text-center">
          <dd className="overflow-hidden">
            <span
              key={item.value}
              className="digit-roll block font-display text-2xl font-semibold tabular-nums text-white sm:text-3xl"
            >
              {now === null ? "—" : String(item.value).padStart(2, "0")}
            </span>
          </dd>
          <dt className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
