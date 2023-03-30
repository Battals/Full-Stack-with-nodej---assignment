const pageTitle = "Nodejs mandatory";

const pageNavbarOptionPath = "./public/components/header/navbar-options.html";

const terminalCommandsPath = "./notes/terminal-commands";

const codeSnippetsPath = "./notes/code-snippets";

const theoryPath = "./notes/theory";

const toolsPath = "./notes/tools";

function getNotePath(type) {
  return "./notes/" + type;
}

export default {
  pageTitle,
  pageNavbarOptionPath,
  terminalCommandsPath,
  codeSnippetsPath,
  theoryPath,
  toolsPath,
  getNotePath,
};
