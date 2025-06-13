import type React from "react";
import { cn } from "@/lib/utils";

export function Page({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string
}) {
  return (
    <div className={cn(className, "page-padding pt-36")} {...props}>
      <h1 className="text-4xl font-bold mb-7">
        {title}
      </h1>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
