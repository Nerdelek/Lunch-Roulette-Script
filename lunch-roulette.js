function randomizer() {
  const HEADER_ROW_COUNT = 1; // Number of header rows
  const START_COLUMN = 1; // Start column (A)
  const TOTAL_COLUMNS = 7; // Total columns (A-G)
  
  // Get the specific sheet by name
  const sheetName = "Lunch-Roulette";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(`The sheet "${sheetName}" does not exist. Please check the sheet name.`);
  }

  // Fetch participant data, ensuring A2:G2 is included
  const data = fetchData(sheet, HEADER_ROW_COUNT, START_COLUMN, TOTAL_COLUMNS);

  // Validate data before proceeding
  if (data.length === 0) {
    throw new Error("The sheet contains no valid participant data. Please check the input.");
  }

  // Generate pair assignments
  const { assignments, leftover } = generateAssignments(data);

  // Update the spreadsheet with results
  updateSpreadsheet(sheet, assignments, leftover, HEADER_ROW_COUNT);
}

/**
 * Fetches data from the spreadsheet and maps it to participant objects.
 */
function fetchData(sheet, headerRowCount, startColumn, totalColumns) {
  const range = sheet.getRange(headerRowCount + 1, startColumn, sheet.getLastRow() - headerRowCount, totalColumns);
  const values = range.getValues();

  return values.map((row, index) => ({
    name: row[0], // First Name (Column A)
    lastName: row[1], // Last Name (Column B)
    email: row[2], // Email (Column C)
    partnerFirstName: row[3], // Partner's First Name (Column D)
    partnerLastName: row[4], // Partner's Last Name (Column E)
    partnerEmail: row[5], // Partner's Email (Column F)
    lastPartner: row[6], // Last Partner (Column G)
    rowIndex: index + headerRowCount + 1 // Adjust for 1-based indexing
  }))
    .filter(row => row.name && row.email); // Exclude rows without names or emails
}

/**
 * Generates pair assignments while ensuring no one is paired with their last partner.
 */
function generateAssignments(data) {
  let availableParticipants = [...data];
  const assignments = [];

  while (availableParticipants.length > 1) {
    const person1 = availableParticipants.shift();
    const possiblePartners = findValidPartners(person1, availableParticipants);

    if (possiblePartners.length === 0) {
      throw new Error(`No valid partner assignment possible for ${person1.name} ${person1.lastName}.`);
    }

    const person2 = pickRandomPartner(possiblePartners);
    availableParticipants = removeParticipant(availableParticipants, person2);

    assignments.push([person1, person2]);
  }

  // Return leftover participant if the count is odd
  return { assignments, leftover: availableParticipants.length === 1 ? availableParticipants[0] : null };
}

/**
 * Finds valid partners for a given participant, excluding their last partner.
 */
function findValidPartners(person, participants) {
  return participants.filter(candidate => candidate.name + " " + candidate.lastName !== person.lastPartner);
}

/**
 * Picks a random partner from a list of possible partners.
 */
function pickRandomPartner(possiblePartners) {
  return possiblePartners[Math.floor(Math.random() * possiblePartners.length)];
}

/**
 * Removes a participant from the available list.
 */
function removeParticipant(participants, partner) {
  return participants.filter(person => person.name !== partner.name || person.lastName !== partner.lastName);
}

/**
 * Updates the spreadsheet with the assignments and leftover participant.
 */
function updateSpreadsheet(sheet, assignments, leftover, headerRowCount) {
  const updates = [];

  // Prepare updates for assignments
  assignments.forEach(([person1, person2]) => {
    updates.push(
      { row: person1.rowIndex, col: 4, value: person2.name }, // Partner's First Name (Column D)
      { row: person1.rowIndex, col: 5, value: person2.lastName }, // Partner's Last Name (Column E)
      { row: person1.rowIndex, col: 6, value: person2.email }, // Partner's Email (Column F)
      { row: person1.rowIndex, col: 7, value: person2.name + " " + person2.lastName }, // Last Partner (Column G)

      { row: person2.rowIndex, col: 4, value: person1.name }, // Partner's First Name (Column D)
      { row: person2.rowIndex, col: 5, value: person1.lastName }, // Partner's Last Name (Column E)
      { row: person2.rowIndex, col: 6, value: person1.email }, // Partner's Email (Column F)
      { row: person2.rowIndex, col: 7, value: person1.name + " " + person1.lastName } // Last Partner (Column G)
    );
  });

  // Handle leftover participant (Joker)
  if (leftover) {
    const jokerName = "John";
    const jokerLastName = "Doe";
    const jokerEmail = "john.doe@john.doe";

    updates.push(
      { row: leftover.rowIndex, col: 4, value: jokerName }, // Partner's First Name
      { row: leftover.rowIndex, col: 5, value: jokerLastName }, // Partner's Last Name
      { row: leftover.rowIndex, col: 6, value: jokerEmail }, // Partner's Email
      { row: leftover.rowIndex, col: 7, value: jokerName + " " + jokerLastName } // Last Partner
    );
  }

  // Apply all updates
  updates.forEach(({ row, col, value }) => {
    sheet.getRange(row, col).setValue(value);
  });
}
