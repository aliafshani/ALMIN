export const TableSkeleton = ({ request }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">نام پروژه</th>
            <th className="py-3 px-6 text-center">قیمت</th>
            <th className="py-3 px-6 text-center">تاریخ درخواست</th>
            <th className="py-3 px-6 text-center">وضعیت</th>
            {
              request === 'pending' &&
              <th className="py-3 px-6 text-center">عملیات</th>
            }
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {[...Array(10)].map((_, index) => (
            <tr key={index} className="border-b border-gray-200 animate-pulse">
              <td className="py-3 px-6 text-center">
                <div className="h-4 w-24 bg-gray-300 rounded-md mx-auto"></div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="h-4 w-20 bg-gray-300 rounded-md mx-auto"></div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="h-4 w-20 bg-gray-300 rounded-md mx-auto"></div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="h-4 w-16 bg-gray-300 rounded-md mx-auto"></div>
              </td>
              {
                request === 'pending' &&
                <td className="py-3 px-6 text-center flex justify-center space-x-2">
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded-md"></div>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};
