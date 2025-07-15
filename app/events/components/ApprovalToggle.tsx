"use client";

import { useState, useTransition } from "react";
import { updateEventApproval } from "../actions/eventActions";

interface Props {
  id: string;
  approved: boolean;
}

const ApprovalToggle = ({ id, approved: initialValue }: Props) => {
  const [approved, setApproved] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked;
    setApproved(newStatus);

    startTransition(async () => {
      await updateEventApproval(id, newStatus);
    });
  };

  return (
    <input
      type="checkbox"
      checked={approved}
      onChange={handleToggle}
      disabled={isPending}
    />
  );
};

export default ApprovalToggle;
