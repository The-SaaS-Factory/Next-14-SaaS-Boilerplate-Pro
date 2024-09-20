import NotFound from "@/components/layouts/errors/NotFound";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import DeleteModel from "@/components/core/DeleteModel";
import {
  traslateData,
} from "@/utils/facades/frontendFacades/parseValuesFacade";
import {
  getBadgeClass,
  getStatusName,
} from "@/utils/facades/frontendFacades/visualFacade";
import { getAllEcommerceBanners } from "@/actions/global/ecommerceSystem/bannerModule/get-all-banners";
import Image from "next/image";
import { deleteEcommerceBanner } from "@/actions/global/ecommerceSystem/bannerModule/delete-banner";

const AdminBannersList = async ({
  locale,
  query,
}: {
  locale: string;
  query: string;
}) => {
  const search = query || "";

  const { data } = await getAllEcommerceBanners({
    args: {
      search,
    },
  });

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        {data.length === 0 ? (
          <div className="flex justify-center w-full items-center h-96">
            <NotFound message="No hay banners agregados" />
          </div>
        ) : (
          <div className=" ">
            <div className="mt-8 flow-root">
              <div className=" -my-2 overflow-x-auto ">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full  divide-y divide-gray-300 text-primary">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Nombre
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Estado
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Link
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Imagen
                        </th>

                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y    divide-gray-200 bg-main text-primary">
                      {data?.map((banner: any) => (
                        <tr key={banner.id}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className=" ">
                              {traslateData(banner.name, locale)}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-5 text-sm  ">
                            <div className={getBadgeClass(banner.status)}>
                              {getStatusName(banner.status)}
                            </div>
                          </td>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className=" ">{banner.link}</div>
                          </td>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <Image
                              src={banner.image}
                              height={400}
                              width={400}
                              className="object-cover"
                              alt=""
                            />
                          </td>

                          <td className="flex space-x-3   py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href={`products/edit/${banner.id}`}
                              className="btn-icon"
                            >
                              <PencilIcon className="w-6 h-6" />
                              <span className="sr-only">,</span>
                            </Link>
                            <DeleteModel
                              modelId={banner.id}
                              deleteAction={deleteEcommerceBanner}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default AdminBannersList;
