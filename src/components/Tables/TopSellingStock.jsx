import React from 'react'

export default function TopSellingStock() {
  return (
            <div class="relative overflow-x-auto rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="py-2 align-middle flex justify-between inline-block min-w-full">
                    <h3 class="text-sm font-medium text-white">Top Selling Stock</h3>
                    <span class="text-sm font-medium text-white">View All</span>
                </div>
                <table class="w-full mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-boxdark dark:text-gray-400">
                        <tr>
                            <th scope="col" class=" py-3">
                                Product Name
                            </th>
                            <th scope="col" class=" py-3">
                                Sold Quantity
                            </th>
                            <th scope="col" class=" py-3">
                                 Remaining Quantity	
                            </th>
                            <th scope="col" class=" py-3">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-boxdark dark:border-gray-700">
                            <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="font-medium py-4">
                                Silver
                            </td>
                            <td class="font-medium py-4">
                                Laptop
                            </td>
                            <td class="font-medium py-4">
                                $2999
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-boxdark dark:border-gray-700">
                            <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td class="font-medium py-4">
                                White
                            </td>
                            <td class="font-medium py-4">
                                Laptop PC
                            </td>
                            <td class="font-medium py-4">
                                $1999
                            </td>
                        </tr>
                        <tr class="bg-white dark:bg-boxdark">
                            <th scope="row" class=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td class="font-medium py-4">
                                Black
                            </td>
                            <td class="font-medium py-4">
                                Accessories
                            </td>
                            <td class="font-medium py-4">
                                $99
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

  )
}
