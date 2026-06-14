import { init } from "@instantdb/react";
import schema from "../../instant.schema";

const APP_ID = import.meta.env.VITE_INSTANT_APP_ID as string;

if (!APP_ID) {
  // Surface a clear error instead of a cryptic runtime failure.
  console.error(
    "Missing VITE_INSTANT_APP_ID. Add it to your .env (see .env.example)."
  );
}

export const db = init({ appId: APP_ID, schema });
