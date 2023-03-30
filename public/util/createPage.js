import general from "./html/general.js";
import frontendTemplate from "./frontendTemplate.js";
import htlmBuilder from "./htmlBuilder.js";

const createPage = async (page, tabTitle, pageTitle) => {
  const navbar = await frontendTemplate(general.pageNavbarOptionPath);
  const renderedPage = htlmBuilder.renderPage(page, {
    tabTitle,
    pageTitle,
    pageNavbar: navbar,
  });
  return renderedPage;
};

export default createPage;
