export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-10 text-xs leading-relaxed text-white/35 sm:px-8">
        <p>© {new Date().getFullYear()} Cash Practice Lab. All rights reserved.</p>
        <p className="mt-2 max-w-3xl">
          This site is not part of Facebook or Meta Platforms, Inc. Results shared are individual experiences and are not
          typical or guaranteed. Your results depend on your practice, market, and effort.
        </p>
      </div>
    </footer>
  );
}
