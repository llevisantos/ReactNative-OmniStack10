module.exports = function parseStringAsArray(arrayAsSrting){
    return arrayAsSrting.split(',').map(conhecimentos => conhecimentos.trim());
}