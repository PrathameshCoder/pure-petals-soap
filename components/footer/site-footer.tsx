import { Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-paper-deep py-14">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <p className="display border-b border-ink/15 pb-10 text-[clamp(3rem,7vw,6.2rem)]">Pure <em>Petals</em></p>
        <div className="grid gap-10 py-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-[.65rem] font-bold uppercase tracking-[.2em] text-gold">Explore</h3>
            <div className="flex flex-col items-start gap-3 text-sm text-ink/60"><a href="#collection">The Collection</a><a href="#soap-finder">Soap Finder</a><a href="#ritual">The Ritual</a><a href="#letters">Letters</a></div>
          </div>
          <div>
            <h3 className="mb-4 text-[.65rem] font-bold uppercase tracking-[.2em] text-gold">Say hello</h3>
            <a href="mailto:purepetalsindia@gmail.com"><p className="text-sm leading-7 text-ink/60">purepetalsindia@gmail.com<br /></p></a>
          </div>
          <div>
            <h3 className="mb-4 text-[.65rem] font-bold uppercase tracking-[.2em] text-gold">Follow</h3>
            <a href="https://www.instagram.com/purepetalsindia" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-ink/60"><Instagram className="h-4 w-4" />Instagram</a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-ink/15 pt-6 text-[.65rem] font-bold uppercase tracking-[.14em] text-ink/40 md:flex-row"><p>© 2026 Pure Petals · Pure ingredients. Pure care.</p><p>Cured with patience in Pune, India</p><a href="#top">Back to top ↑</a></div>
      </div>
    </footer>
  );
}
