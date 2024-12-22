import Image from "next/image";
export const dynamic = "force-dynamic";
const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex h-96">
      <div className="mx-auto flex flex-col space-y-3 text-center">
        <Image
          width={777}
          height={777}
          src="/assets/img/not_found.png"
          className="mx-auto h-full w-full object-cover"
          alt="Not found"
        />
        <span className="text-subtitle mx-auto">{message}</span>
      </div>
    </div>
  );
};

export default NotFound;
