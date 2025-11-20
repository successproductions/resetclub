// Add this to your existing Google Apps Script

const MASTER_CLASS_SHEET_NAME = 'Master Class';

/**
 * Handles POST requests for master class registrations
 */
function doPostMasterClass(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(MASTER_CLASS_SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Sheet not found: ' + MASTER_CLASS_SHEET_NAME
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Check if headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Nom',
        'Email',
        'Téléphone',
        'Ticket VIP'
      ]);

      const headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground('#e3bd93');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;

    const rowData = [[
      Utilities.formatDate(timestamp, 'Africa/Casablanca', 'dd/MM/yyyy HH:mm:ss'),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.wantsVIP || 'Non'
    ]];

    const rowRange = sheet.getRange(nextRow, 1, 1, 5);
    rowRange.setValues(rowData);

    // Alternate row colors
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#f9f9f9');
    } else {
      rowRange.setBackground('#ffffff');
    }

    // Set column widths
    for (let i = 1; i <= 5; i++) {
      sheet.setColumnWidth(i, 200);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Master class registration saved successfully',
        row: nextRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPostMasterClass: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Update your main doPost function to include this routing:
// if (data.formType === 'master-class') {
//   return doPostMasterClass(e);
// }
