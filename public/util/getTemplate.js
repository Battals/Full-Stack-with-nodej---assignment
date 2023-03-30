import htmlBuilder from "./htmlBuilder.js";
import createPage from "./createPage.js";

import general from "./html/general.js";
import frontendTemplate from "./frontendTemplate.js";
import notepadHtml from "./html/notepadHtml.js";
import getUpdateNoteHtml from "./html/getUpdateNotepadHtml.js";

async function getPage(pageType, type, id) {
  const config = await getValues(pageType, type, id);

  let page = await htmlBuilder.readPage(config.path);

  const htmlContent = await frontendTemplate(config.htmlPath);

  page = page.toString().replace(config.htmlContent, htmlContent);

  if (pageType == "UPDATE_NOTE") {
    page = page
      .toString()
      .replace(config.htmlContent, await getUpdateNoteHtml(type, id));
  } else if (type != null && id != null) {
    page = page
      .toString()
      .replace(config.notepadTable, await notepadHtml.getNotepadHtml(type, id));
  } else if (type != null) {
    page = page
      .toString()
      .replace(config.notepadTable, await notepadHtml.getNotepadHtml(type));
  }
  return createPage(page, config.title, general.pageTitle);
}

async function getValues(pageType, type, id) {
  if (type != null && id != null) {
    return await returnPages(pageType, type, id);
  } else if (type != null) {
    return await returnPages(pageType, type);
  } else {
    return await returnPages(pageType);
  }
}

async function returnPages(page) {
  switch (page) {
    case "FRONT_PAGE":
      return await createContentObject("frontpage", "Front Page", page);
    case "NOTEPAD":
      return await createContentConfig("notepad", "Notepad Page", page);
    case "CREATE_NOTE":
      return await createContentObject("create-note", "Create Note Page", page);
    case "UPDATE_NOTE":
      return await createUpdateNoteConfig(
        "update-note",
        "Update Notepad",
        page
      );
    case "LOGIN":
      return await createContentObject("login", "Login Page", page);
    case "ADMIN":
      return await createContentObject("admin", "Admin Page", page);
    case "UPDATE_NOTE":
      return await createUpdateNoteConfig("notepad", "Update Notepad", page);
  }
}

function createContentObject(pageType, title, htmlContent) {
  const htmlPath = `./public/components/templates/${pageType}.html`;
  const path = `./public/pages/${pageType}/${pageType}.html`;
  const formattedHtmlContent = `$${htmlContent}_HTML_CONTENT`;

  return { htmlPath, path, title, htmlContent: formattedHtmlContent };
}

function createContentConfig(pageType, title, htmlContent) {
  return {
    htmlPath: `./public/components/templates/${pageType}.html`,
    path: `./public/pages/${pageType}/${pageType}.html`,
    title,
    htmlContent: `$${htmlContent}_HTML_CONTENT`,
    notepadTable: "$NOTELIST_HTML_CONTENT",
  };
}

function createUpdateNoteConfig(pageType, title, htmlContent) {
  return {
    htmlPath: `./public/components/templates/${pageType}.html`,
    path: `./public/pages/${pageType}/${pageType}.html`,
    title,
    htmlContent: `$${htmlContent}_HTML_CONTENT`,
  };
}

export default {
  getPage,
};
