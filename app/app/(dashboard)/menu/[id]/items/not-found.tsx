import Image from "next/image";

export default function NotFoundPost() {
  return (
    <div className="mt-20 mb-10 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">404</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/falling.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Menu items do not exist, Add items to the menu.
      </p>
      <button className="dark:text-white">Add menu item</button>
    </div>
  );
}
