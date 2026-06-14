// Docs: https://www.instantdb.com/docs/permissions
//
// Translated from the original Supabase Row Level Security policies:
//   - podcasts / blogs / talks: public read-only (anon SELECT), no client writes.
//   - contact_me: public INSERT only (anon can submit the contact form),
//     nobody can read/update/delete from the client.
//
// There is no authentication in this app, so no `auth.id` / ownership checks
// are needed. If auth is added later, gate writes with rules like
//   "auth.id != null"  or  "auth.id == data.ref('owner.id')".
import type { InstantRules } from "@instantdb/react";

const rules = {
  // Deny anything not explicitly allowed below (secure default).
  $default: {
    allow: {
      $default: "false",
    },
  },

  podcasts: {
    allow: {
      view: "true",
      create: "false",
      update: "false",
      delete: "false",
    },
  },

  blogs: {
    allow: {
      view: "true",
      create: "false",
      update: "false",
      delete: "false",
    },
  },

  talks: {
    allow: {
      view: "true",
      create: "false",
      update: "false",
      delete: "false",
    },
  },

  contact_me: {
    allow: {
      view: "false",
      create: "true",
      update: "false",
      delete: "false",
    },
  },

  // $files permissions default to all-false in Instant. This app does not use
  // storage, so we leave them disabled. Enable explicitly here if you add it.
} satisfies InstantRules;

export default rules;
