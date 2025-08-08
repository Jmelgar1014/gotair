import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubmitSelect = () => {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Approval" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Approval</SelectLabel>
            <SelectItem value="true">Approve</SelectItem>
            <SelectItem value="false">Not Approved</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SubmitSelect;
