# Lunch Roulette

A simple Lunch Roulette script in JavaScript. Enter a list of participants into a Google Sheet, add the script to Google Apps Script, and it will randomly pair them for lunch meetups while avoiding repeats from the last execution.

## Table Layout
Set up your Google Sheet with the following structure:

| **Column** | **Header**              | **Description**                                        |
|------------|-------------------------|--------------------------------------------------------|
| A          | First Name              | Participants first name.                             |
| B          | Last Name               | Participants last name.                              |
| C          | Email                   | Participants email address.                          |
| D          | Partners First Name    | The first name of the participants assigned partner. (Output) |
| E          | Partners Last Name     | The last name of the participants assigned partner. (Output) |
| F          | Partners Email         | The email address of the participants assigned partner. (Output) |
| G          | Last Partner            | The full name (First Name + Last Name) of the last assigned partner. (Output) |

## Example Table Layout

| **First Name** | **Last Name** | **Email**             | **Partners First Name** | **Partners Last Name** | **Partners Email**       | **Last Partner**         |
|----------------|---------------|-----------------------|---------------------------|--------------------------|---------------------------|---------------------------|
| John           | Doe           | john.doe@example.com  |                           |                          |                           |                           |
| Jane           | Smith         | jane.smith@example.com|                           |                          |                           |                           |

## Instructions
1. Set up your Google Sheet with the table layout described above.
2. Add the script to Google Apps Script in your Google Sheet.
3. Run the script to pair participants randomly for lunch meetups.
