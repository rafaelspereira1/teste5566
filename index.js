<!-- Upfunnels pixel -->
<script>
  (function() {
    var ownerId = "66a042618fa086666ecae2fd";
    var urlParams = new URLSearchParams(window.location.search);
    var isPreview = urlParams.has('preview') && urlParams.get('preview') === 'true';

    if (!isPreview) {
      window.onload = function() {
        var leadRef = document.cookie.replace(/(?:(?:^|.*;\s*)leadRef\s*\=\s*([^;]*).*$)|^.*$/, "$1") || Math.random().toString(36).substring(2);
        document.cookie = "leadRef=" + leadRef + "; path=/;";
        console.log("LeadRef set after page load:", leadRef);

        var apiUrl = 'https://api.upfunnels.com';
        var fullPath = window.location.href;
        var body = { leadRef: leadRef, fullPath: fullPath };
        var debugBody = { fullPath: fullPath };

        fetch(apiUrl + "/page/debug", { method: "POST", body: JSON.stringify(debugBody), headers: { 'Content-Type': 'application/json' } })
          .catch(console.error);

        fetch(apiUrl + "/visits/total", { method: "POST", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
          .catch(console.error);

        fetch(apiUrl + "/visits/unique", { method: "POST", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
          .catch(function(error) {
            if (error.response && error.response.status === 409) {
              console.log(error);
            }
          });

        fetch(apiUrl + "/leads/external/" + leadRef, { method: "PATCH", body: JSON.stringify({ fullPath: fullPath }), headers: { 'Content-Type': 'application/json' } })
          .catch(console.error);

        setInterval(function() {
          fetch(apiUrl + "/visits/total", { method: "POST", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
            .catch(console.error);
        }, 2 * 60 * 60 * 1000);
      };
    }
  })();
</script>
<!-- Upfunnels pixel -->