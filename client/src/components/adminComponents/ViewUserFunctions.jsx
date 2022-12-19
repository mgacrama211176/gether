import React, { useState } from "react";
import { DeleteModal, UpdateModal, MatchUserModal } from "./FunctionModals";

export const DeleteUser = ({ user }) => {
  return (
    <>
      <div>
        <DeleteModal user={user} />
      </div>
    </>
  );
};

export const EditUser = ({ user }) => {
  return (
    <div>
      <UpdateModal user={user} />
    </div>
  );
};

export const UserMatches = ({ user }) => {
  return (
    <div>
      <MatchUserModal user={user} />
    </div>
  );
};
