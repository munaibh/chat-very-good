exports.toBytes = value => {
  return (value/1024/1024).toFixed(1)
}

exports.toDate  = value => {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var date = new Date(value)
  return `${date.getUTCDate()} ${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

exports.toParagraphs = str => {
  var items = str.split('\n');
  var string = ''
  items.forEach(function(item) {
    if(item != '') string += `<p>${item}</p>`
  })
  return string
}