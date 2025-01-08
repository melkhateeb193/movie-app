import Image from "next/image";

export default function TopNav() {
  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 mt-6">
      <div className="mb-3 sm:mb-0">
        <h1 className="text-2xl sm:text-3xl font-semibold">Watch Today</h1>
        <p className="text-sm sm:text-base">Our selected movies for the mood</p>
      </div>
      <div className="flex justify-center sm:justify-end">
        <div className="border rounded-full p-1 hidden sm:block">
          <Image
            className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full"
            src="/436088066_7931395543545743_1167575129986485417_n1.jpg"
            alt="profileImage"
            width={50}
            height={50}
          />
        </div>
      </div>
    </nav>
  );
}
