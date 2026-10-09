import React from 'react'

export default function EmptyData() {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center shadow-sm transition-colors">
      <div className="mb-4 rounded-full bg-gray-100 p-3 text-gray-500">
        <svg 
          className="w-8 h-8 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        Sin información disponible
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Actualmente no hay datos en esta sección. Los nuevos elementos aparecerán aquí cuando estén creados.
      </p>
    </div>
  )
}
