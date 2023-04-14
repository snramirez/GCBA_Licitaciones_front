import moment from "moment/moment";
const ctrl = {};

ctrl.daysBetween = (startDate, endDate, holidays) => {
  let startDayMoment = moment(startDate);
  let endDayMoment = moment(endDate);

  //diferencia en dias total (incluyendo sabados y domingos)
  let diffDays = endDayMoment.diff(startDayMoment, "days");

  //Resto 2 dias por cada semana que hay en el medio
  let weeks = Math.floor(diffDays / 7);
  diffDays = diffDays - weeks * 2;

  //Obtengo que dia de la semana empezo y termino el intervalo
  let startDay = startDayMoment.day();
  let endDay = endDayMoment.day();

  //remuevo casos especiales
  if (startDay - endDay > 1) {
    diffDays = diffDays - 2;
  }

  // Remuevo dia de comienzo si empieza un domingo y termina antes de un sabado
  if (startDay == 0 && endDay != 6) {
    diffDays = diffDays - 1;
  }

  // Remuevo el dia final si termina un sabado y empieza despues de domingo
  if (endDay == 6 && startDay != 0) {
    diffDays = diffDays - 1;
  }

  diffDays = diffDays - ctrl.subtrackHolidays(startDate, endDate, holidays);

  return diffDays;
};

ctrl.subtrackHolidays = (startDate, endDate, holidays) => {
  let startDayMoment = moment(startDate);
  let endDayMoment = moment(endDate);
  let count = 0;

  holidays.forEach((holiday) => {
    //Si el feriado esta entre la fechas y no es sabado ni domingo aumenta el contador
    if (
      moment(holiday).isBetween(startDayMoment, endDayMoment, undefined, "[]") &&
      moment(holiday).day() != 0 &&
      moment(holiday).day() != 6
    )
      count++;
  });

  return count;
};

export default ctrl;
