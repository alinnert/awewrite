/**
 * @param {HTMLElement} element
 * @param {string} componentName
 * @returns
 */
export function createTargets(element, componentName) {
  /**
   * @param {string} targetName
   * @returns {string}
   */
  function getName(targetName) {
    return `${componentName}__${targetName}`
  }

  /**
   * @param {string} targetName
   * @returns {Element}
   */
  function getOne(targetName) {
    return get(targetName)[0]
  }

  /**
   * @param {string} targetName
   * @returns {Array<Element>}
   */
  function get(targetName) {
    return Array.from(element.getElementsByClassName(getName(targetName)))
  }

  return { get, getOne, getName }
}
