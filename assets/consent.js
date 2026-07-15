(function () {
  var key = "yymethod_analytics_consent";
  var banner = document.querySelector(".consent-banner");
  if (!banner || !window.localStorage) return;

  function updateConsent(choice) {
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: choice,
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }
  }

  var stored = window.localStorage.getItem(key);
  if (stored === "granted" || stored === "denied") {
    updateConsent(stored);
    return;
  }

  banner.hidden = false;
  banner.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.getAttribute) return;
    var choice = target.getAttribute("data-consent-choice");
    if (choice !== "granted" && choice !== "denied") return;
    window.localStorage.setItem(key, choice);
    updateConsent(choice);
    banner.hidden = true;
  });
})();
