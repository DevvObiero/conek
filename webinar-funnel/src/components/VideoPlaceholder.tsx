
import { useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  caption: string;
  duration?: string;
  className?: string;
  coverImage?: string;
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
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              if (videoUrl) setPlaying(true);
            }}
            disabled={!videoUrl}
            aria-label={
              videoUrl
                ? `Play video: ${caption}`
                : `Video coming soon: ${caption}`
            }
            className="group absolute inset-0 h-full w-full cursor-pointer disabled:cursor-default"
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                  maskImage:
                    'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
                }}
                aria-hidden="true"
              />
            )}

            <div
              className={`absolute inset-0 transition-colors ${
                coverImage
                  ? 'bg-black/25 group-hover:bg-black/40'
                  : 'bg-transparent'
              }`}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="glass-strong flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-canvas sm:h-16 sm:w-16">
                  <Play
                    className="ml-0.5 h-6 w-6 fill-current"
                    aria-hidden="true"
                  />
                </span>
              </span>

              {!videoUrl && (
                <span
                  className={`text-sm ${
                    coverImage ? 'text-white/80' : 'text-ink/55'
                  }`}
                >
                  Video coming soon
                </span>
              )}
            </div>

            {duration && (
              <span
                className={`glass absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium tabular-nums ${
                  coverImage ? 'text-white/90' : 'text-ink/80'
                }`}
              >
                {duration}
              </span>
            )}
          </button>
        )}
      </div>

      <figcaption className="mt-3 text-sm text-ink/45">
        {caption}
      </figcaption>
    </figure>
  );
}
