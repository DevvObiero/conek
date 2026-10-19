import { Play } from 'lucide-react';

type Props = {
  /** Large text shown on the placeholder (the thumbnail text in the brief). */
  title?: string;
  /** Small grey line under the title, e.g. "[VSL VIDEO · about 7 min · with chapters]". */
  note?: string;
  /** Wistia / Vidalytics embed URL. When set, the real player replaces the placeholder. */
  embedUrl?: string;
  /** Optional cover image behind the placeholder. */
  thumbnail?: string;
  size?: 'lg' | 'sm';
  /** Lazy-load the player (use for videos below the first screen). */
  lazy?: boolean;
  className?: string;
};

export default function VideoBlock({
  title,
  note,
  embedUrl,
  thumbnail,
  size = 'lg',
  lazy = false,
  className = '',
}: Props) {
  const sm = size === 'sm';

  if (embedUrl) {
    return (
      <div className={`glass-navy relative aspect-video overflow-hidden ${sm ? 'rounded-xl' : 'rounded-2xl'} ${className}`}>
        <iframe
          src={embedUrl}
          title={title ?? 'Video'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading={lazy ? 'lazy' : 'eager'}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={`glass-navy relative flex aspect-video flex-col items-center justify-center overflow-hidden text-center ${
        sm ? 'gap-2 rounded-xl p-3' : 'gap-3 rounded-2xl p-4 sm:gap-[18px] sm:p-6'
      } ${className}`}
    >
      {thumbnail && (
        <>
          <img src={thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0F172A]/55" aria-hidden="true" />
        </>
      )}
      <span
        className={`btn-glass relative flex shrink-0 items-center justify-center rounded-full ${
          sm ? 'h-11 w-11' : 'h-14 w-14 sm:h-[84px] sm:w-[84px]'
        }`}
        aria-hidden="true"
      >
        <Play className={`ml-1 fill-current ${sm ? 'h-4 w-4' : 'h-6 w-6 sm:h-8 sm:w-8'}`} />
      </span>
      {title && (
        <p className="relative max-w-[620px] font-display text-[19px] font-extrabold leading-[1.2] text-white lg:text-[32px]">
          {title}
        </p>
      )}
      {note && <p className={`relative text-on-navy-2 ${sm ? 'text-[11px]' : 'text-xs sm:text-sm'}`}>{note}</p>}
    </div>
  );
}