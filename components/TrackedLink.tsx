"use client";

import { trackPortfolioEvent, type TrackingProperties } from "@/lib/analytics";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

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
    trackPortfolioEvent(trackingEvent, trackingProperties);
    onClick?.(event);
  }

  return (
    <a href={href} onClick={handleClick} {...anchorProps}>
      {children}
    </a>
  );
}
