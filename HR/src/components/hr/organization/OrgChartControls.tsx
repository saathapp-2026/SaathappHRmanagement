import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Minimize, Crosshair } from 'lucide-react';

export function OrgChartControls({
  zoom, setZoom, isExpandedAll, setIsExpandedAll
}: {
  zoom: number, setZoom: (z: number) => void, isExpandedAll: boolean, setIsExpandedAll: (e: boolean) => void
}) {
  return (
    <div className="absolute bottom-6 right-6 bg-white p-1.5 rounded-lg border border-gray-200 shadow-lg flex gap-1 z-10">
      <button onClick={() => setIsExpandedAll(!isExpandedAll)} className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-indigo-600 transition-colors tooltip-trigger" title={isExpandedAll ? "Collapse All" : "Expand All"}>
        {isExpandedAll ? <Minimize size={18}/> : <Maximize size={18}/>}
      </button>
      <div className="w-px h-8 bg-gray-200 mx-1"></div>
      <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-indigo-600 transition-colors">
        <ZoomOut size={18}/>
      </button>
      <button onClick={() => setZoom(1)} className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-indigo-600 transition-colors font-bold text-xs w-12 text-center">
        {Math.round(zoom * 100)}%
      </button>
      <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-indigo-600 transition-colors">
        <ZoomIn size={18}/>
      </button>
      <div className="w-px h-8 bg-gray-200 mx-1"></div>
      <button onClick={() => { setZoom(1); setIsExpandedAll(true); }} className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-indigo-600 transition-colors tooltip-trigger" title="Reset View">
        <Crosshair size={18}/>
      </button>
    </div>
  );
}
