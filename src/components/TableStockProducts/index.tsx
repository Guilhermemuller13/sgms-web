import { FC, PropsWithChildren } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import * as S from "./styles";

type Product = {
  quantity: number;
  quantity_minimum: number;
  code: string;
  id: string;
  name: string;
};

export type TableStockProductsProps = {
  data: Product[];
};

const TableStockProducts: FC<PropsWithChildren<TableStockProductsProps>> = ({
  data = [],
}) => {
  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.accessor("code", {
      header: () => <span>Código</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: () => <span>Produto</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("quantity", {
      header: () => <span>Quantidade</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("quantity_minimum", {
      header: () => <span>Qtd. Min.</span>,
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <S.TableBody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  );
};

export default TableStockProducts;
