import React from 'react'

export default function TableComponent() {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    S. No.
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Product Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Brand
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Sub Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                    MRP
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Selling Rate
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Stock
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Weight
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Packaging Date
                    </th><th scope="col" class="px-6 py-3">
                    Expiry Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th class="px-6 py-4">
                        1
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <th class="px-6 py-4">
                        Laptop
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4">
                        $2999
                    </th>
                    <th class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>

  )
}
