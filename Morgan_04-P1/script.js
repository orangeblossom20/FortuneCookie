document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const nextBtns = document.querySelectorAll(".next");
    let currentStep = 0;
  
    // Handle clicking 'Next' to show the next step
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (validateStep(steps[currentStep])) {
          steps[currentStep].classList.remove("active");
          currentStep++;
          if (steps[currentStep]) {
            steps[currentStep].classList.add("active");
          }
        }
      });
    });
  
    // Form submit behavior
    document.getElementById("enrollmentForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const userData = {};
  
      for (let [key, value] of formData.entries()) {
        if (userData[key]) {
          // Handle multiple checkbox values (array)
          if (Array.isArray(userData[key])) {
            userData[key].push(value);
          } else {
            userData[key] = [userData[key], value];
          }
        } else {
          userData[key] = value;
        }
      }
  
      console.log("🪄 User Enrollment Data:", userData);
  
      alert("Thank you for enrolling! 🍪 Check the console for your custom cookie insights.");
    });
  
    // Validate required fields per step
    function validateStep(stepElement) {
      const requiredInputs = stepElement.querySelectorAll("input[required]");
      for (let input of requiredInputs) {
        if ((input.type === "radio" || input.type === "checkbox")) {
          const group = stepElement.querySelectorAll(`input[name='${input.name}']`);
          if (![...group].some(i => i.checked)) {
            alert("Please answer all questions before continuing.");
            return false;
          }
        } else if (!input.value.trim()) {
          input.focus();
          alert("Please complete all fields before continuing.");
          return false;
        }
      }
      return true;
    }
  
    // Ensure first step is visible
    steps[0].classList.add("active");
  });
  