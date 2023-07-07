import { Skeleton } from '../skeleton';

export function TokenTableSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 10 }).map((_, key) => (
        <tr className="bg-gray-100 border-b font-bold" key={key}>
          <th scope="row" className="px-6 py-4">
            <Skeleton className="w-6 h-6 mr-1" />
          </th>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4 flex items-center my-4 cursor-pointer">
            <Skeleton className="w-8 h-8 mr-2" />
            <Skeleton className="text-lg mr-2 min-w-[100px]" />
            <Skeleton className="text-gray-400 ml-2 min-w-[50px]" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="text-xl" />
          </td>
          <td className="px-6 py-4 cursor-pointer">
            <Skeleton className="w-full h-4" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
