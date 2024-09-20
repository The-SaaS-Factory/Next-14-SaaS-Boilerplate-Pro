import { getApplications } from "@/actions/admin/castingModule/get-applications";
import { getCastingDetailsForAllUsers } from "@/actions/admin/castingModule/get-casting-details";
import { CastingApplicationForm } from "@/app/(admin)/home/(tenant)/admin/castings/ui/CastingApplicationForm";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";

export default async function CastingDetailPage({
  params,
}: {
  params: { castingSlug: number };
}) {
  const casting = await getCastingDetailsForAllUsers(
    parseInt(params.castingSlug.toString())
  );

  const applications = await getApplications();

  return (
    <div className="min-h-screen bg-gray-100 py-12 pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs text-neutral-400 text-center">
          id: {casting.publicId}
        </p>
        <h1 className="text-4xl font-bold text-center mb-2">{casting.name}</h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          {casting.ubication}
        </p>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detalles del Casting</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              <span>Ubicación: {casting.ubication}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary" />
              <span>
                Fecha Del Evento: {casting.dateEvent.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2 text-primary" />
              <span>
                Fecha Límite: {casting.dateLimitApplicants.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2 text-primary" />
              <span>Organizador: {casting.profile.name}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-primary" />
              <span>
                {casting.description || "No se ha previsto una descripción"}
              </span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-primary" />
              <span>{"No establecido"}</span>
            </div>
          </div>
        </Card>

        <CastingApplicationForm
          applications={applications}
          casting={casting}
        ></CastingApplicationForm>
      </div>
    </div>
  );
}
