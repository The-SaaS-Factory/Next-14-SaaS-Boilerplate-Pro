import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
export const CastingCard = ({ casting }) => {
  console.log(casting);
  return (
    <Card className="overflow-hidden">
      <div className="relative hover:scale-105 transition-all">
        <Image
          src={casting.referenceImages || ""}
          alt={casting.name}
          width={400}
          height={300}
          className="object-cover   w-full h-48"
        />
        <div className="absolute inset-0 bg-black/50 hover:bg-black/20 flex flex-col justify-end p-4">
          <Link href={`/castings/${casting.id}`}>
            <h3 className="text-lg font-semibold text-white">{casting.name}</h3>
          </Link>
          <p className="text-sm text-gray-200">{casting.profile?.name}</p>
          <div className="flex items-center mt-2">
            <MapPin className="w-4 h-4 mr-1 text-gray-200" />
            <span className="text-sm text-gray-200">{casting.ubication}</span>
          </div>

          {casting.roles?.length > 0 && (
            <div className="absolute top-2 right-2 gap-2">
              <div className="flex gap-2">
                {casting.roles?.map((role) => (
                  <span
                    key={`casting-role-${role.id}`}
                    className="bg-white text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {role.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
