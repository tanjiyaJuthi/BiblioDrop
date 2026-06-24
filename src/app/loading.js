export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(241,2,98,0.35) 0%, rgba(93,27,182,0.35) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Circle */}
        <div className="relative mb-6">
          <div
            className="h-20 w-20 rounded-3xl animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, #f10262 0%, #5d1bb6 100%)",
            }}
          />

          <div className="absolute inset-0 rounded-3xl border border-white/20" />
        </div>

        {/* Text */}
        <h2 className="mb-2 text-xl font-semibold text-white">
          Loading Experience
        </h2>

        <p className="mb-6 text-sm text-white/60">
          Preparing something awesome...
        </p>

        {/* Progress Skeleton */}
        <div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite]"
            style={{
              background:
                "linear-gradient(90deg, #f10262 0%, #5d1bb6 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}