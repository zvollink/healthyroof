import { useState, useRef, useEffect } from "react";

const navLinks = [
  { label: "Roof Health Assessment", href: "/roof-health-assessment" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Roof Rejuvenation", href: "/services/roof-rejuvenation" },
      { label: "Roof Repairs", href: "/services/roof-repairs" },
      { label: "Roof Replacement", href: "/services/roof-replacement" },
      { label: "Maintenance Planning", href: "/services/maintenance-planning" },
    ],
  },
  { label: "Our Process", href: "/our-process" },
  { label: "Who We Are", href: "/about" },
  { label: "Service Area", href: "/service-area" },
];

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

function DropdownMenu({ link, currentPath }: { link: NavLink; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = currentPath.startsWith("/services");

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200 hover:text-hr-teal ${
          isActive ? "text-hr-teal" : "text-hr-text-primary"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-hr-stone py-2 z-50">
          {link.children?.map((child) => (
            <a
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-hr-stone hover:text-hr-teal ${
                currentPath === child.href ? "text-hr-teal bg-hr-stone" : "text-hr-text-primary"
              }`}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav({ currentPath = "/" }: { currentPath?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Close mobile menu on nav
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-40 bg-hr-cream/95 backdrop-blur-sm border-b border-hr-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/hr-logo-turquoise.png"
              alt="Healthy Roof house icon"
              className="h-9 w-auto"
            />
            <div className="flex xl:flex lg:hidden flex-col leading-none">
              <span className="text-lg text-hr-teal tracking-tight" style={{ fontFamily: '"futura-100", sans-serif', fontWeight: 500 }}>
                Healthy Roof
              </span>
              <span className="font-futura text-[10px] font-semibold text-hr-text-muted tracking-widest">
                Here, roofs last longer.
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.href} link={link} currentPath={currentPath} />
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-hr-teal whitespace-nowrap ${
                    currentPath === link.href
                      ? "text-hr-teal"
                      : "text-hr-text-primary"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/schedule"
              className="hidden sm:inline-flex items-center gap-2 bg-hr-teal hover:bg-hr-teal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              Schedule Assessment
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-hr-stone transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg className="w-5 h-5 text-hr-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-hr-stone bg-hr-cream">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-hr-text-primary hover:bg-hr-stone rounded-lg transition-colors"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-hr-teal/20 pl-3">
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="px-3 py-2.5 text-sm text-hr-text-secondary hover:text-hr-teal transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-hr-stone hover:text-hr-teal ${
                    currentPath === link.href ? "text-hr-teal bg-hr-stone" : "text-hr-text-primary"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}

            {/* Mobile CTA */}
            <a
              href="/schedule"
              className="mt-3 flex items-center justify-center gap-2 bg-hr-teal text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors hover:bg-hr-teal-dark"
              onClick={() => setMobileOpen(false)}
            >
              Schedule Assessment
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
