'use client';

import { useState } from 'react';

/**
 * Error Test Component
 * Use this component to test the Error Boundary
 * REMOVE THIS FILE IN PRODUCTION
 */
export default function ErrorTest() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Intentionally throw an error to test error boundary
    throw new Error('This is a test error! The Error Boundary should catch this.');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 shadow-lg">
        <p className="text-red-400 text-sm mb-2 font-semibold">
          🧪 Error Boundary Test
        </p>
        <p className="text-gray-400 text-xs mb-3">
          Click to test error handling
        </p>
        <button
          onClick={() => setShouldThrow(true)}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded transition-colors"
        >
          Trigger Error
        </button>
        <p className="text-gray-500 text-xs mt-2">
          ⚠️ Remove in production
        </p>
      </div>
    </div>
  );
}
