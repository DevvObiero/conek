import { Play } from 'lucide-react';

type Props = {
  caption: string;
  duration?: string;
  className?: string;
};

/** Swap the inner markup for an <iframe> or <video> once the real video is ready. */
export default function VideoPlaceholder({ caption, duration, className = '' }: Props) {
  return (
    <figure className={className}>
      <div className="glass relative aspect-video overflow-hidden rounded-[1.75rem]">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '20px 20px',
            maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="glass-strong flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black sm:h-16 sm:w-16">
              <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
            </span>
          </span>
          <span className="text-sm text-white/55">Video coming soon</span>
        </div>
        {duration && (
          <span className="glass absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-medium tabular-nums text-white/80">
            {duration}
          </span>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-white/45">{caption}</figcaption>
    </figure>
  );
}
