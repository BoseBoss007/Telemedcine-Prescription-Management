const { getCollection } = require("../db");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

class UpdateNotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UpdateNotAllowedError";
  }
}

function validateIdentifier(value, label) {
  if (!value || typeof value !== "string") {
    throw new ValidationError(`${label} is required.`);
  }

  if (!/^[A-Z0-9]{6,10}$/i.test(value.trim())) {
    throw new ValidationError(`${label} must be 6 to 10 alpha-numeric characters.`);
  }
}

function validateUpdatePayload(payload) {
  const { followUpDate, pharmacyPreference, dosageInstructions } = payload;

  if (!followUpDate || Number.isNaN(Date.parse(followUpDate))) {
    throw new ValidationError("Follow-up date must be a valid date.");
  }

  if (!pharmacyPreference || pharmacyPreference.trim().length < 3) {
    throw new ValidationError("Pharmacy preference must contain at least 3 characters.");
  }

  if (!dosageInstructions || dosageInstructions.trim().length < 10) {
    throw new ValidationError("Dosage instructions must contain at least 10 characters.");
  }
}

function buildIdentifierQuery(prescriptionId, patientId) {
  return {
    prescriptionId: prescriptionId.trim().toUpperCase(),
    patientId: patientId.trim().toUpperCase()
  };
}

async function findPrescription(prescriptionId, patientId) {
  validateIdentifier(prescriptionId, "Prescription ID");
  validateIdentifier(patientId, "Patient ID");

  const query = buildIdentifierQuery(prescriptionId, patientId);
  const record = await getCollection().findOne(query);

  if (!record) {
    throw new NotFoundError("No prescription record matches the entered Prescription ID and Patient ID.");
  }

  return record;
}

async function updatePrescription(prescriptionId, patientId, payload) {
  const record = await findPrescription(prescriptionId, patientId);

  if (record.status !== "OPEN") {
    throw new UpdateNotAllowedError("Updates are permitted only when the prescription status is OPEN.");
  }

  validateUpdatePayload(payload);

  const query = buildIdentifierQuery(prescriptionId, patientId);
  const updated = await getCollection().findOneAndUpdate(
    query,
    {
      $set: {
        followUpDate: payload.followUpDate,
        pharmacyPreference: payload.pharmacyPreference.trim(),
        dosageInstructions: payload.dosageInstructions.trim()
      }
    },
    { returnDocument: "after" }
  );

  return updated.value;
}

module.exports = {
  ValidationError,
  NotFoundError,
  UpdateNotAllowedError,
  findPrescription,
  updatePrescription
};
