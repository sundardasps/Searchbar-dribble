

export function RowCardSkeleton() {
  return (
    <div className="flex items-center gap-2 py-2 animate-pulse ">
      {/* Avatar / Icon */}
      <div className="w-8 h-8 bg-gray-200 rounded-md" />

      <div className="flex flex-col justify-between gap-1 flex-1 ">
        {/* Title */}
        <div className="w-2/4 h-2 bg-gray-200 rounded-md px-1" />
        {/* Subtitle / Status */}
        <div className="w-1/3 h-2 bg-gray-200 rounded-md px-1" />
      </div>

      
    </div>
  );
}
