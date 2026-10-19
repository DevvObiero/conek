/**
 * Fixed backdrop behind every page. Soft brand-blue light pools and a faint grid
 * give the frosted glass cards something to blur. Colours come from index.css.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid) 1px, transparent 1px), linear-gradient(to bottom, var(--grid) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 20%, #000 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 20%, #000 35%, transparent 100%)',
        }}
      />
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[var(--glow-a)] blur-[120px]" />
      <div className="absolute -right-40 top-[30%] h-[32rem] w-[32rem] rounded-full bg-[var(--glow-b)] blur-[120px]" />
      <div className="absolute -bottom-48 left-[25%] h-[30rem] w-[30rem] rounded-full bg-[var(--glow-a)] blur-[110px]" />
    </div>
  );
}