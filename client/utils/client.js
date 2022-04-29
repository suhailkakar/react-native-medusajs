import Medusa from "@medusajs/medusa-js";

export const createClient = () =>
  new Medusa({ baseUrl: "https://docs.medusajs.com" });
