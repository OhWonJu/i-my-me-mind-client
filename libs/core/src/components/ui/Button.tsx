"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEvent,
  useCallback,
  useRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@imymemind/core/lib/utils";

import { RippleEffect, RippleRef } from "./RippleEffect";
import { LoadingDots } from "./LoadingDots";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  variant?: "flat" | "plain" | "ghost" | "outline" | "link" | "disabled";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  children: React.ReactNode | React.ReactNode[];
  width?: number;
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
  rippleColor?: string;
  useRipple?: boolean;
  bubblingAble?: boolean;
  onClick?: (event: MouseEvent) => void;
}

export const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm border border-transparent font-medium ring-offset-0 transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        flat: "bg-primary text-secondary",
        plain: "",
        ghost:
          "flex justify-center items-center border shadow hover:shadow-inner transition-shadow border-neutral-200/50 dark:border-neutral-700",
        outline:
          "border border-primary-foreground hover:bg-neutral-200/80 hover:dark:bg-neutral-600/80",
        link: "underline underline-offset-[0.5rem] hover:text-primary-foreground",
        disabled:
          "text-neutral-50 dark:text-neutral-400 border border-transparent bg-neutral-300 dark:bg-neutral-700",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-xl",
        icon: "h-10 w-10 text-base rounded-full",
      },
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const rippleRef = useRef<RippleRef>(null);

    const {
      className,
      variant = "flat",
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      children,
      size = "default",
      type = "button",
      onClick,
      rippleColor,
      useRipple,
      bubblingAble,
      ...rest
    } = props;

    const _variant = disabled ? "disabled" : variant;
    const _width = width ? (width <= 1 ? `${width * 100}%` : width) : undefined;

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (!bubblingAble) {
          event.stopPropagation();
          event.preventDefault();
        }

        onClick?.(event);
        useRipple && rippleRef.current?.createRipple(event);
      },
      [onClick, useRipple]
    );

    return (
      <button
        ref={ref}
        aria-pressed={active}
        data-variant={_variant}
        className={cn(buttonVariants({ variant: _variant, size, className }))}
        disabled={disabled || loading}
        style={{
          width: _width,
          ...style,
        }}
        type={type}
        onClick={handleClick}
        {...rest}
      >
        {useRipple && (
          <RippleEffect
            ref={rippleRef}
            rippleColor={rippleColor ? rippleColor : "var(--puls)"}
          />
        )}
        {loading ? <LoadingDots /> : <>{children}</>}
      </button>
    );
  }
);

Button.displayName = "Button";
