// Docs: https://www.instantdb.com/docs/modeling-data
//
// Types and nullability mirror the source Supabase (Postgres) tables. Almost
// every column there is nullable, so fields are `.optional()` here. The numeric
// `contact_me` fields (audience_size, round_size, ...) are kept as strings to
// match the contact-form payload (the forms submit strings); legacy numeric
// values are coerced to strings during the one-time import.
import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    // System auth entity. This app has no authentication, so we keep the
    // default $users shape. Extend it here if/when auth is added.
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
    }),

    podcasts: i.entity({
      podcast_name: i.string().optional(),
      episode: i.number().optional(),
      // Indexed so we can order by it in InstaQL (replaces Supabase .order('date')).
      date: i.date().indexed().optional(),
      main_link: i.string().optional(),
      short_main_link: i.string().optional(),
      spotify_link: i.string().optional(),
      pod_link: i.string().optional(),
      apple: i.string().optional(),
      google: i.string().optional(),
      youtube_link: i.string().optional(),
      youtube_short_link: i.string().optional(),
      fb_link: i.string().optional(),
      fb_short_link: i.string().optional(),
      og_title: i.string().optional(),
      og_description: i.string().optional(),
      og_image_url: i.string().optional(),
      lang: i.string().optional(),
      // Postgres text[] becomes a JSON array in Instant.
      tags: i.json<string[]>().optional(),
      description_lang: i.string<"Hebrew" | "English">().optional(),
    }),

    blogs: i.entity({
      name: i.string().optional(),
      short_description: i.string().optional(),
      tags: i.json<string[]>().optional(),
      url: i.string().optional(),
      short_url: i.string().optional(),
      og_title: i.string().optional(),
      og_description: i.string().optional(),
      og_image_url: i.string().optional(),
      lang: i.string().optional(),
      date: i.date().indexed().optional(),
    }),

    talks: i.entity({
      name: i.string().optional(),
      conference: i.string().optional(),
      short_description: i.string().optional(),
      duration: i.number().optional(),
      lang: i.string().optional(),
      date: i.date().indexed().optional(),
      tags: i.json<string[]>().optional(),
      url: i.string().optional(),
      short_url: i.string().optional(),
      slides_url: i.string().optional(),
      slides_short_url: i.string().optional(),
      status: i.string().optional(),
      override_title: i.string().optional(),
      override_description: i.string().optional(),
      og_title: i.string().optional(),
      og_description: i.string().optional(),
      og_image_url: i.string().optional(),
      description_lang: i.string<"Hebrew" | "English">().optional(),
      is_private: i.boolean().optional(),
    }),

    contact_me: i.entity({
      topic: i.string().optional(),
      name: i.string().optional(),
      email: i.string().indexed().optional(),
      message: i.string().optional(),
      event_name: i.string().optional(),
      event_date: i.string().optional(),
      event_format: i.string().optional(),
      audience_size: i.string().optional(),
      podcast_name: i.string().optional(),
      company_name: i.string().optional(),
      company_website: i.string().optional(),
      deck_url: i.string().optional(),
      project_description: i.string().optional(),
      round_size: i.string().optional(),
      mentorship_area: i.string().optional(),
      paid: i.boolean().optional(),
      home_size: i.string().optional(),
      number_of_devices: i.string().optional(),
      event_topic: i.string().optional(),
    }),
  },
  // No foreign keys / join tables in the source schema, so there are no links.
  links: {},
  rooms: {},
});

// This helps Typescript display nicer intellisense.
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
