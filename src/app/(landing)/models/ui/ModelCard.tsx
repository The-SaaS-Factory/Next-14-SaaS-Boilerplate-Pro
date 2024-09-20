import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
export const ModelCard = ({ model }) => {
  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
      <Image
        src={model.image}
        alt={model.name}
        width={300}
        height={400}
        className="object-cover w-full h-64"
      />
      <div className="p-4">
        <Link href={`/models/${model.slug ?? "model-test"}`}>
          <h3 className="text-lg font-semibold text-black">{model.name}</h3>
        </Link>
      </div>
    </Card>
  );
};
