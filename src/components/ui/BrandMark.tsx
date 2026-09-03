/**
 * ブランドマーク。
 * Lucide の Compass をそのまま置くのではなく、
 * 面（グラデーション）＋破線リング＋方位針＋中心のドットを重ねて
 * 「このサービスのマーク」として見えるようにしている。
 * サイズは className（size-9 など）で指定する。
 */
/** className には必ずサイズ（size-9 など）を含めること。 */
export function BrandMark({ className = "size-9" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`brandmark relative grid place-items-center overflow-visible rounded-[0.78rem] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, #3a80e8 0%, #195cc7 55%, #123f8c 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.26)",
      }}
    >
      <svg viewBox="0 0 40 40" className="size-full" focusable="false">
        <circle
          cx="20"
          cy="20"
          r="12.4"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.34"
          strokeWidth="1.3"
          strokeDasharray="1.8 3.2"
          strokeLinecap="round"
        />
        <g className="brandmark__needle">
          <path d="M27 13 L18.4 17.4 L13 27 L21.6 22.6 Z" fill="#ffffff" />
          <circle cx="20" cy="20" r="2.1" fill="#123f8c" />
        </g>
      </svg>
      {/* サイズに追従するアクセントドット */}
      <span className="absolute -right-[5%] -top-[5%] size-[22%] rounded-full bg-mint ring-2 ring-canvas" />
    </span>
  );
}
