"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathName = usePathname();
  const items = [
    { href: "/", label: "Home" },
    { href: "/memes", label: "Templates" },
  ];

  return (
    <header className="shell sticky top-0 z-20 pt-4">
      <div className="panel flex flex-col gap-4 rounded-[2rem] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
        <div>
          <Link href="/" className="text-xl font-black tracking-[0.18em] uppercase">
            Meme Lab
          </Link>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Pick a template, drop your text, export the chaos.
          </p>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-2">
            {items.map((item) => {
              const isActive = pathName === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[var(--ink)] text-[var(--surface-strong)]"
                        : "bg-white/60 text-[var(--muted)] hover:bg-white hover:text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
