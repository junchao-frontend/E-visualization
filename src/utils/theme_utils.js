const theme = {
  chalk: {
    backgroundColor: '#161522',
    titleColor: '#ffffff',
    logoSrc: 'logo_dark3.png',
    themeSrc: 'qiehuan_dark.png',
    headerBorderSrc: 'header_border_dark.png'
  },
  vintage: {
    backgroundColor: '#eeeeee',
    titleColor: '#000000',
    logoSrc: 'logo_light2.png',
    themeSrc: 'qiehuan_light.png',
    headerBorderSrc: 'header_border_light.png'
  }
}

export function getThemeValue (themeName) {
  return theme[themeName]
}
