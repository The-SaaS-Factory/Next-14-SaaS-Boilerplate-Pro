import { Casting } from "@prisma/client";

export const CastingDetails = ({ casting }: { casting: Casting }) => {
  return (
    <>
      <div className="p-2 overflow-y-scroll max-h-64">
        <h2 className="text-2xl font-bold mb-4">{casting.name}</h2>

        <div className="mb-4">
          <p>
            <strong>Ubication:</strong> {casting.ubication ?? "Not specified"}
          </p>
          <p>
            <strong>Date of Event:</strong>{" "}
            {casting.dateEvent.toLocaleDateString()}
          </p>
          <p>
            <strong>Date Limit for Applicants:</strong>{" "}
            {casting.dateLimitApplicants
              ? casting.dateLimitApplicants.toLocaleDateString()
              : "Not specified"}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {casting.paymentMethod ?? "Not specified"}
          </p>
          <p>
            <strong>Status:</strong> {casting.status}
          </p>
          <p>
            <strong>Format:</strong> {casting.format}
          </p>
        </div>

        {casting.resume && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Resume</h3>
            <p>{casting.resume}</p>
          </div>
        )}

        {casting.description && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Description</h3>
            <p>{casting.description}</p>
          </div>
        )}

        {casting.notes && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Notes</h3>
            <p>{casting.notes}</p>
          </div>
        )}

        {casting.referenceImages && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Reference Images</h3>
            <p>{casting.referenceImages}</p>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Categories</h3>
          <ul className="list-disc ml-5">
            {/*casting.categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))*/}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Roles</h3>
          <ul className="list-disc ml-5">
            {(casting as any).roles?.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        </div>

        {(casting as any).User && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">User</h3>
            <p>
              <strong>Name:</strong> {(casting as any).User.name}
            </p>
            <p>
              <strong>Email:</strong> {(casting as any).User.email}
            </p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          <p>
            <strong>Created At:</strong>{" "}
            {casting.createdAt.toLocaleDateString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {casting.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};
