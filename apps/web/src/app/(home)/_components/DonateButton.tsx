"use client";

import Link from "next/link";

const DonateButton = () => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Link
        href="https://www.buymeacoffee.com/pio96devt"
        target="_blank"
        className="text-center"
      >
        <img
          className="mb-1"
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=pio96devt&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
        />
        <span className="text-xs text-secondary-foreground">후원하러 가기</span>
      </Link>
    </div>
  );
};
export default DonateButton;
