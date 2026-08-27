const form = document.getElementById("bookingForm");

const modal = document.getElementById("successModal");

const modalWhatsapp =
  document.getElementById("modalWhatsapp");

const closeModal =
  document.getElementById("closeModal");

const closeX =
  document.querySelector(".modal-close");


/*
  NUMERO WHATSAPP DELLA VILLA

  Non mettere + davanti.
  39 = Italia
*/

const OWNER_WHATSAPP = "393762883773";


/*
  Converte la data da:

  2026-10-19

  a:

  19/10/2026
*/

function formatDate(value) {

  if (!value) {
    return "";
  }

  const [year, month, day] =
    value.split("-");

  return `${day}/${month}/${year}`;
}


/*
  APERTURA DELLA FINESTRA
  "GRAZIE PER AVER PRENOTATO"
*/

function openModal(url) {

  modalWhatsapp.href = url;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


/*
  CHIUSURA MODALE
*/

function closeBookingModal() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


closeModal.addEventListener(
  "click",
  closeBookingModal
);


closeX.addEventListener(
  "click",
  closeBookingModal
);


modal.addEventListener(
  "click",
  function(event) {

    if (event.target === modal) {

      closeBookingModal();

    }

  }
);


/*
  INVIO PRENOTAZIONE
*/

form.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const data =
      new FormData(form);


    const firstName =
      data.get("firstName").trim();


    const lastName =
      data.get("lastName").trim();


    const phone =
      data.get("phone").trim();


    const email =
      data.get("email").trim();


    const checkin =
      formatDate(
        data.get("checkin")
      );


    const checkout =
      formatDate(
        data.get("checkout")
      );


    const guests =
      data.get("guests");


    const message =
      data.get("message").trim()
      ||
      "Nessuna richiesta speciale.";


    /*
      CONTROLLO DATE
    */

    if (
      data.get("checkin")
      >=
      data.get("checkout")
    ) {

      alert(
        "La data di check-out deve essere successiva al check-in."
      );

      return;

    }


    /*
      CREAZIONE DEL MESSAGGIO WHATSAPP
    */

    const whatsappText =

`🏡 *RICHIESTA PRENOTAZIONE — VILLA FERONIA*

👤 Nome: ${firstName} ${lastName}

📞 Telefono: ${phone}

✉️ Email: ${email}

📅 Check-in: ${checkin}

📅 Check-out: ${checkout}

👥 Ospiti: ${guests}

📝 Richieste speciali:
${message}

Richiesta inviata dal sito Villa Feronia.`;


    /*
      CREAZIONE LINK WHATSAPP
    */

    const whatsappUrl =

      `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(
        whatsappText
      )}`;


    /*
      APRE WHATSAPP
    */

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );


    /*
      MOSTRA LA SCHERMATA DI CONFERMA
    */

    openModal(
      whatsappUrl
    );


    /*
      SVUOTA IL MODULO
    */

    form.reset();

  }
);
