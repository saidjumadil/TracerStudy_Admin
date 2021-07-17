"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.formatFileExcel = void 0;
const formatFileExcel = (tahun, periode, jenjang, prodi) => {
    return `hasil_ts_${tahun}_${periode === '0' ? 'SemuaPeriode' : 'Periode' + periode}_${prodi.replace(' ', '_')}_(${jenjang.toUpperCase()}).xlsx`;
};
exports.formatFileExcel = formatFileExcel;
const formatDate = (value) => {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };
    const days = {
        0: 'Minggu',
        1: 'Senin',
        2: 'Selasa',
        3: 'Rabu',
        4: 'Kamis',
        5: "Jum'at",
        6: 'Sabtu',
    };
    const waktu = new Date(value);
    const bulan = waktu.getMonth();
    const tahun = waktu.getFullYear();
    const hari = waktu.getDay();
    const date = waktu.getDate();
    const jam = waktu.getHours();
    const menit = waktu.getMinutes();
    return ` ${days[hari]}, ${String(date).padStart(2, '0')} ${months[bulan]} ${tahun}. Pukul ${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')} WIB`;
};
exports.formatDate = formatDate;
//# sourceMappingURL=Format.js.map