"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
View_1.default.global('appUrl', (path) => {
    const APP_URL = Env_1.default.get('APP_URL');
    return path ? `${APP_URL}/${path}` : APP_URL;
});
View_1.default.global('webService', (path) => {
    const WEB = Env_1.default.get('WEB_SERVICE');
    return path ? `${WEB}/${path}` : WEB;
});
View_1.default.global('bulans', {
    0: 'Januari',
    1: 'Februari',
    2: 'Maret',
    3: 'April',
    4: 'Mei',
    5: 'Juni',
    6: 'Juli',
    7: 'Agustus',
    8: 'Sebtember',
    9: 'Oktober',
    10: 'November',
    11: 'Desember',
});
View_1.default.global('getAscii', (value) => {
    const ascii = {
        97: 'a',
        98: 'b',
        99: 'c',
        100: 'd',
        101: 'e',
        102: 'f',
        103: 'g',
        104: 'h',
        105: 'i',
        106: 'j',
        107: 'k',
        108: 'l',
        109: 'm',
        110: 'n',
        111: 'o',
        112: 'p',
        113: 'q',
        114: 'r',
        115: 's',
        116: 't',
        117: 'u',
        118: 'v',
        119: 'w',
        120: 'x',
        121: 'y',
        122: 'z',
    };
    return ascii[value];
});
View_1.default.global('haris', {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: "Jum'at",
    6: 'Sabtu',
});
View_1.default.global('getBulan', function (date) {
    const bulan = this.resolve('bulans');
    return bulan[new Date(date).getMonth()];
});
View_1.default.global('getHari', function (date) {
    const hari = this.resolve('haris');
    return hari[new Date(date).getDay()];
});
View_1.default.global('convertTanggal', function (date) {
    const bulan = this.resolve('getBulan');
    const tanggal = new Date(date);
    return tanggal.getDate() + ' ' + bulan(date) + ' ' + tanggal.getFullYear();
});
View_1.default.global('convertTanggalYYYYMMDDWithHyphen', function (date) {
    const tanggal = new Date(date);
    var month = tanggal.getMonth() + 1;
    return tanggal.getFullYear() + '-' + month + '-' + tanggal.getDate();
});
View_1.default.global('convertTanggalDDMMYYYWithSlash', function (date) {
    const tanggal = new Date(date);
    let bulan = tanggal.getMonth();
    bulan = bulan + 1;
    return tanggal.getDate() + '/' + bulan + '/' + tanggal.getFullYear();
});
View_1.default.global('cleanString', function (string) {
    const cleanString = string.replace(/[|&;$%@"<>()+,_-]/g, ' ');
    return cleanString;
});
View_1.default.global('ucFirst', function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
});
View_1.default.global('range', function (start, end) {
    const arr = [];
    if (start > end)
        for (let i = start; i > end; i--)
            arr.push(i);
    else
        for (let i = start; i < end; i++)
            arr.push(i);
    return arr;
});
View_1.default.global('conString', function (value1, value2) {
    return value1 + value2;
});
View_1.default.global('getTitleSasaran', function (sasaran) {
    if (!sasaran)
        return '';
    let tahun = sasaran.toString().substring(0, 4);
    let periode = sasaran.toString().substring(4, 5);
    if (periode === '0')
        return tahun + ' Semua Periode';
    return tahun + ' Periode ' + periode;
});
View_1.default.global('getTimeFormat', function (value) {
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
    console.log(value);
    const waktu = new Date(value);
    const bulan = waktu.getMonth();
    const tahun = waktu.getFullYear();
    const hari = waktu.getDay();
    const date = waktu.getDate();
    const jam = waktu.getHours();
    const menit = waktu.getMinutes();
    return ` ${days[hari]}, ${String(date).padStart(2, '0')} ${months[bulan]} ${tahun}. Pukul ${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')} WIB`;
});
View_1.default.global('getSubTitle', function (value) {
    if (value.search('/d3') !== -1)
        return 'D3';
    if (value.search('/pasca/s2') !== -1)
        return 'Pasca S2';
    if (value.search('/pasca/s3') !== -1)
        return 'Pasca S3';
    if (value.search('/profesi') !== -1)
        return 'Profesi';
    return '';
});
View_1.default.global('getCurrentYear', function () {
    const waktu = new Date();
    return waktu.getFullYear() - 1;
});
View_1.default.global('getJabatan', function (user) {
    const jabatan = user.legacy_role;
    if (jabatan === 1)
        return 'Super Admin';
    if (jabatan === 2)
        return 'Admin';
    if (jabatan === 3)
        return 'Kajur/Kaprodi';
    if (jabatan === 4)
        return 'Enum';
    return '';
});
View_1.default.global('getJabatanRole', function (user) {
    const jabatan = user.legacy_role;
    if (jabatan === 1)
        return 1;
    if (jabatan === 2)
        return 2;
    if (jabatan === 3)
        return 3;
    if (jabatan === 4)
        return 4;
    return 0;
});
View_1.default.global('getPilihanJabatan', function (legacy_role) {
    let jabatan = [
        { id: 3, nama: 'Kajur/Kaprodi' },
        { id: 4, nama: 'Enum' },
    ];
    const superAdmin = { id: 2, nama: 'Admin' };
    if (legacy_role === 1)
        jabatan = [superAdmin, ...jabatan];
    return jabatan;
});
View_1.default.global('getTahun', function (tahun) {
    return tahun.substr(0, 4);
});
View_1.default.global('getPeriodeSasaran', function (daftarSasaran) {
    let choice = [];
    daftarSasaran.forEach((sasaran) => {
        let periodeString = sasaran.tahun.substr(4, 5) === '0' ? 'Semua Periode' : `Periode ${sasaran.tahun.substr(4, 5)}`;
        choice.push({ id: sasaran.tahun.substr(4, 5), nama: periodeString });
    });
    return choice;
});
View_1.default.global('getTimeFormatStep', function (value) {
    if (!value)
        return '';
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
    return ` ${days[hari]}, ${String(date).padStart(2, '0')} ${months[bulan]} ${tahun} <br> ${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')} WIB`;
});
View_1.default.global('getNowYear', function () {
    return new Date().getFullYear();
});
//# sourceMappingURL=hook.js.map