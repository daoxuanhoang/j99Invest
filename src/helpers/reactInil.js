import { createIntl, createIntlCache } from "react-intl";

// Translated messages in French with matching IDs to what you declared
const messagesInFrench = {
  myMessage: "Aujourd'hui, c'est le {ts, date, ::yyyyMMdd}",
};

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

// Create the `intl` object
export const intl = createIntl(
  {
    // Locale of the application
    locale: "fr",
    // Locale of the fallback defaultMessage
    defaultLocale: "en",
    messages: messagesInFrench,
  },
  cache
);
