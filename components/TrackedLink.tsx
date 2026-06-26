"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type TrackingProperties = Record<string, string | number | boolean>;

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  children: ReactNode;
  trackingEvent: string;
  trackingProperties: TrackingProperties;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function TrackedLink({
  href,
  children,
  trackingEvent,
  trackingProperties,
  onClick,
  ...anchorProps
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    try {
      track(trackingEvent, trackingProperties);
    } catch {
      // Analytics must never block navigation or downloads.
    }

    onClick?.(event);
  }

  return (
    <a href={href} onClick={handleClick} {...anchorProps}>
      {children}
    </a>
  );
}
