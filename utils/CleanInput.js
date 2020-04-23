/**
 * Remove empty property from on an  object type data
 * @param {object} obj object state, with self-documenting names
 * @returns {object} Same object as the input, but with empty properties cleaned
 */
export default function cleanObject(obj) {
  const temp = { ...obj };
  for (const property in temp) {
    if (!temp[property] || temp[property] === "") {
      delete temp[property];
    }
  }
  return { ...temp };
}
