import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userSubmitType } from "@/app/api/submit/route";
import SubmitSelect from "./SubmitSelect";

type UserSubmitTableProps = {
  data: userSubmitType[];
};

const UserSubmitTable = ({ data }: UserSubmitTableProps) => {
  return (
    <>
      <Table>
        <TableCaption>Recent User Submissions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Street</TableHead>
            <TableHead>City </TableHead>
            <TableHead className="text-right">State</TableHead>
            <TableHead className="text-right">User</TableHead>
            <TableHead className="text-right">Approve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.street}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell className="text-right">{row.state}</TableCell>
              <TableCell className="text-right">{row.user}</TableCell>
              <TableCell className="text-right">
                <SubmitSelect />
                {/* <Button className="cursor-pointer">False</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserSubmitTable;
