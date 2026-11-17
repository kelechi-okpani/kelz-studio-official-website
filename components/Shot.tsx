import Image from "next/image";
import { shots } from "@/config/site";
export function Shot({ name, priority = false, className = "", sizes = "(max-width:1024px) 100vw, 60vw" }: { name: keyof typeof shots; priority?: boolean; className?: string; sizes?: string }) {
  const s = shots[name];
  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_90px_-30px_rgb(var(--shadow)/.45)] ${className}`}>
      {!s.bare && <div className="flex items-center gap-1.5 border-b border-line bg-surface2 px-3.5 py-2.5" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-muted/40" /><i className="h-2.5 w-2.5 rounded-full bg-muted/40" /><i className="h-2.5 w-2.5 rounded-full bg-muted/40" /></div>}
      <Image src={s.src} width={s.w} height={s.h} alt={s.alt} priority={priority} sizes={sizes} className="h-auto w-full" />
    </figure>
  );
}
