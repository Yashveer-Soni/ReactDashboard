import React from 'react'

export default function LowQuantityStock() {
  return (
    <div class="relative overflow-x-auto rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="py-2 align-middle flex justify-between inline-block min-w-full">
                    <h3 class="text-sm font-medium text-white">Low Quantity Stock</h3>
                    <span class="text-sm font-medium text-white">View All</span>
                </div>
                <table class="w-full mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-boxdark dark:text-gray-400">
                        <tr>
                            <th scope="col" class=" py-3">Product Image</th>
                            <th scope="col" class=" py-3">Product Name</th>
                            <th scope="col" class=" py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-boxdark dark:border-gray-700">
                            <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img src="https://via.placeholder.com/50x50" class="w-8 h-8 rounded-full" alt="Avatar" />
                            </th>
                            <td class="font-medium py-4">
                            Tata Salt
                            Remaining Quantity : 10 Packet
                            </td>
                            <td class=" py-4">
                                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Low</span>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-boxdark dark:border-gray-700">
                            <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img src="https://via.placeholder.com/50x50" class="w-8 h-8 rounded-full" alt="Avatar" />
                            </th>
                            <td class="font-medium py-4">
                            Tata Salt
                            Remaining Quantity : 10 Packet
                            </td>
                            <td class="  py-4">
                                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Low</span>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-boxdark dark:border-gray-700">
                            <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img src="https://via.placeholder.com/50x50" class="w-8 h-8 rounded-full" alt="Avatar" />
                            </th>
                            <td class="font-medium py-4">
                            Tata Salt
                            Remaining Quantity : 10 Packet
                            </td>
                            <td class=" py-4">
                                <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Low</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
  )
}
