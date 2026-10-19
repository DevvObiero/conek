import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme';

export default function Brand() {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/images/dlogo.png' : '/images/logo.png';

  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <img src={logoSrc} alt="" className="h-10 w-auto object-contain" />
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Conek Media</span>
    </Link>
  );
}