export default function cleanObject(obj) {
  //Clean the object from unused properties
  const temp = { ...obj };
  for (const property in temp) {
    if (!temp[property] || temp[property] === "") {
      delete temp[property];
    }
  }
  return { ...temp };
}
