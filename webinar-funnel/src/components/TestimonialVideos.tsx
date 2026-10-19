import VideoBlock from './VideoBlock';

export type TestimonialVideo = {
  /** One line under the video: doctor, clinic, result. */
  caption: string;
  /** Wistia / Vidalytics embed URL. Empty = placeholder. */
  embedUrl?: string;
};

/** Add or remove a slot by adding or removing an object. Christos supplies videos and captions. */
export const TESTIMONIAL_VIDEOS: TestimonialVideo[] = [
  { caption: '[Doctor, clinic, result]' },
  { caption: '[Doctor, clinic, result]' },
  { caption: '[Doctor, clinic, result]' },
  { caption: '[Doctor, clinic, result]' },
  { caption: '[Doctor, clinic, result]' },
  { caption: '[Doctor, clinic, result]' },
];

export default function TestimonialVideos({ items = TESTIMONIAL_VIDEOS }: { items?: TestimonialVideo[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {items.map((v, i) => (
        <figure key={i} className="flex flex-col gap-2 text-left">
          <VideoBlock size="sm" embedUrl={v.embedUrl} note={v.embedUrl ? undefined : `[TESTIMONIAL VIDEO ${i + 1}]`} lazy />
          <figcaption className="text-sm font-semibold leading-snug text-ink-2">{v.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}