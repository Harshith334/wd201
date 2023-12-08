
document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
  
      if (key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key));
        addRowToTable(userTableBody, userData);
      }
    }
  });
  
  const form = document.getElementById('registrationForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  

    const dob = new Date(form.dob.value);
    const currentYear = new Date().getFullYear();
    const age = currentYear - dob.getFullYear();
  
    // Validate the user's age to ensure it's between 18 and 55
    if (!(age >= 18 && age <= 55)) {
      alert('Age should be between 18 and 55.');
      return;
    }
  
    const userKey = 'user_' + Date.now();
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      dob: form.dob.value,
      acceptedTerms: form.acceptedTerms.checked,
      
    };
    localStorage.setItem(userKey, JSON.stringify(userData));
    addRowToTable(userTableBody, userData);
  });
  function addRowToTable(tableBody, userData) {
    const newRow = tableBody.insertRow();
    const cellStyle = 'border border-gray-300 p-2';
    const nameCell = newRow.insertCell();
    nameCell.textContent = userData.name;
    nameCell.className = cellStyle;
  
    const emailCell = newRow.insertCell();
    emailCell.textContent = userData.email;
    emailCell.className = cellStyle;
  
    const passwordCell = newRow.insertCell();
    passwordCell.textContent = userData.password;
    passwordCell.className = cellStyle;
  
    const dobCell = newRow.insertCell();
    dobCell.textContent = userData.dob;
    dobCell.className = cellStyle;
  
    const acceptedTermsCell = newRow.insertCell();
    acceptedTermsCell.textContent = userData.acceptedTerms;
    acceptedTermsCell.className = cellStyle;
  }
