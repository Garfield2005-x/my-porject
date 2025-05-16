'use client'

import React from 'react'

export default function ProductModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg max-w-6xl w-full overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* เนื้อหา Modal */}
        <section className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* สินค้า 1 */}
              <div className="max-w-sm mx-auto">
                <div className="aspect-square">
                  <img
                    src="https://pagedone.io/asset/uploads/1701157806.png"
                    alt="cream"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div className="mt-5">
                  <h6 className="text-xl font-medium text-black mb-2">Skin care cream</h6>
                  <h6 className="text-xl font-semibold text-indigo-600">$74.99</h6>
                </div>
              </div>

              {/* สินค้า 2 */}
              <div className="max-w-sm mx-auto">
                <div className="aspect-square">
                  <img
                    src="https://pagedone.io/asset/uploads/1701157826.png"
                    alt="facial"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div className="mt-5">
                  <h6 className="text-xl font-medium text-black mb-2">Men’s Facial</h6>
                  <h6 className="text-xl font-semibold text-indigo-600">$25</h6>
                </div>
              </div>

              {/* สินค้า 3 */}
              <div className="max-w-sm mx-auto relative">
                <div className="aspect-square relative">
                  <img
                    src="https://pagedone.io/asset/uploads/1701157844.png"
                    alt="serum"
                    className="w-full h-full rounded-xl object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-sm font-medium px-3 py-1 rounded-lg">
                    20% Off
                  </span>
                </div>
                <div className="mt-5">
                  <h6 className="text-xl font-medium text-black mb-2">Dark circles serum</h6>
                  <h6 className="text-xl font-semibold text-indigo-600">$199.99</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
