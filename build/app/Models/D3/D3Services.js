"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const D3Sasaran_1 = __importDefault(require("./D3Sasaran"));
const D3Pengumuman_1 = __importDefault(require("./D3Pengumuman"));
const conn = 'cdc_tracerstudy_d3';
const conn_exsurvey = 'cdc_exsurvey';
const jenjang = '0';
class Services extends Orm_1.BaseModel {
    static async get_data_index(tahun, periode, list_kd_fjjp7) {
        let periode_wisuda = tahun.concat(periode);
        if (periode === '0') {
            return await Database_1.default.connection(conn).rawQuery('SELECT' +
                ' lulusan.nama_fakultas, ' +
                ' lulusan.nama_prodi, ' +
                ' COUNT(*) AS jumlah_pendaftar, ' +
                ' COUNT(lulusan.tanggal_isi) AS selesai ' +
                ' FROM ' +
                ' (SELECT ' +
                ' mapping_prodi.tanggal_isi, ' +
                ' f.nama_fakultas AS nama_fakultas, ' +
                ' mapping_prodi.fak, ' +
                ' mapping_prodi.prodi AS nama_prodi, ' +
                ' mapping_prodi.kd_fjjp7, ' +
                ' mapping_prodi.kdbaru ' +
                ' FROM ' +
                ' (SELECT ' +
                ' p.nama_prodi AS prodi, ' +
                ' a.tanggal_isi, ' +
                ' p.kd_fjjp7, ' +
                ' p.kd_fakultas2 AS fak, ' +
                ' IFNULL (map.kd_fjjp7_reg, p.kd_fjjp7) AS kdbaru ' +
                ' FROM ' +
                ' users a ' +
                ' LEFT JOIN users_mapping_kd_fjjp7 map ON SUBSTR(a.nim, 3, 7) = map.kd_fjjp7_non ' +
                ' LEFT JOIN users_kd_fjjp7 p ON p.kd_fjjp7 = IFNULL (map.kd_fjjp7_reg, SUBSTR(a.nim, 3, 7)) ' +
                ' WHERE ' +
                " SUBSTR(a.tahun_lulus, 1, 4) = '" +
                tahun +
                "' " +
                ' ORDER BY p.kd_fjjp7) AS mapping_prodi ' +
                ' LEFT JOIN users_fakultas f ON mapping_prodi.fak = f.kd_fakultas2' +
                ' WHERE ' +
                ' mapping_prodi.kd_fjjp7 IN (' +
                list_kd_fjjp7 +
                ')) AS lulusan ' +
                ' GROUP BY lulusan.nama_prodi ' +
                ' ORDER BY lulusan.fak');
        }
        else {
            return await Database_1.default.connection(conn).rawQuery('SELECT' +
                ' lulusan.nama_fakultas, ' +
                ' lulusan.nama_prodi, ' +
                ' COUNT(*) AS jumlah_pendaftar, ' +
                ' COUNT(lulusan.tanggal_isi) AS selesai ' +
                ' FROM ' +
                ' (SELECT ' +
                ' mapping_prodi.tanggal_isi, ' +
                ' f.nama_fakultas AS nama_fakultas, ' +
                ' mapping_prodi.fak, ' +
                ' mapping_prodi.prodi AS nama_prodi, ' +
                ' mapping_prodi.kd_fjjp7, ' +
                ' mapping_prodi.kdbaru ' +
                ' FROM ' +
                ' (SELECT ' +
                ' p.nama_prodi AS prodi, ' +
                ' a.tanggal_isi, ' +
                ' p.kd_fjjp7, ' +
                ' p.kd_fakultas2 AS fak, ' +
                ' IFNULL (map.kd_fjjp7_reg, p.kd_fjjp7) AS kdbaru ' +
                ' FROM ' +
                ' users a ' +
                ' LEFT JOIN users_mapping_kd_fjjp7 map ON SUBSTR(a.nim, 3, 7) = map.kd_fjjp7_non ' +
                ' LEFT JOIN users_kd_fjjp7 p ON p.kd_fjjp7 = IFNULL (map.kd_fjjp7_reg, SUBSTR(a.nim, 3, 7)) ' +
                ' WHERE ' +
                " SUBSTR(a.tahun_lulus, 1, 5) = '" +
                periode_wisuda +
                "' " +
                ' ORDER BY p.kd_fjjp7) AS mapping_prodi ' +
                ' LEFT JOIN users_fakultas f ON mapping_prodi.fak = f.kd_fakultas2' +
                ' WHERE ' +
                ' mapping_prodi.kd_fjjp7 IN (' +
                list_kd_fjjp7 +
                ')) AS lulusan ' +
                ' GROUP BY lulusan.nama_prodi ' +
                ' ORDER BY lulusan.fak');
        }
    }
    static async get_list_kdfjjp7() {
        return await Database_1.default.connection(conn).from('users_kd_fjjp7').select('kd_fjjp7');
    }
    static async get_fakultas() {
        return await Database_1.default.connection(conn)
            .query()
            .from('users_fakultas')
            .join('users_kd_fjjp7', 'users_fakultas.kd_fakultas2', '=', 'users_kd_fjjp7.kd_fakultas2')
            .groupBy('users_fakultas.kd_fakultas2');
    }
    static async get_prodi(id_fakultas) {
        return await Database_1.default.connection(conn)
            .query()
            .from('users_kd_fjjp7')
            .where('kd_fakultas2', id_fakultas);
    }
    static async get_users_mapping_kd_fjjp7(kd_fjjp7) {
        let arrTracerKdfjjp7 = [];
        const mapping = await Database_1.default.connection(conn)
            .from('users_mapping_kd_fjjp7')
            .where('kd_fjjp7_reg', kd_fjjp7);
        for (let i = 0; i < mapping.length; i++) {
            arrTracerKdfjjp7.push(mapping[i].kd_fjjp7_non);
        }
        return arrTracerKdfjjp7;
    }
    static async get_data_pengisi(periode_wisuda, kd_fjjp7_non) {
        let arrUserMonitoring = [];
        if (periode_wisuda.substring(4, 5) === '0') {
            periode_wisuda = periode_wisuda.substring(0, 4);
            for (let i = 0; i < kd_fjjp7_non.length; i++) {
                const data = await Database_1.default.connection(conn)
                    .from('users_monitoring')
                    .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
                    .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non[i] + "'");
                if (data.length !== null) {
                    arrUserMonitoring.push(...data);
                }
            }
            return arrUserMonitoring;
        }
        else {
            for (let i = 0; i < kd_fjjp7_non.length; i++) {
                const data = await Database_1.default.connection(conn)
                    .from('users_monitoring')
                    .where('periode_wisuda', periode_wisuda)
                    .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7_non[i] + "'");
                if (data.length !== null) {
                    arrUserMonitoring.push(...data);
                }
            }
            return arrUserMonitoring;
        }
    }
    static async update_data_pengisi(nim, hp_valid_1, hp_valid_2, monitoring_1, monitoring_2, monitoring_3) {
        return await Database_1.default.connection(conn)
            .from('users_monitoring')
            .update({
            hp_valid_1,
            hp_valid_2,
            monitoring_1,
            monitoring_2,
            monitoring_3,
        })
            .where('nim', nim);
    }
    static async get_status_monitoring(tahun) {
        return await Database_1.default.connection(conn)
            .query()
            .from('users_monitoring')
            .whereRaw("periode_wisuda like '" + tahun + "%'")
            .first();
    }
    static async get_jawaban_users(periode_wisuda, kd_fjjp7_non, nama_tabel) {
        let arrDatas = [];
        if (periode_wisuda.substring(4, 5) === '0') {
            let tahun_lulus = periode_wisuda.substring(0, 4);
            for (let i = 0; i < kd_fjjp7_non.length; i++) {
                const data = await Database_1.default.connection(conn)
                    .from('users')
                    .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
                    .select(nama_tabel + '.*')
                    .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
                    .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non[i] + "'")
                    .where('users.status_completion', 1);
                if (data.length !== null) {
                    arrDatas.push(...data);
                }
            }
            return arrDatas;
        }
        else {
            for (let i = 0; i < kd_fjjp7_non.length; i++) {
                const data = await Database_1.default.connection(conn)
                    .from('users')
                    .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
                    .select(nama_tabel + '.*')
                    .where('users.tahun_lulus', periode_wisuda)
                    .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7_non[i] + "'")
                    .where('users.status_completion', 1);
                if (data.length !== null) {
                    arrDatas.push(...data);
                }
            }
            return arrDatas;
        }
    }
    static async import_monitoring(tahun) {
        let datas = await Database_1.default.connection(conn_exsurvey)
            .query()
            .from('alumni')
            .select('nim', 'nama_lengkap as nama', 'periode_wisuda', 'hape1 as no_hape_1', 'hape2 as no_hape_2')
            .whereRaw("periode_wisuda like '" + tahun + "%'")
            .whereRaw("SUBSTR(nim,5,1)= '" + jenjang + "'");
        return await Database_1.default.connection(conn).table('users_monitoring').multiInsert(datas);
    }
    static async update_status_monitoring() {
        return await Database_1.default.connection(conn)
            .query()
            .from('sasaran')
            .update({
            status_import_monitoring: 1,
        })
            .where('status_aktif', 1);
    }
    static async get_responden(nim) {
        return await Database_1.default.connection(conn).from('users').where('nim', nim).first();
    }
    static async create_responden(nim, nama_lengkap, tahun_lulus, password_clear, password) {
        await Database_1.default.connection(conn)
            .query()
            .from('users_monitoring')
            .update({
            username: nim,
        })
            .where('nim', nim);
        return await Database_1.default.connection(conn).table('users').insert({
            nim,
            nama_lengkap,
            tahun_lulus,
            password_clear,
            password,
            role: 5,
        });
    }
    static async get_availabe_email(email) {
        return await Database_1.default.connection(conn).from('users').where('email', email).first();
    }
    static async edit_responden(nim, email) {
        return await Database_1.default.connection(conn).from('users').where('nim', nim).update({
            email: email,
        });
    }
    static async get_list_sasaran() {
        return await Database_1.default.connection(conn).from('sasaran');
    }
    static async get_sasaran() {
        return await Database_1.default.connection(conn).from('sasaran').where('status_aktif', 1).first();
    }
    static async cek_sasaran(new_sasaran) {
        let sasaran = new_sasaran.substring(0, 4);
        if (new_sasaran.substring(4, 5) === '0') {
            return await Database_1.default.connection(conn)
                .from('sasaran')
                .whereRaw("tahun like '" + sasaran + "%'")
                .first();
        }
        else {
            let cek_semua_periode = sasaran.concat('0');
            let cek = await Database_1.default.connection(conn)
                .from('sasaran')
                .where('tahun', cek_semua_periode)
                .first();
            if (cek) {
                return true;
            }
            return await Database_1.default.connection(conn).from('sasaran').where('tahun', new_sasaran).first();
        }
    }
    static async get_validasi_nim(nim) {
        return await Database_1.default.connection(conn).from('populasi').where('nim', nim).first();
    }
    static async get_populasi(tahun) {
        return await Database_1.default.connection(conn)
            .from('populasi')
            .whereRaw("periode like '" + tahun + "%' ")
            .first();
    }
    static async insert_populasi(data_populasi) {
        const trx = await Database_1.default.connection(conn).transaction();
        try {
            await trx.insertQuery().table('populasi').insert(data_populasi);
            await trx.commit();
            return true;
        }
        catch (error) {
            console.log(error);
            await trx.rollback();
            return false;
        }
    }
    static async set_sasaran(tahun_periode, status_import) {
        await Database_1.default.connection(conn).from('sasaran').update({ status_aktif: 0 });
        return await Database_1.default.connection(conn).table('sasaran').insert({
            tahun: tahun_periode,
            status_aktif: 1,
            status_import_monitoring: status_import,
        });
    }
    static async get_jadwal() {
        return await Database_1.default.connection(conn).from('sasaran').where('status_aktif', 1).first();
    }
    static async set_jadwal(waktu_mulai, waktu_berakhir) {
        const SearchId = { status_aktif: 1 };
        const Updates = {
            waktu_mulai: waktu_mulai,
            waktu_berakhir: waktu_berakhir,
        };
        return await D3Sasaran_1.default.updateOrCreate(SearchId, Updates);
    }
    static async get_pengumuman() {
        return await Database_1.default.connection(conn).from('pengumuman').first();
    }
    static async update_pengumuman(path_banner, pengumuman, laporan_online, tujuan, target_responden, jadwal, hubungi_kami) {
        const SearchId = { id: 1 };
        const Updates = {
            path_banner: path_banner,
            pengumuman: pengumuman,
            laporan_online: laporan_online,
            tujuan: tujuan,
            target_responden: target_responden,
            jadwal: jadwal,
            hubungi_kami: hubungi_kami,
        };
        return await D3Pengumuman_1.default.updateOrCreate(SearchId, Updates);
    }
}
exports.default = Services;
//# sourceMappingURL=D3Services.js.map