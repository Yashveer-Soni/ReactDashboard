import { utils, writeFile } from 'xlsx';
import { toast } from 'react-toastify';

const exportToExcel = (products, setIsExporting, setProgress) => {
    setIsExporting(true);
    setProgress(0);

    // Simulate progress for demonstration purposes
    const progressInterval = setInterval(() => {
        setProgress((prev) => {
            const next = prev + 10;
            if (next >= 100) {
                clearInterval(progressInterval);
            }
            return next;
        });
    }, 100);

    setTimeout(() => {
        const tableData = products.map((product, index) => ({
            'S. No.': index + 1,
            'Product Name': product.item.item_name,
            'Brand': product.item.brand.brand_name,
            'Category': product.item.sub_category.category.category_name,
            'Sub Category': product.item.sub_category.sub_category_name,
            'MRP': product.mrp,
            'Selling Rate': product.purchase_rate,
            'Stock': product.unit.quantity,
            'Weight': product.unit.weight,
            'Packaging Date': product.pkt_date || 'N/A',
            'Expiry Date': product.expired_date || 'N/A',
        }));

        const worksheet = utils.json_to_sheet(tableData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Products');
        writeFile(workbook, 'products_data.xlsx');

        setIsExporting(false);
        toast.success('Excel file downloaded successfully!');
    }, 1000); // Delay for demo; adjust as needed
};

export default exportToExcel;
