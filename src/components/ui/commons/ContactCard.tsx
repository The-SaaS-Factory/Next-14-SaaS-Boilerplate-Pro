"use client";
const ContactCard = ({ user }: { user: any }) => (
  <div>
    <div className="flex items-center">
      <div className="ml-4">
        <div className="font-medium  ">{user.name}</div>
        <div className="mt-1 text-gray-500">{user.address}</div>
        <div className="mt-1 text-gray-500">
          {user.state} / {user.city}
        </div>
        <div className="mt-1 text-gray-500">
          {user.email} / {user.phone}
        </div>
      </div>
    </div>
  </div>
);

export default ContactCard;
