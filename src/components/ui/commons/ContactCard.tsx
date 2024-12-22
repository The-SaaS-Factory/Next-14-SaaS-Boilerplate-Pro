"use client";
const ContactCard = ({ user }: { user: any }) => (
  <div>
    <div className="flex items-center">
      <div className="ml-4">
        <div className="font-medium">{user.name}</div>
        <div className="text mt-1">{user.address}</div>
        <div className="text mt-1">
          {user.state} / {user.city}
        </div>
        <div className="text mt-1">
          {user.email} / {user.phone}
        </div>
      </div>
    </div>
  </div>
);

export default ContactCard;
