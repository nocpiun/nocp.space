"use client";

import Link from "next/link";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown, Github } from "lucide-react";
import type { ArrayElement } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import projects from "@/data/info/projects.json";
import { Markdown } from "@/components/markdown";

const columns: ColumnDef<ArrayElement<typeof projects>>[] = [
  {
    accessorKey: "name",
    header: "项目",
    cell({ getValue }) {
      const name = getValue() as string;
      return <span className="font-semibold">{name}</span>;
    }
  },
  {
    accessorKey: "year",
    header({ column }) {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer text-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          年份
          <ArrowUpDown />
        </Button>
      );
    },
    cell({ getValue }) {
      const year = getValue() as number;
      return <span className="w-full block text-yellow-600 text-center">{year}</span>;
    }
  },
  {
    accessorKey: "url",
    header: "在线体验",
    cell({ getValue }) {
      const url = getValue() as (string | null);
      if(!url) return;

      return (
        <Button
          className="h-5"
          variant="link"
          size="sm"
          asChild>
          <Link href={url} target="_blank">Demo</Link>
        </Button>
      );
    }
  },
  {
    accessorKey: "repo",
    header: "仓库",
    cell({ getValue }) {
      const repo = getValue() as string;
      const url = "https://github.com/"+ repo;

      return (
        <div className="flex gap-1 items-center">
          <Button
            className="h-5 font-light"
            variant="link"
            size="sm"
            asChild>
            <Link href={url} target="_blank">
              <Github />
              {repo}
            </Link>
          </Button>
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: "简介",
    cell({ getValue }) {
      return (
        <div className=" wrap-anywhere text-wrap">
          <Markdown>{getValue() as string}</Markdown>
        </div>
      );
    }
  },
];

export function ProjectsTable() {
  const table = useReactTable({
    columns,
    data: projects,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {
                  header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                }
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {
              row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
