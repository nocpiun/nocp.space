/** @see https://github.com/shadcn-ui/ui/discussions/4283#discussioncomment-13259220 */

import type * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva("flex items-center *:rounded-none", {
  variants: {
    orientation: {
      horizontal: "flex-row [&>*]:first:rounded-s-md [&>*]:last:rounded-e-md [&>*]:border-r-0 [&>*]:last:border-r",
      vertical: "flex-col [&>*]:first:rounded-t-md [&>*]:last:rounded-b-md [&>*]:border-b-0 [&>*]:last:border-b",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const ButtonGroup = ({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) => {
  return <div className={cn(buttonGroupVariants({ orientation, className }))} {...props} />;
};
