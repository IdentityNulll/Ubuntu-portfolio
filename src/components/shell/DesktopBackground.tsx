export function DesktopBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-shell-950" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(119,33,111,0.35),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(233,84,32,0.18),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(44,0,30,0.6),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="animate-float absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-aubergine-700/20 blur-3xl" />
      <div className="animate-float absolute -right-24 top-2/3 h-80 w-80 rounded-full bg-ubuntu-orange/10 blur-3xl [animation-delay:-3s]" />
    </div>
  )
}
