import { hydrateRoot } from "react-dom/client";
import type { PageContextClient } from "./types";

export { render };

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(document.getElementById("page-view")!, <Page {...pageProps} />);
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
