"use client";

import { User as PrimsaUser } from "@prisma/client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  user: PrimsaUser;
}

const UserProfilePannel = ({ user }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.avatarUrl ?? "/profile.png",
            }}
            className="transition-transform"
            name={`${user.firstName} ${user.lastName}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem>
            <p onClick={() => router.replace("/user/profile")}>profile</p>
          </DropdownItem>
          <DropdownItem>
            <Link href="/user/properties">Properties</Link>
          </DropdownItem>

          <DropdownItem key="logout" color="danger">
            <LogoutLink>Log Out</LogoutLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserProfilePannel;
