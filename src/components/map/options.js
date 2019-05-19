export const measureOprions = {
  position: 'topleft',
  primaryLengthUnit: 'meters',
  popupOptions: {className: 'leaflet-measure-resultpopup', autoPanPadding: [60, 60]},
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'acres',
  activeColor: '#669eff',
  completedColor: '#2965cc'
}

export const glassOptions = {
  position: 'topleft',
  radius: 100,
  zoomOffset: 3
}

export const printOptions = {
  title: "Напечатать карту",
  position: "topright",
  hideControlContainer: false,
  sizeModes: ['A4Portrait', 'A4Landscape']
}

export const saveAsPngOptions = {
  title: "Экспорт карты в PNG",
  position: "topright",
  sizeModes: ['A4Portrait', 'A4Landscape'],
  hideControlContainer: true,
  exportOnly: true
}