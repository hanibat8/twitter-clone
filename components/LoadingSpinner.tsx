import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="grid justify-center items-center h-[350px]">
      <div className="w-10 h-10 border-8 border-blue-500 border-t-blue-300 rounded-full animate-spin">
      </div>
    </div>
  )
}
