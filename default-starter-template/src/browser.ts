import install from '@xdn/prefetch/window/install'
import installDevtools from '@xdn/devtools/install'

document.addEventListener('DOMContentLoaded', function () {
  installDevtools()
  install()
})
