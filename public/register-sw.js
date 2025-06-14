if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)

        // Request notification permission
        if ("Notification" in window && Notification.permission === "default") {
          Notification.requestPermission()
        }
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Handle app install prompt
let deferredPrompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault()
  deferredPrompt = e

  // Show install button or banner
  const installButton = document.getElementById("install-button")
  if (installButton) {
    installButton.style.display = "block"
    installButton.addEventListener("click", () => {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt")
        }
        deferredPrompt = null
      })
    })
  }
})
