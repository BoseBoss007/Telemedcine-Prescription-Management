function attachSearchValidation() {
  const form = document.querySelector("[data-search-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    const prescriptionId = form.querySelector("[name='prescriptionId']").value.trim();
    const patientId = form.querySelector("[name='patientId']").value.trim();
    const pattern = /^[a-z0-9]{6,10}$/i;

    if (!pattern.test(prescriptionId) || !pattern.test(patientId)) {
      event.preventDefault();
      window.alert("Prescription ID and Patient ID must be 6 to 10 alpha-numeric characters.");
    }
  });
}

function attachUpdateValidation() {
  const form = document.querySelector("[data-update-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    const followUpDate = form.querySelector("[name='followUpDate']").value;
    const pharmacyPreference = form.querySelector("[name='pharmacyPreference']").value.trim();
    const dosageInstructions = form.querySelector("[name='dosageInstructions']").value.trim();

    if (!followUpDate) {
      event.preventDefault();
      window.alert("Follow-up date is required.");
      return;
    }

    if (pharmacyPreference.length < 3) {
      event.preventDefault();
      window.alert("Pharmacy preference must contain at least 3 characters.");
      return;
    }

    if (dosageInstructions.length < 10) {
      event.preventDefault();
      window.alert("Dosage instructions must contain at least 10 characters.");
    }
  });
}

attachSearchValidation();
attachUpdateValidation();
