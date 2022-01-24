import moment from "moment"
import 'moment/locale/es'


export const momentConfEs = () => moment.updateLocale('es', {
    weekdaysShort: [
        "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb",
    ],

    months: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
})

