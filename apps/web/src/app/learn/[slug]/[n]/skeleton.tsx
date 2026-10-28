export function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-reading space-y-3 py-6" aria-busy="true">
      <div className="h-6 w-2/3 animate-shimmer rounded-pill bg-[linear-gradient(90deg,#eef2f7_25%,#e2e8f0_37%,#eef2f7_63%)] dark:bg-[linear-gradient(90deg,#16264a_25%,#1d3057_37%,#16264a_63%)]" style={{ backgroundSize: '400% 100%' }} />
      <div className="h-4 w-1/3 animate-shimmer rounded-pill bg-[linear-gradient(90deg,#eef2f7_25%,#e2e8f0_37%,#eef2f7_63%)] dark:bg-[linear-gradient(90deg,#16264a_25%,#1d3057_37%,#16264a_63%)]" style={{ backgroundSize: '400% 100%' }} />
      {[120, 80, 160, 100].map((h, i) => (
        <div key={i} className="animate-shimmer rounded-card bg-[linear-gradient(90deg,#eef2f7_25%,#e2e8f0_37%,#eef2f7_63%)] dark:bg-[linear-gradient(90deg,#16264a_25%,#1d3057_37%,#16264a_63%)]" style={{ height: h / 4, backgroundSize: '400% 100%' }} />
      ))}
    </div>
  )
}
