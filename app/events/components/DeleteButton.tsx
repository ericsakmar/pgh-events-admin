"use client";

import { deleteEvent } from "../actions/eventActions";

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  return (
    <form action={deleteEvent}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-error font-bold">
        Delete
      </button>
    </form>
  );
};

export default DeleteButton;
