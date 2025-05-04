import React from "react";
import Link from "next/link";

import Container from "./Container";
import { Github } from "./icons";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-primary-foreground from-[60%] to-background text-secondary py-16">
      <Container useAnimation={false} className="flex flex-col gap-y-6">
        <div className="w-full p-16"></div>
        <div className="w-full p-4"></div>
        <div className="flex items-center justify-between text-secondary-foreground">
          <Link
            href={"https://github.com/OhWonJu/i-my-me-mind-client"}
            target="_blank"
          >
            <Github className="w-5 h-5 fill-secondary-foreground" />
          </Link>
          <p className="text-xs">
            <span>© 2025 PIO(WonJu Oh). Licensed under the MIT License. </span>
            <span className="hidden sm:inline">Built with passion by PIO.</span>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
