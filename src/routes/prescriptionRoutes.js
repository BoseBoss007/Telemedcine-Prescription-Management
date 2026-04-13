const express = require("express");
const {
  ValidationError,
  NotFoundError,
  UpdateNotAllowedError,
  findPrescription,
  updatePrescription
} = require("../services/prescriptionService");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Telemedicine Prescription Management",
    lastViewedId: req.session.lastViewedId || req.cookies.lastViewedId || ""
  });
});

router.get("/prescriptions/search", (req, res) => {
  res.render("search", {
    title: "Search Prescription",
    error: null,
    values: {
      prescriptionId: "",
      patientId: ""
    }
  });
});

router.post("/prescriptions/search", async (req, res) => {
  const { prescriptionId, patientId } = req.body;

  try {
    const record = await findPrescription(prescriptionId, patientId);
    req.session.lastViewedId = record.prescriptionId;
    res.cookie("lastViewedId", record.prescriptionId, { httpOnly: true, sameSite: "lax" });
    res.render("details", {
      title: "Prescription Details",
      record,
      error: null
    });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof NotFoundError
    ) {
      return res.status(400).render("failure", {
        title: "Search Failed",
        message: error.message
      });
    }

    return res.status(500).render("failure", {
      title: "Search Failed",
      message: "An unexpected error occurred while searching the prescription."
    });
  }
});

router.get("/prescriptions/:prescriptionId/:patientId/edit", async (req, res) => {
  try {
    const record = await findPrescription(req.params.prescriptionId, req.params.patientId);
    res.render("edit", {
      title: "Update Prescription",
      record,
      error: null
    });
  } catch (error) {
    const message =
      error instanceof ValidationError || error instanceof NotFoundError
        ? error.message
        : "Unable to load the selected prescription.";

    res.status(400).render("failure", {
      title: "Update Unavailable",
      message
    });
  }
});

router.post("/prescriptions/:prescriptionId/:patientId/update", async (req, res) => {
  try {
    const record = await updatePrescription(req.params.prescriptionId, req.params.patientId, req.body);
    req.session.lastViewedId = record.prescriptionId;
    res.render("success", {
      title: "Update Successful",
      record
    });
  } catch (error) {
    if (
      error instanceof ValidationError ||
      error instanceof NotFoundError ||
      error instanceof UpdateNotAllowedError
    ) {
      return res.status(400).render("failure", {
        title: "Update Failed",
        message: error.message
      });
    }

    return res.status(500).render("failure", {
      title: "Update Failed",
      message: "An unexpected error occurred while updating the prescription."
    });
  }
});

module.exports = router;
