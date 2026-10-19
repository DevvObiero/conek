
import { useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  caption: string;
  duration?: string;
  className?: string;
  coverImage: string;
  videoUrl?: string;
};

export default function VideoPlaceholder({
  caption,
  duration,
  className = '',
  coverImage,
  videoUrl,
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      <div className="glass relative aspect-video overflow-hidden rounded-[1.75rem]">
        {playing && videoUrl ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoUrl}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              if (videoUrl) setPlaying(true);
            }}
            disabled={!videoUrl}
            aria-label={`Play video: ${caption}`}
            className="group absolute inset-0 h-full w-full cursor-pointer disabled:cursor-default"
          >
            <img
              src={coverImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="glass-strong flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black sm:h-16 sm:w-16">
                  <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                </span>
              </span>

              {!videoUrl && (
                <span className="text-sm text-white/80">
                  Video coming soon
                </span>
              )}
            </div>

            {duration && (
              <span className="glass absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium tabular-nums text-white/90">
                {duration}
              </span>
            )}
          </button>
        )}
      </div>

      <figcaption className="mt-3 text-sm text-white/60">
        {caption}
      </figcaption>
    </figure>
  );
}
