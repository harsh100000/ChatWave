import { useState } from "react";

export default function Test2() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="m-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Drawer
      </button>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Enter Text</h2>

          <input
            type="text"
            placeholder="Type here..."
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
    </>
  );
}
