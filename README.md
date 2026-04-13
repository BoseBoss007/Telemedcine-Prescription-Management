<<<<<<< HEAD
# Telemedicine Prescription Management

This project is a complete solution for the **Telemedicine Prescription Management** case study from the provided PDF. It supports:

- searching a prescription using `Prescription ID` and `Patient ID`
- displaying the complete record only when the identifiers are valid and found
- updating only selected fields
- blocking updates when the prescription status is not `OPEN`
- showing dedicated success and failure pages

## Technology Stack

- Frontend: HTML, CSS, JavaScript, EJS templates
- Backend: Node.js, Express
- State support: Sessions and cookies
- Database reference: MongoDB seed collection included in `mongodb/prescriptions.seed.json`

## Editable Fields

- `followUpDate`
- `pharmacyPreference`
- `dosageInstructions`

## Business Rule

Records can be updated only when `status === "OPEN"`.

## Sample Credentials

- `RX1001` and `PT2001`
- `RX1002` and `PT2002`
- `RX1004` and `PT2004`

Try `RX1003` and `PT2003` to see the update restriction for a closed prescription.

## Run the App

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## MongoDB Support

The app now connects to MongoDB and automatically seeds the `prescriptions` collection when it is empty.

Default values:

- `MONGODB_URI`: `mongodb://127.0.0.1:27017`
- `MONGODB_DB`: `telemedicine`

If you want to use a different URI or database, set those environment variables before starting the app.
=======
# Telemedcine-Prescription-Management
>>>>>>> 4a224025aee1a65d0bb3fe839d4e072f52d0b240
