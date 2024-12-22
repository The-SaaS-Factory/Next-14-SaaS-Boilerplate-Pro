const TableLoaderSkeleton = ({ count }: { count: number }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className="animate-pulse">
      <div className="my-3 flex space-x-4">
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>
        <div className="h-4 w-2/4 rounded bg-gray-300"></div>
      </div>
    </div>
  ));

  return <div>{skeletons}</div>;
};

export default TableLoaderSkeleton;
