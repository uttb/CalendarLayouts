// Function to switch pages by setting active class
function nextPage(pageNumber) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById('page' + pageNumber).classList.add('active');
}

// Function to check if terms are accepted
function checkAcceptance() {
  const termsAccepted = document.getElementById('acceptTerms').checked;
  document.getElementById('page2Next').disabled = !termsAccepted;
}

// Form submission handler - if we process with this architecture, it should lead to the next page
document.getElementById('participantForm').onsubmit = function(event) {
  event.preventDefault();
  alert('Thank you! The experiment will now begin.');
  // Here you can add redirection or additional JS to start the experiment
};
