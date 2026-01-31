type BackgroundProps = {
  layer0Src: string;
  layer1Src: string;
  visibleLayer: 0 | 1;
  isBreak?: boolean;
};

export default function Background({
  layer0Src,
  layer1Src,
  visibleLayer,
  isBreak = false,
}: BackgroundProps) {
  const isFocus = !isBreak;
  const overlayOpacity = isFocus ? 0.5 : 0.35;
  const blurPx = isFocus ? 2 : 4;
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 0 */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: visibleLayer === 0 ? 1 : 0 }}
      >
        <video
          key={layer0Src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={layer0Src} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: overlayOpacity,
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
            transition:
              'opacity 1s ease-in-out, backdrop-filter 1s ease-in-out, -webkit-backdrop-filter 1s ease-in-out',
          }}
        />
      </div>

      {/* Layer 1 */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: visibleLayer === 1 ? 1 : 0 }}
      >
        <video
          key={layer1Src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={layer1Src} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: overlayOpacity,
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
            transition:
              'opacity 1s ease-in-out, backdrop-filter 1s ease-in-out, -webkit-backdrop-filter 1s ease-in-out',
          }}
        />
      </div>

      {/* Gentle vignette — center slightly bright, edges dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(255,255,255,0.05),
            rgba(0,0,0,0.7)
          )`,
        }}
      />

      {/* Soft noise overlay (very low opacity) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* <filter id="noise-ambience">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter> */}
        <rect width="100%" height="100%" fill="white" filter="url(#noise-ambience)" />
      </svg>
    </div>
  );
}
