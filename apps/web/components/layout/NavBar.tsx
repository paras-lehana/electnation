import Link from 'next/link';
import { AshokaChakra } from '../motifs/AshokaChakra';

const links = [
  { href: '/yatra', label: 'Yatra' },
  { href: '/clinic', label: 'Forward Clinic' },
  { href: '/map', label: 'Map' },
  { href: '/play', label: 'Play' },
  { href: '/about', label: 'About' },
];

export const NavBar = () => (
  <header className="sticky top-0 z-40 border-b border-khadi-200 bg-khadi-50/85 backdrop-blur-md">
    <div className="container-yatra flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-3 font-display text-2xl font-bold">
        <span className="text-indigo-chakra">
          <AshokaChakra size={32} />
        </span>
        <span>
          Election Y<span className="text-saffron-500">atra</span>
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex" aria-label="Primary">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-700 transition hover:bg-khadi-100 hover:text-ink-900"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <select
          aria-label="Language"
          className="rounded-full border border-khadi-300 bg-white/80 px-3 py-1.5 text-sm"
          defaultValue="en"
        >
          <option value="en">EN</option>
          <option value="hi">हिं</option>
          <option value="bn">বাং</option>
          <option value="ta">தமி</option>
        </select>
      </div>
    </div>
    <div className="tricolor-divider opacity-60" />
  </header>
);
