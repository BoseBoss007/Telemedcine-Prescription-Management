const prescriptions = [
  {
    prescriptionId: "RX1001",
    patientId: "PT2001",
    patientName: "Ananya Rao",
    doctorName: "Dr. Meera Joseph",
    consultationDate: "2026-04-01",
    diagnosis: "Seasonal allergy",
    medicines: ["Cetirizine 10mg", "Nasal spray"],
    followUpDate: "2026-04-18",
    pharmacyPreference: "CityCare Pharmacy",
    dosageInstructions: "Take one tablet at night after food",
    status: "OPEN"
  },
  {
    prescriptionId: "RX1002",
    patientId: "PT2002",
    patientName: "Rohan Das",
    doctorName: "Dr. Kavitha Sharma",
    consultationDate: "2026-03-28",
    diagnosis: "Migraine",
    medicines: ["Sumatriptan 50mg", "Hydration salts"],
    followUpDate: "2026-04-20",
    pharmacyPreference: "MedPlus Central",
    dosageInstructions: "Use tablet only during migraine episodes",
    status: "OPEN"
  },
  {
    prescriptionId: "RX1003",
    patientId: "PT2003",
    patientName: "Farhan Ali",
    doctorName: "Dr. Neha Patel",
    consultationDate: "2026-03-22",
    diagnosis: "Gastritis",
    medicines: ["Pantoprazole 40mg", "Probiotic capsules"],
    followUpDate: "2026-04-10",
    pharmacyPreference: "Apollo Health Hub",
    dosageInstructions: "Take before breakfast for 10 days",
    status: "CLOSED"
  },
  {
    prescriptionId: "RX1004",
    patientId: "PT2004",
    patientName: "Sneha Menon",
    doctorName: "Dr. Arjun Nair",
    consultationDate: "2026-04-05",
    diagnosis: "Vitamin D deficiency",
    medicines: ["Vitamin D3 sachet", "Calcium tablets"],
    followUpDate: "2026-04-26",
    pharmacyPreference: "Wellness Pharmacy",
    dosageInstructions: "One sachet weekly and one tablet daily",
    status: "OPEN"
  }
];

module.exports = prescriptions;
