import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Search, Star } from "lucide-react";
import Image from "next/image";
import { CastingCard } from "./castings/ui/CastingCard";
import { ModelCard } from "./models/ui/ModelCard";
import { modelsMock } from "./models/ui/modelsMock";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sección Hero con imagen de fondo */}
      <section className="relative py-44 px-4">
        <Image
          src="/assets/img/bg1.jpg"
          alt="Fondo del hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
        <div className="container mx-auto text-center relative z-20">
          <h1 className="text-5xl font-bold mb-6">
            Descubre Tu Próxima Gran Oportunidad
          </h1>
          <p className="text-xl mb-8">
            Conéctate con las mejores agencias y talentos de la industria del
            entretenimiento
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar castings o modelos"
                className="pl-10 pr-4 py-2 w-full bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Características Principales con fondo */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-black">
            Empoderando al Talento y las Agencias
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 text-black">
                Para Talentos
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Descubre emocionantes oportunidades de casting</li>
                <li>Crea un perfil profesional</li>
                <li>Aplica a castings con facilidad</li>
                <li>Haz seguimiento de tus aplicaciones</li>
              </ul>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 text-black">
                Para Agencias
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Publica y gestiona convocatorias de casting</li>
                <li>Explora perfiles de profesionales talentosos</li>
                <li>Agiliza el proceso de selección</li>
                <li>Comunícate directamente con los aplicantes</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección de Últimos Castings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Últimos Castings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "1",
                title: "Modelo para Desfile de Moda",
                agency: "Agencia Glam",
                location: "Madrid",
                image: "/assets/img/bg2.jpg",
              },
              {
                id: "1",
                title: "Actor para Comercial de TV",
                agency: "Talento en Pantalla",
                location: "Barcelona",
                image: "/assets/img/bg2.jpg",
              },
              {
                id: "1",
                title: "Artista de Doblaje",
                agency: "Maestros de la Voz",
                location: "Sevilla",
                image: "/assets/img/bg3.jpg",
              },
              {
                id: "1",
                title: "Bailarín para Videoclip",
                agency: "Crew del Ritmo",
                location: "Valencia",
                image: "/assets/img/bg4.jpg",
              },
            ].map((casting, index) => (
              <CastingCard key={index} casting={casting} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Últimos Modelos con fondo */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <h2 className="text-3xl font-bold mb-8 text-black">
            Modelos Destacados
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {modelsMock.map((model, index) => (
              <ModelCard key={index} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Características de la Plataforma con fondo */}
      <section className="relative py-32">
        <Image
          src="/assets/img/bg5.jpg"
          alt="Fondo de características de la plataforma"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            ¿Por qué elegir MonkeyCasting?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fácil de Usar",
                description:
                  "Interfaz intuitiva tanto para talentos como para agencias",
              },
              {
                title: "Proceso Optimizado",
                description:
                  "Desde la publicación hasta la aplicación, todo es fluido",
              },
              {
                title: "Plataforma Segura",
                description:
                  "Tus datos y comunicaciones están siempre protegidos",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-sm">
                <Star className="w-8 h-8 mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="py-8 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 MonkeyCasting. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
