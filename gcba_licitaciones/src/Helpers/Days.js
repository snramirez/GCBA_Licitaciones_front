import moment from "moment/moment";
const ctrl = {}

ctrl.daysBetween = (startDate, endDate) => {
    console.log(startDate)
    console.log(endDate)

    let startDayMoment = moment(startDate)
    let endDayMoment = moment(endDate)

    //diferencia en dias total (incluyendo sabados y domingos)
    let diffDays = endDayMoment.diff(startDayMoment, 'days')
    console.log(diffDays)

    //Resto 2 dias por cada semana que hay en el medio
    let weeks = Math.floor(diffDays / 7)
    diffDays = diffDays - (weeks * 2)

    //Obtengo que dia de la semana empezo y termino el intervalo
    let startDay = startDayMoment.day()
    let endDay = endDayMoment.day()
    console.log(startDay)
    console.log(endDay)

    //remuevo casos especiales
    if (startDay - endDay > 1){
        diffDays = diffDays - 2;
    }
    console.log(diffDays)

    // Remuevo dia de comienzo si empieza un domingo y termina antes de un sabado
    if (startDay == 0 && endDay != 6) {
        diffDays = diffDays - 1;
    }
    console.log(diffDays)


    // Remuevo el dia final si termina un sabado y empieza despues de domingo
    if (endDay == 6 && startDay != 0) {
        diffDays = diffDays - 1;
    }
    console.log(diffDays)


    return diffDays
};

export default ctrl