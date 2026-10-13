/**
 * STYLES
 * @module shared/styles
 */

// eslint-disable-next-line import-x/no-unresolved -- Used for esbuild.config.js cssTextPlugin
import stylesToInject from "virtual-esbuild:styles";

/**
 * Appends the bundled stylesheet to the document head if its injected style element is absent.
 *
 * @returns {void}
 */
export function injectStyles() {
  const existingStyles = document.getElementById("ls-ui-script-styles");
  if (existingStyles) return;

  /**
   * Builds a style element containing the bundled stylesheet and its deduplication ID.
   *
   * @returns {HTMLStyleElement} Detached stylesheet element.
   */
  const createStyleEl = () => {
    const style = document.createElement("style");
    style.setAttribute("id", "ls-ui-script-styles");
    style.textContent = stylesToInject;
    return style;
  };

  document.head.appendChild(createStyleEl());
}
