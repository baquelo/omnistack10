module.exports =  function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(a => a.trim());
}