import { FC, PropsWithChildren } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit } from "@styled-icons/material-outlined";

import { Service } from "../ListServices";

import * as S from "./styles";
import Button from "../Button";

export type TableServicesProps = {
  data: Service[];
  handleClickService: (id: string) => void;
};

const TableServices: FC<PropsWithChildren<TableServicesProps>> = ({
  data = [],
  handleClickService,
}) => {
  const handleEditeService = (id: string) => {
    handleClickService(id);
  };

  const columnHelper = createColumnHelper<Service>();
  const columns = [
    columnHelper.accessor("dataValues.id", {
      header: () => <span>ID</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dataValues.name", {
      header: () => <span>Serviço</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dataValues.description", {
      header: () => <span>Descrição</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dataValues", {
      header: () => <span>#</span>,
      cell: (info) => (
        <Button
          size="small"
          icon={<Edit />}
          onClick={() => handleEditeService(info.getValue().id)}
        />
      ),
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

export default TableServices;
