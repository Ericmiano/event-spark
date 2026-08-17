import { useState } from "react";
import { Camera, PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MediaItem } from "@/lib/aak-data";
import { cn } from "@/lib/utils";

function isEmbedUrl(src: string) {
  return src.includes("youtube.com") || src.includes("youtu.be") || src.includes("vimeo.com");
}

function toEmbedUrl(src: string) {
  if (src.includes("youtu.be/")) {
    const id = src.split("youtu.be/")[1]?.split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (src.includes("watch?v=")) {
    const id = src.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return src;
}

/**
 * Grid of images/video for a location, with a click-to-expand lightbox.
 * Items without real media yet render as labeled placeholders instead of
 * being silently dropped, so the gap is obvious until real assets land.
 */
export function MediaGallery({ media, className }: { media: MediaItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? media[openIndex] : null;

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", className)}>
        {media.map((item, i) => (
          <li key={i}>
            {item.kind === "placeholder" ? (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 border border-dashed border-border bg-secondary/60 px-3 text-center">
                <Camera className="size-5 text-muted-foreground" />
                <span className="text-[11px] leading-tight text-muted-foreground">
                  {item.label}
                  <br />
                  Photos coming soon
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden bg-secondary"
              >
                <img
                  src={item.kind === "video" ? (item.poster ?? item.src) : item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                {item.kind === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-navy/20 transition-colors group-hover:bg-navy/35">
                    <PlayCircle className="size-9 text-background drop-shadow" />
                  </span>
                )}
              </button>
            )}
          </li>
        ))}
      </ul>

      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{active && active.kind !== "placeholder" ? active.alt : "Media"}</DialogTitle>
          {active && active.kind === "image" && (
            <img src={active.src} alt={active.alt} className="max-h-[80vh] w-full object-contain" />
          )}
          {active && active.kind === "video" && (
            isEmbedUrl(active.src) ? (
              <iframe
                src={toEmbedUrl(active.src)}
                title={active.alt}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : (
              <video
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                className="max-h-[80vh] w-full"
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
