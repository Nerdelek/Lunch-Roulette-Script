# Lunch Roulette

A simple Lunch Roulette script in JavaScript. Enter a list of participants into a Google Sheet, add the script to Google Apps Script, and it will randomly pair them for lunch meetups while avoiding repeats from the last execution.

## Table Layout
Set up your Google Sheet with the following structure:

| **Column** | **Header**              | **Description**                                        |
|------------|-------------------------|--------------------------------------------------------|
| A          | First Name              | Participant's first name.                             |
| B          | Last Name               | Participant's last name.                              |
| C          | Email                   | Participant's email address.                          |
| D          | Partner's First Name    | The first name of the participant's assigned partner. *(Output)* |
| E          | Partner's Last Name     | The last name of the participant's assigned partner. *(Output)* |
| F          | Partner's Email         | The email address of the participant's assigned partner. *(Output)* |
| G          | Last Partner            | The full name (First Name + Last Name) of the last assigned partner. *(Output)* |

## Example Table Layout

| **First Name** | **Last Name** | **Email**             | **Partner's First Name** | **Partner's Last Name** | **Partner's Email**       | **Last Partner**         |
|----------------|---------------|-----------------------|---------------------------|--------------------------|---------------------------|---------------------------|
| John           | Doe           | john.doe@example.com  |                           |                          |                           |                           |
| Jane           | Smith         | jane.smith@example.com|                           |                          |                           |                           |

## Instructions
1. Set up your Google Sheet with the table layout described above.
2. Add the script to Google Apps Script in your Google Sheet.
3. Run the script to pair participants randomly for lunch meetups.
