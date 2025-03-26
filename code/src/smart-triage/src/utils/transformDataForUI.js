export function transformDataForUI(jsonData) {
  /**
   * Transforms the given JSON data to group by primaryRequestType.requestType
   * and includes possibleRequestTypes and primaryRequestType in the details.
   *
   * Args:
   * jsonData: An array of objects representing the input data.
   *
   * Returns:
   * An object where keys are primary request types and values are arrays of
   * objects, each containing the filename and the remaining details.
   */
  const transformedData = {};

  if (!jsonData || jsonData.length === 0) {
    return transformedData;
  }

  jsonData.forEach((item) => {
    const primaryRequestType = item.primaryRequestType;
    const fileName = item.fileName;

    if (primaryRequestType && primaryRequestType.requestType && fileName) {
      const requestType = primaryRequestType.requestType;
      const details = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && key !== "fileName") {
          details[key] = item[key];
        }
      }

      if (!transformedData[requestType]) {
        transformedData[requestType] = [];
      }
      transformedData[requestType].push({ name: fileName, details: details });
    }
  });

  return transformedData;
}

export default transformDataForUI;
