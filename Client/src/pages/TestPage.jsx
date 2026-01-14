import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-end pr-6 pt-6">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Actions
            <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg">
              <ul className="py-1 text-sm text-gray-700">
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => setModalOpen(true)}>
                  Profile
                </li>
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">Terms of Service</h3>

              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p>
                With less than a month to go before the European Union enacts new
                consumer privacy laws...
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t pt-3">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                I accept
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="border px-4 py-2 rounded-md"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


