
/* =====================================
   EMAILJS INITIALIZATION
   Swift Digital Solutions
===================================== */

(function () {
    emailjs.init({
        publicKey: "kfZ44ak-8G63wcn_Y"
    });
})();

"use strict";

// Automatically display the current year.

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



/* =====================================
   CONTACT FORM - EMAIL AND WHATSAPP
   Swift Digital Solutions
===================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();
// Prevent duplicate submissions while processing.
if (contactForm.dataset.sending === "true") {
    return;
}
        const name =
            document.getElementById("clientName").value.trim();

        const email =
            document.getElementById("clientEmail").value.trim();

        const phone =
            document.getElementById("clientPhone").value.trim();

        const project =
            document.getElementById("projectType").value;

        const message =
            document.getElementById("clientMessage").value.trim();

        const formMessage =
            document.getElementById("formMessage");


        // Validate required fields.

        if (!name || !email || !project || !message) {

            formMessage.textContent =
                "Please complete all required fields.";

            return;
        }


        // Prepare the WhatsApp message.

        const whatsappMessage =
            "NEW PROJECT INQUIRY\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Phone: " + (phone || "Not provided") + "\n" +
            "Service: " + project + "\n" +
            "Project Details: " + message;


        const whatsappNumber = "254731232291";

        const whatsappURL =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(whatsappMessage);


        // Open WhatsApp so the client can send the message.

        window.open(whatsappURL, "_blank");


        // Show email sending status.

contactForm.dataset.sending = "true";

const submitButton = contactForm.querySelector(
    'button[type="submit"], input[type="submit"]'
);

if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText =
        submitButton.tagName === "INPUT"
            ? submitButton.value
            : submitButton.textContent;

    if (submitButton.tagName === "INPUT") {
        submitButton.value = "Sending...";
    } else {
        submitButton.textContent = "Sending...";
    }
}

formMessage.textContent =
    "Sending your inquiry... Please wait.";


        // Send the inquiry using EmailJS.

        emailjs.send(
            "service_zcbarss",
            "template_nhx845d",
            {
                client_name: name,
                client_email: email,
                service: project,
                message: message,
                client_phone: phone || "Not provided"
            }
        )


.then(function () {

    // Allow the form to be submitted again.
    contactForm.dataset.sending = "false";

    if (submitButton) {
        submitButton.disabled = false;

        if (submitButton.tagName === "INPUT") {
            submitButton.value =
                submitButton.dataset.originalText || "Submit";
        } else {
            submitButton.textContent =
                submitButton.dataset.originalText || "Submit";
        }
    }

    formMessage.textContent =
        "Email sent successfully! WhatsApp is open too. " +
        "Please press Send in WhatsApp to contact us there.";

    contactForm.reset();

})



.catch(function (error) {

    // Allow the form to be submitted again.
    contactForm.dataset.sending = "false";

    if (submitButton) {
        submitButton.disabled = false;

        if (submitButton.tagName === "INPUT") {
            submitButton.value =
                submitButton.dataset.originalText || "Submit";
        } else {
            submitButton.textContent =
                submitButton.dataset.originalText || "Submit";
        }
    }

    console.error("Email sending failed:", error);

    formMessage.textContent =
        "We couldn't send your email. Please try again or " +
        "contact us through WhatsApp.";

});


    });

}


/* =====================================
   MOBILE NAVIGATION FUNCTIONALITY
===================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "Close" : "Menu";

    });

    mainNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "Menu";

        });

    });

}
