import Link from 'next/link';

export default function BlogLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      {/* Logo Icon */}
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-linear-to-br from-[#339577] to-[#2a7962] rounded-lg transform rotate-45"></div>
        <div className="absolute inset-1 bg-white rounded-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center text-[#339577] font-bold text-sm">
          B
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold bg-linear-to-r from-[#339577] to-[#2a7962] bg-clip-text text-transparent">
          BlogHub
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide">
          Stories & Ideas
        </span>
      </div>
    </Link>
  );
}
