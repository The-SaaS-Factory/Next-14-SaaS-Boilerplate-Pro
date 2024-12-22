import Link from "next/link";

function UpgradeteButton() {
  return (
    <div>
      <Link
        href="/home/upgrade"
        className="rounded-2xl bg-blue-500 px-2 py-1 font-medium text-white shadow-lg shadow-blue-500/50 hover:scale-105"
      >
        <span>¡Plan Agencia!</span>
      </Link>
    </div>
  );
}

export default UpgradeteButton;
