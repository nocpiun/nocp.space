"use client";

import { useTheme } from "next-themes";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintSheetButton() {
  const { setTheme } = useTheme();

  const handlePrint = () => {
    setTheme("light");
    setTimeout(() => print(), 100);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      title="打印曲谱"
      id="print-sheet-button"
      onClick={() => handlePrint()}>
      <Printer />
    </Button>
  );
}
