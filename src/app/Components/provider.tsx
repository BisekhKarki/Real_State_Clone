// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import Appbar from "./Appbar";
import SigninPannel from "./signinPannel";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
