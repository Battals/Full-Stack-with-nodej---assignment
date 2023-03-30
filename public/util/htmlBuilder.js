import { promises as fs } from "fs";

async function renderPage(page, config = {}) {
  const navbar = await fs
    .readFile("./public/components/header/navbar.html", "utf-8")
    .then((navbar) =>
      navbar
        .replace("$PAGE_TITLE", config.tabTitle || "")
        .replace("$PAGE_HEADER_TITLE", config.pageTitle || "")
        .replace("$PAGE_HEADER_NAVBAR", config.pageNavbar || "")
    );
  return navbar + page;
}

// Read Page
async function readPage(pagePath) {
  return await fs.readFile(pagePath, "utf-8");
}

export default {
  renderPage,
  readPage,
};
