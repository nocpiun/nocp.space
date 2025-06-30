"use client";

import { useEffect, useId } from "react";
import abcjs from "abcjs";

export function AbcSheet({
  sheet,
  capo
}: {
  sheet: string,
  capo: number
}) {
  const id = useId();

  useEffect(() => {
    abcjs.renderAbc(id, sheet, {
      tablature: [{
        instrument: "guitar",
        tuning: ["E,", "A,", "D", "G", "B", "e"],
        capo: capo,
      }],
      wrap: {
        preferredMeasuresPerLine: 4,
        minSpacing: 1.8,
        maxSpacing: 2.7
      },
      paddingbottom: 100,
      oneSvgPerLine: true
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={id}
      className="!overflow-visible !h-fit [&>*]:!overflow-visible [&_*]:font-normal [&>*]:!h-72 [&_svg]:h-full mb-20"/>
  );
}
