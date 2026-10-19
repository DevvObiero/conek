/**
 * Fixed monochrome backdrop. Glass needs something behind it to bend:
 * soft light pools plus a faint line grid that blurs visibly under each panel.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)',
        }}
      />
      <div className="absolute -left-40 -top-48 h-[38rem] w-[38rem] rounded-full bg-white/[0.13] blur-[130px]" />
      <div className="absolute -right-48 top-[35%] h-[34rem] w-[34rem] rounded-full bg-neutral-300/[0.09] blur-[130px]" />
      <div className="absolute -bottom-56 left-[20%] h-[30rem] w-[30rem] rounded-full bg-white/[0.07] blur-[110px]" />
    </div>
  );
}
