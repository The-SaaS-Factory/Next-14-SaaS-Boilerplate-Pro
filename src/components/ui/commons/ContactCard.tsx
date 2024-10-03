"use client";
const ContactCard = ({ user }: { user: any }) => (
  <div>
    <div className="flex items-center">
      <div className="ml-4">
        <div className="font-medium  ">{user.name}</div>
        <div className="mt-1  text">{user.address}</div>
        <div className="mt-1  text">
          {user.state} / {user.city}
        </div>
        <div className="mt-1  text">
          {user.email} / {user.phone}
        </div>
      </div>
    </div>
  </div>
);

export default ContactCard;
