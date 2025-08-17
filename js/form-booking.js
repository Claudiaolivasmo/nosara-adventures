// ===== form-booking.js =====

document.addEventListener("DOMContentLoaded", () => {
  const form = $("#booking-form");
  const submitBtn = $("#submit-btn");
  const termsCheckbox = $("#terms");
  const confirmationMessage = $("#confirmation-message");

  if (!(form && submitBtn && termsCheckbox && confirmationMessage)) return;

  const requiredIds = ["first-name", "email", "phone", "quantity", "terms"];
  const emailInput  = $("#email");
  const phoneInput  = $("#phone");
  const pickupDate  = $("#pickup-date");
  const returnDate  = $("#return-date");

  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = v => /^[0-9+\-\s()]{7,}$/.test(v);

  termsCheckbox.addEventListener("change", () => {
    submitBtn.disabled = !termsCheckbox.checked;
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    requiredIds.forEach(id => delErr(document.getElementById(id)));
    requiredIds.forEach(id => {
      const field = document.getElementById(id);
      if (!field) return;
      const isCheckbox = field.type === "checkbox";
      const empty = isCheckbox ? !field.checked : !field.value.trim();
      if (empty) { addErr(field); valid = false; }
    });

    if (emailInput && !isValidEmail(emailInput.value.trim())) {
      addErr(emailInput); valid = false;
    }
    if (phoneInput && !isValidPhone(phoneInput.value.trim())) {
      addErr(phoneInput); valid = false;
    }

    if (pickupDate && returnDate && pickupDate.value && returnDate.value) {
      const p = new Date(pickupDate.value);
      const r = new Date(returnDate.value);
      if (isNaN(p) || isNaN(r) || r < p) {
        addErr(pickupDate); addErr(returnDate); valid = false;
        alert("Please check your dates: return date must be the same day or after pickup date.");
      }
    }

    if (!valid) {
      alert("Please complete all required fields marked with *.");
      return;
    }

    const formData = new FormData(form);
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        form.style.display = "none";
        confirmationMessage.style.display = "block";
      } else {
        alert("There was an error submitting the form. Please try again.");
        submitBtn.disabled = false;
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      submitBtn.disabled = false;
    }
  });
});

// ===== datepickers.js =====

document.addEventListener("DOMContentLoaded", () => {
  if (typeof flatpickr === "undefined") return;
  if ($("#pickup-date")) flatpickr("#pickup-date", { dateFormat: "Y-m-d", altInput: true, altFormat: "F j, Y" });
  if ($("#return-date")) flatpickr("#return-date", { dateFormat: "Y-m-d", altInput: true, altFormat: "F j, Y" });
});
