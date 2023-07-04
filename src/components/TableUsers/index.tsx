import { FC, PropsWithChildren } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import * as S from "./styles";

type User = { username: string; email: string; id: string };

export type TableUsersProps = {
  data: User[];
};

const TableUsers: FC<PropsWithChildren<TableUsersProps>> = ({ data = [] }) => {
  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.accessor("id", {
      header: () => <span>ID</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("username", {
      header: () => <span>Nome</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
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

export default TableUsers;
