
    // ---------- 1) EMAIL via secure form backend (Formspree) ----------
    // Replace with your Formspree endpoint:
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mandbdqo
    const form = document.getElementById("contactForm");
    const statusBox = document.getElementById("formStatus");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusBox.textContent = "Sending...";
      statusBox.className = "status";

      // Basic validation
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.email || !data.subject || !data.message){
        statusBox.textContent = "Please fill in all fields.";
        statusBox.className = "status err";
        return;
      }

      try{
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        });

        if (res.ok){
          form.reset();
          statusBox.textContent = "Thanks! Your message was sent.";
          statusBox.className = "status ok";
        }else{
          const info = await res.json().catch(() => ({}));
          statusBox.textContent = info?.error || "Something went wrong. Please try again.";
          statusBox.className = "status err";
        }
      }catch(err){
        statusBox.textContent = "Network error. Please try again.";
        statusBox.className = "status err";
      }
    });

    // ---------- 2) FACEBOOK MESSENGER CHAT PLUGIN ----------
    // Steps:
    //  - You need a Facebook Page (not a personal profile)
    //  - Go to your Page: Settings → Messaging → Add Chat Plugin, copy your Page ID
    //  - Replace PAGE_ID below
    //  - Add your site domain in Facebook: Page Settings → Advanced Messaging / Chat Plugin allowlist

    const PAGE_ID = "721216987751865"; // <-- replace

    const chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("PAGE_ID", PAGE_ID);
    chatbox.setAttribute("attribution", "biz_inbox"); // standard

    window.fbAsyncInit = function() {
      FB.init({
        xfbml            : true,
        version          : 'v21.0' // use the latest available
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  