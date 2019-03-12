const os = require('os')
const getWindowsProxy = require('@cypress/get-windows-proxy')

module.exports = {
  _getWindowsProxy () {
    return getWindowsProxy()
  },

  loadSystemProxySettings () {
    if (process.env.HTTP_PROXY !== undefined) {
      return
    }

    if (os.platform() === 'win32') {
      const windowsProxy = this._getWindowsProxy()

      if (windowsProxy) {
        process.env.HTTP_PROXY = process.env.HTTPS_PROXY = windowsProxy.httpProxy
        process.env.NO_PROXY = process.env.NO_PROXY || windowsProxy.noProxy
      }

      return 'win32'
    }
  },
}
