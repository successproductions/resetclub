// Google Apps Script for RESET Club Form Submissions
// Based on working Black Friday script - uses JSON parsing

const SHEET_NAME = 'bilan gratuit'; // Change to your actual sheet name
const COLUMN_WIDTH = 200; // Width for all columns in pixels (120, 150, 180, or 200)

/**
 * Handles POST requests to save membership form data
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Sheet not found: ' + SHEET_NAME
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Prénom',
        'Nom',
        'Âge',
        'Email',
        'Téléphone',
        'Objectif Principal',
        'Comment avez-vous entendu parler',
        'Niveau d\'énergie',
        'Qualité du sommeil',
        'Niveau de stress',
        'Description du stress',
        'Habitudes bien-être',
        'Relation nutrition',
        'Priorité RESET',
        'Situation lifestyle',
        'Description lifestyle'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 17);
      headerRange.setBackground('#f5efe8');
      headerRange.setFontColor('#000000');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    // Prepare the row data
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

    // Get the next empty row
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;

    // First, set the phone column (F) as TEXT format BEFORE adding data
    const phoneCell = sheet.getRange(nextRow, 6);
    phoneCell.setNumberFormat('@STRING@'); // Force text format

    // Set data WITHOUT phone number first
    const rowDataWithoutPhone = [[
      Utilities.formatDate(timestamp, 'Africa/Casablanca', 'dd/MM/yyyy HH:mm:ss'),
      data.firstName || '',
      data.lastName || '',
      data.age || '',
      data.email || '',
      '', // Empty for now (phone - will be set separately)
      data.mainGoal || '',
      data.howDidYouHear || '',
      data.energyLevel || '',
      data.sleepQuality || '',
      data.stressLevel || '',
      data.stressDescription || '',
      data.wellnessHabits || '',
      data.nutritionRelation || '',
      data.resetPriority || '',
      data.lifestyleSituation || '',
      data.lifestyleDescription || ''
    ]];

    // Write the data (without phone)
    const rowRange = sheet.getRange(nextRow, 1, 1, 17);
    rowRange.setValues(rowDataWithoutPhone);

    // Now set the phone number separately with apostrophe to preserve format
    phoneCell.setValue("'" + (data.phone || ''));

    // Alternate row colors
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#f9f9f9');
    } else {
      rowRange.setBackground('#ffffff');
    }

    // Set all columns to the same width
    const TOTAL_COLUMNS = 17;
    for (let i = 1; i <= TOTAL_COLUMNS; i++) {
      sheet.setColumnWidth(i, COLUMN_WIDTH);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Membership form saved successfully',
        row: nextRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Test function to verify the script works
 */
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        firstName: 'Test',
        lastName: 'User',
        age: '26-35',
        email: 'test@example.com',
        phone: '+212 6 12 34 56 78',
        mainGoal: 'Retrouver ton énergie et ta vitalité',
        howDidYouHear: 'Instagram / Nahed Rachad, Bouche à oreille',
        energyLevel: '7',
        sleepQuality: 'Je dors bien et me réveille reposée',
        stressLevel: 'sometimes',
        stressDescription: 'Travail et famille',
        wellnessHabits: 'Je pratique une activité physique régulière',
        nutritionRelation: 'Je mange sainement la plupart du temps',
        resetPriority: 'Énergie & vitalité',
        lifestyleSituation: 'Je travaille à temps plein',
        lifestyleDescription: 'Journée chargée avec travail et famille'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}

/**
 * Function to clear all data (use with caution!)
 */
function clearAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) {
    sheet.clear();
    Logger.log('All data cleared from sheet: ' + SHEET_NAME);
  } else {
    Logger.log('Sheet not found: ' + SHEET_NAME);
  }
}

/**
 * Function to set all columns to the same width
 * Run this to test - adjust the width value as needed
 */
function setAllColumnsSameWidth() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    Logger.log('Sheet not found: ' + SHEET_NAME);
    return;
  }

  const WIDTH = 200; // Change this value to adjust width (in pixels)
  const TOTAL_COLUMNS = 17;

  // Set all columns to the same width
  for (let i = 1; i <= TOTAL_COLUMNS; i++) {
    sheet.setColumnWidth(i, WIDTH);
  }

  Logger.log('All columns set to ' + WIDTH + ' pixels width');
}

/**
 * Alternative: Set all columns to a specific width
 * Try different widths: 120, 150, 180, 200
 */
function setColumnsWidth120() {
  setColumnsToWidth(120);
}

function setColumnsWidth150() {
  setColumnsToWidth(150);
}

function setColumnsWidth180() {
  setColumnsToWidth(180);
}

function setColumnsWidth200() {
  setColumnsToWidth(200);
}

function setColumnsToWidth(width) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    Logger.log('Sheet not found: ' + SHEET_NAME);
    return;
  }

  const TOTAL_COLUMNS = 17;

  for (let i = 1; i <= TOTAL_COLUMNS; i++) {
    sheet.setColumnWidth(i, width);
  }

  Logger.log('All columns set to ' + width + ' pixels width');
}
