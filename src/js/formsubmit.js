//@ts-check

(() => {
  const formPostServiceUrl =
    "https://api.template.webstandards.ca.gov/api/v2/airtable/celebrate/appcLZ3c4vvTYOO6h/tblbFyz69VNWnlj8n";
  const siteKey = "6LfFwDcqAAAAAIwjIlgwSW9KAmrDfYIShsV4bX1d"; // Set this to your recaptch site key

  /** @type {HTMLButtonElement?} */
  const recaptchabutton = document.querySelector("button.g-recaptcha");
  if (!recaptchabutton) {
    console.error("Recaptcha button not found");
    return;
  }

  recaptchabutton.dataset.sitekey = siteKey;

  window.addEventListener("load", () => {
    getForm().addEventListener("submit", submitForm);
    getSubmitButton().addEventListener("click", () =>
      getForm().setAttribute("submit_attempted", "")
    );
  });

  function getForm() {
    return /** @type {HTMLFormElement} */ (
      document.getElementById("ContactUsForm")
    );
  }

  function getSubmitButton() {
    return /** @type { HTMLButtonElement } */ (
      getForm().querySelector("input[type=submit]")
    );
  }

  function goToThanksPage() {
    document.getElementById("urlThankyou")?.click();
  }

  function openModal() {
    document.getElementById("btnModal")?.click();
  }

  function openThanks() {
    document.getElementById("btnThanks")?.click();
  }

  function triggerRecaptcha() {
    recaptchabutton?.click(); //will trigger recaptchaCallback when complete
  }

  async function submitForm(/** @type { SubmitEvent } */ e) {
    e.preventDefault();

    getSubmitButton().disabled = true;
    setTimeout(() => (getSubmitButton().disabled = false), 5000);

    triggerRecaptcha();
  }

  window["recaptchaCallback"] = function (
    /** @type { string } */ g_recaptcha_response
  ) {
    // eslint-disable-next-line jsdoc/no-undefined-types
    /** @type { RequestInit } */
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([...new FormData(getForm())]) // Convert form data to JSON
    };

    fetch(formPostServiceUrl, request)
      .then(async response => {
        if (!response.ok) {
          throw new Error(
            `Can't submit - ${response.status}:${
              response.statusText
            } ${await response.text()}`
          );
        }
      })
      .then(() => {
        goToThanksPage();
      })
      .catch(error => {
        console.error(error);

        openModal();
      });
  };
})();
