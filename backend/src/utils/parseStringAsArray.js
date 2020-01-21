module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(conhecimentos => conhecimentos.trim());
};