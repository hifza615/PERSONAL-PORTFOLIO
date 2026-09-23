document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.querySelector(".chat-toggle");
  const chatbot = document.querySelector(".chatbot");
  const closeChat = document.querySelector(".chat-head button");
  const answer = document.querySelector(".bot-answer");

  chatToggle?.addEventListener("click", () => chatbot.classList.toggle("open"));
  closeChat?.addEventListener("click", () => chatbot.classList.remove("open"));

  document.querySelectorAll(".chat-body > button").forEach(btn => {
    btn.addEventListener("click", () => {
      answer.textContent = btn.dataset.answer;
    });
  });

  // Close chatbot with Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") chatbot?.classList.remove("open");
  });

  // Active nav link based on section in view
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.opacity = link.getAttribute("href") === `#${entry.target.id}` ? "1" : ".55");
      }
    });
  }, { threshold: .45 });
  sections.forEach(section => navObserver.observe(section));
});
