export function transformDataForUI(jsonData) {
  /**
   * Transforms the given JSON data to group by primaryRequestType.requestType.
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

  jsonData.forEach(item => {
    const primaryRequestType = item.primaryRequestType;
    const fileName = item.fileName;

    if (primaryRequestType && primaryRequestType.requestType && fileName) {
      const requestType = primaryRequestType.requestType;
      const details = {};
      for (const key in item) {
        if (item.hasOwnProperty(key) && key !== "possibleRequestTypes" && key !== "primaryRequestType" && key !== "fileName") {
          details[key] = item[key];
        }
      }

      if (!transformedData[requestType]) {
        transformedData[requestType] =[]; // Corrected line: Assign an empty array
      }
      transformedData[requestType].push({ name: fileName, details: details });
    }
  });

  return transformedData;
}

export default transformDataForUI;
// Example usage with your provided JSON data:
const jsonData = [
  {
    "possibleRequestTypes": [
      {
        "requestType": "Payment",
        "subRequestType": "Principal Payment Notification",
        "confidenceScore": 0.95,
        "reasoning": "The email subject and body explicitly mention 'Payment Notification' and describe a principal payment. The email details the amount being paid, the new and old balances, and the parties involved."
      },
      {
        "requestType": "Account Update",
        "subRequestType": "Balance Update",
        "confidenceScore": 0.7,
        "reasoning": "The email provides details on the new and old principal balances, which implies an update on the account's status."
      }
    ],
    "primaryRequestType": {
      "requestType": "Payment",
      "subRequestType": "Principal Payment Notification",
      "reasoning": "The email's primary purpose is to notify the recipient of a principal payment. The details about the balances are secondary to the notification of the payment itself."
    },
    "extractedFields": {
      "dealName": "CANTOR FITZGERALD LP",
      "amount": "1,411,764.71",
      "expirationDate": "10-Nov-2023",
      "accountNumber": "XXXXXXXXXXXX0720",
      "abaNumber": "121000248",
      "referenceNumber": "CANTOR FIT00037"
    },
    "duplicateEmailDetection": {
      "isDuplicate": "No",
      "reason": "The email contains new information about a principal payment and doesn't appear to be a direct reply or a forward."
    },
    "fileName": "Bank_of_America.eml"
  },
  {
    "possibleRequestTypes": [
      {
        "requestType": "Facility Management",
        "subRequestType": "Share Adjustment",
        "confidenceScore": 0.95,
        "reasoning": "The email explicitly mentions 'Lender Share Adjustment' and provides details on commitment changes."
      },
      {
        "requestType": "Funding Request",
        "subRequestType": "Share Funding",
        "confidenceScore": 0.9,
        "reasoning": "The email contains the phrase 'PLEASE FUND YOUR SHARE OF' and provides an amount to be funded."
      }
    ],
    "primaryRequestType": {
      "requestType": "Facility Management",
      "subRequestType": "Share Adjustment",
      "reasoning": "While the email includes a funding request, the primary purpose is to inform the recipient of a share adjustment.  The amount to be funded is a direct consequence of the share adjustment."
    },
    "extractedFields": {
      "dealName": "ABTB MID-ATLANTIC LLC",
      "amount": "24,714.36",
      "expirationDate": null,
      "accountNumber": "0026693011",
      "abaNumber": "011500120",
      "referenceNumber": "ABTB Mid-Atlantic LLC"
    },
    "duplicateEmailDetection": {
      "isDuplicate": "No",
      "reason": "This is a new request; there is no indication of a previous email in a thread."
    },
    "fileName": "Citizens_Bank.eml"
  }
];

const transformedData = transformDataForUI(jsonData);

