import * as React from "react"
export function ConnectionStats({ platforms }) {
    
  return (
    <div className="flex items-center gap-4">
      {platforms.map((platform) => (
        <div key={platform.name} className="flex items-center gap-2">
          <div className={`rounded-lg border-2 ${platform.color} flex flex-col items-center flex-wrap start justify-start gap-3 p-5 shadow-sm hover:shadow-md transition-shadow duration-200`}>
          <span className={`text-3xl rounded-full p-3 ${platform.textBg} text-white shadow-lg`}>{platform.icon}</span>
          <span className="text-sm font-semibold text-gray-800 block">{platform.name} Accounts</span>
          <span className="text-lg font-bold text-gray-900 block">{platform.count}</span>
        </div>
        </div>
      ))}
    </div>
  )
}
export default ConnectionStats
