// Script to help users install the PWA
console.log("PWA Installation Helper")

// Check if the app is already installed
function isAppInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true
}

// Show install instructions based on browser/device
function showInstallInstructions() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)
  const isChrome = /Chrome/.test(navigator.userAgent)

  if (isAppInstalled()) {
    console.log("✅ App is already installed!")
    return
  }

  console.log("📱 Installation Instructions:")

  if (isIOS) {
    console.log('iOS: Tap the Share button and select "Add to Home Screen"')
  } else if (isAndroid && isChrome) {
    console.log(
      'Android Chrome: Look for the "Add to Home Screen" banner or tap the menu and select "Add to Home Screen"',
    )
  } else {
    console.log("Desktop: Look for the install icon in the address bar or use the browser menu")
  }
}

// Run the installation helper
showInstallInstructions()

// Monitor for installation
window.addEventListener("appinstalled", () => {
  console.log("🎉 PWA was installed successfully!")
})
