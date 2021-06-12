/* eslint-disable @typescript-eslint/naming-convention */ /* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import Sasaran from './D3Sasaran' // sesuaikan
import Pengumuman from './D3Pengumuman' //sesuaikan

const conn: string = 'cdc_tracerstudy_d3' // sesuaikan
const conn_exsurvey: string = 'cdc_exsurvey' // sesuaikan

export default class Services extends BaseModel {
  /* mengambil daftar fakultas */
  public static async get_fakultas() {
    return await Database.connection(conn).query().from('users_fakultas')
  }

  /* mengambil daftar prodi */
  public static async get_prodi(id_fakultas) {
    return await Database.connection(conn)
      .query()
      .from('users_kd_fjjp7')
      .where('kd_fakultas2', id_fakultas)
  }

  /* get data pengisi dari tabel monitoring */
  public static async get_data_pengisi(periode_wisuda: string, kd_fjjp7: string) {
    if (periode_wisuda.substring(4, 5) === '0') {
      periode_wisuda = periode_wisuda.substring(0, 4)
      return await Database.connection(conn)
        .query()
        .from('users_monitoring')
        .whereRaw("periode_wisuda like '" + periode_wisuda + "%'")
        // substring 3 karena substring index di mysql dimulai dari 1
        .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7 + "'")
    } else {
      return await Database.connection(conn)
        .query()
        .from('users_monitoring')
        .where('periode_wisuda', periode_wisuda)
        .whereRaw("SUBSTR(nim,3,7)= '" + kd_fjjp7 + "'")
    }
  }

  /* edit data pengisi dari table monitoring */
  public static async update_data_pengisi(
    nim: string,
    hp_valid_1: number,
    hp_valid_2: number,
    monitoring_1: any,
    monitoring_2: any,
    monitoring_3: any
  ) {
    return await Database.connection(conn)
      .from('users_monitoring')
      .update({
        hp_valid_1,
        hp_valid_2,
        monitoring_1,
        monitoring_2,
        monitoring_3,
      })
      .where('nim', nim)
  }

  /* mengambil informasi status import monitoring, jika data sudah pernah import ada maka tidak dizinkan lagi import */
  public static async get_status_monitoring(tahun: string) {
    return await Database.connection(conn)
      .query()
      .from('users_monitoring')
      .whereRaw("periode_wisuda like '" + tahun + "%'")
      .first()
  }
  //vesri lama
  //ambil informasi status import monitoring
  // public static async get_status_monitoring(tahun: string, periode: string){
  //   let periode_wisuda = tahun.concat(periode)
  //   if(periode==="0"){
  //     return await Database.connection(conn)
  //     .query()
  //     .from('users_monitoring')
  //     .whereRaw("periode_wisuda like '" + tahun + "%'")
  //     .first()
  //   }else{
  //     return await Database.connection(conn)
  //     .query()
  //     .from('users_monitoring')
  //     .where("periode_wisuda", periode_wisuda )
  //     .first()
  //   }
  // }

  /* get data jawaban kuesioner untuk export ke excel */
  public static async get_jawaban_users(tahun: string, kd_fjjp7: string, nama_tabel: string) {
    if (tahun.substring(4, 5) === '0') {
      let tahun_lulus = tahun.substring(0, 4)
      console.log(tahun_lulus)
      return await Database.connection(conn)
        .from('users')
        .join(nama_tabel, 'users.nim', '=', nama_tabel.concat('.nim'))
        .select('jawaban_pendahuluan.*')
        .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7 + "'")
        .whereRaw("users.tahun_lulus like '" + tahun_lulus + "%'")
      // .whereNotNull('users.tanggal_isi')
    } else {
      return await Database.connection(conn)
        .from('users')
        .join('jawaban_pendahuluan', 'users.nim', '=', 'jawaban_pendahuluan.nim')
        .select('jawaban_pendahuluan.*')
        .whereRaw("SUBSTR(users.nim,3,7)= '" + kd_fjjp7 + "'")
        .where('users.tahun_lulus', tahun)
      //.whereNotNull('users.tanggal_isi')
    }
  }

  /* get data jawaban kuliah sql dari punya TS S1 untuk export ke excel */
  // public static async get_jawaban_kuliah(tahun: string, kd_fjjp7: string){
  //   if(tahun.substring(4,5)==="0"){
  //     return await Database.connection(conn).raw("SELECT concat(substr(jk.nim,1,9),'xxxx') as nim, jk.masa_studi as 'B1', jk.telat_keuangan as 'B2.1', jk.telat_mengulang as 'B2.2', jk.telat_skripsi as 'B2.3', jk.telat_keluarga as 'B2.4', jk.telat_kesehatan as 'B2.5', jk.telat_sarana as 'B2.6', jk.telat_pelayanan as 'B2.7',"+
  //     "jk.pelaksanaan_perkuliahan as 'B3.1', jk.pelaksanaan_perwalian as 'B3.2', jk.pelaksanaan_bimbingan_skripsi as 'B3.3', jk.pelaksanaan_interaksi as 'B3.4', jk.pelaksanaan_kegiatan_ilmiah as 'B3.5', jk.pelaksanaan_terlibat_organisasi as 'B3.6', jk.pelaksanaan_kegiatan_ekstrakurikuler as 'B3.7', jk.pelaksanaan_perkenalan_wirausaha as 'B3.8', jk.pelaksanaan_dunia_kerja as 'B3.9',"+
  //     "jk.kualitas_perkuliahan as 'B4.1', jk.kualitas_diskusi as 'B4.2', jk.kualitas_praktikum as 'B4.3', jk.kualitas_praktik_lapangan as 'B4.4', jk.kualitas_tugas as 'B4.5', jk.kualitas_magang as 'B4.6', "+
  //     "jk.magang_relevan as 'B5.1', jk.magang_memadai as 'B5.2', jk.magang_kompetensi as 'B5.3', jk.magang_wawasan as 'B5.4', jk.magang_kesempatan_kerja as 'B5.5',"+
  //     "jk.fasilitas_perpustakaan as 'B6.1', jk.fasilitas_internet as 'B6.2', jk.fasilitas_ruangan as 'B6.3', jk.fasilitas_laboratorium as 'B6.4', jk.fasilitas_kantin as 'B6.5', jk.fasilitas_pusat_kegiatan as 'B6.6', jk.fasilitas_kesehatan as 'B6.7', jk.fasilitas_olahraga as 'B6.8', jk.fasilitas_ibadah as 'B6.9', jk.fasilitas_parkir as 'B6.10',"+
  //     "jk.peran_bidang_ilmu as 'B7.1', jk.peran_bahasa_asing as 'B7.2', jk.peran_komputer as 'B7.3', jk.peran_berpikir_kritis as 'B7.4', jk.peran_komunikasi as 'B7.5', jk.peran_bekerja_mandiri as 'B7.6', jk.peran_bekerja_tim as 'B7.7', jk.peran_bekerja_tekanan as 'B7.8', jk.peran_sikap_kerja as 'B7.9', jk.peran_adaptasi as 'B7.10', jk.peran_kepemimpinan as 'B7.11', jk.peran_kemauan_belajar as 'B7.12',"+
  //     "jk.kebutuhan_bidang_ilmu as 'B8.1', jk.kebutuhan_bahasa_asing as 'B8.2', jk.kebutuhan_komputer as 'B8.3', jk.kebutuhan_berpikir_kritis as 'B8.4', jk.kebutuhan_komunikasi as 'B8.5', jk.kebutuhan_bekerja_mandiri as 'B8.6', jk.kebutuhan_bekerja_tim as 'B8.7', jk.kebutuhan_bekerja_tekanan as 'B8.8', jk.kebutuhan_sikap_kerja as 'B8.9', jk.kebutuhan_adaptasi as 'B8.10', jk.kebutuhan_kepemimpinan as 'B8.11', jk.kebutuhan_kemauan_belajar as 'B8.12',"+
  //     "jk.anggota_organisasi as 'B9', jk.keaktifan_organisasi as 'B10', jk.ikut_kursus as 'B11', jk.jenis_kursus as 'B12', jk.pelatihan_cdc as 'B13', jk.pelatihan_mulai_bekerja as 'B14.1', jk.pelatihan_persyaratan_bekerja as 'B14.2', jk.pelatihan_wirausaha as 'B14.3', jk.pelatihan_pengembangan_diri as 'B14.4', jk.pelatihan_karir as 'B14.5'"+
  //   "FROM (SELECT mapping_prodi.nim as nim, mapping_prodi.prodi as prodi, mapping_prodi.fak as kd_fak, mapping_prodi.kdbaru as kd_prodi from "+
  //     "(SELECT a.nim as nim, p.nama_prodi as prodi, p.kd_fjjp7, p.kd_fakultas2 as fak, IFNULL(map.kd_fjjp7_reg,p.kd_fjjp7) as kdbaru"+
  //      "FROM users a"+
  //       "LEFT JOIN users_mapping_kd_fjjp7 map ON SUBSTR(a.nim,3,7)=map.kd_fjjp7_non"+
  //       "LEFT JOIN users_kd_fjjp7 p ON p.kd_fjjp7=IFNULL(map.kd_fjjp7_reg,SUBSTR(a.nim,3,7)) "+
  //       "ORDER BY p.kd_fjjp7) AS mapping_prodi "+
  //     "WHERE mapping_prodi.kd_fjjp7 NOT IN ('01','masukan daftar kd_fjjp7 yg tdk termasuk')"+
  //   ") as l, users u, jawaban_pendahuluan AS jp, jawaban_kuliah as jk "+
  //   "Where l.nim=jp.nim "+
  //     "and l.nim=jk.nim"+
  //     "and l.nim=u.nim"+
  //     "and SUBSTR(jp.periode_wisuda,1,4)='"+tahun+"'"+
  //     "and u.tanggal_isi is not null"+
  //     "and l.kd_prodi='"+kd_fjjp7+"'")
  //   }else{

  //   }

  // }

  /* untuk memasukan data dari alumni pada database exit survei ke table users_monitoring */
  public static async import_monitoring(tahun: string) {
    let datas = await Database.connection(conn_exsurvey)
      .query()
      .from('alumni')
      .select(
        'nim',
        'nama_lengkap as nama',
        'periode_wisuda',
        'hape1 as no_hape_1',
        'hape2 as no_hape_2'
      )
      .whereRaw("periode_wisuda like '" + tahun + "%'")
      .whereRaw("SUBSTR(nim,5,1)= '0'") //sesuaikan dengan fjjp7
    //hasil datas ke users_monitoring
    return await Database.connection(conn).table('users_monitoring').multiInsert(datas)
  }
  //versi lama
  //insert data monitoring
  // public static async insert_monitoring(tahun: string, periode: string) {
  //   let periode_wisuda = tahun.concat(periode)
  //   let datas
  //   if(periode==="0"){
  //     datas = await Database.connection(conn_exsurvey)
  //     .query()
  //     .from('alumni')
  //     .select(
  //       'nim',
  //       'nama_lengkap as nama',
  //       'periode_wisuda',
  //       'hape1 as no_hape_1',
  //       'hape2 as no_hape_2'
  //     )
  //     .whereRaw("periode_wisuda like '" + tahun + "%'")
  //     .whereRaw("SUBSTR(nim,5,1)= '0'") //sesuaikan dengan fjjp7
  //   }else{
  //     datas = await Database.connection(conn_exsurvey)
  //       .query()
  //       .from('alumni')
  //       .select(
  //         'nim',
  //         'nama_lengkap as nama',
  //         'periode_wisuda',
  //         'hape1 as no_hape_1',
  //         'hape2 as no_hape_2'
  //       )
  //       .where('periode_wisuda', periode_wisuda)
  //       .whereRaw("substr(nim,5,1)= '0'") //sesuaikan dengan fjjp7
  //   }
  //   //hasil datas ke users_monitoring
  //   return await Database.connection(conn).table('users_monitoring').multiInsert(datas)
  // }

  /* update status monitoring pada table sasaran */
  public static async update_status_monitoring() {
    return await Database.connection(conn)
      .query()
      .from('sasaran')
      .update({
        status_import_monitoring: 1,
      })
      .where('status_aktif', 1)
  }

  /* mengambil data dari table sasaran yang sedang aktif */
  public static async get_sasaran() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
  }

  /* mengambil informasi apakah sasaran sudah pernah di buat pada tracer study sebelumnya */
  public static async cek_sasaran(new_sasaran: string) {
    //return true = sasaran sudah pernah dibuat maka tidak diizinkan ubah sasaran
    let sasaran: string = new_sasaran.substring(0, 4)
    if (new_sasaran.substring(4, 5) === '0') {
      return await Database.connection(conn)
        .from('sasaran')
        .whereRaw("tahun like '" + sasaran + "%'")
        .first()
    } else {
      //cek sudah pernah di tracer secara semua periode
      let cek_semua_periode: string = sasaran.concat('0')
      let cek = await Database.connection(conn)
        .from('sasaran')
        .where('tahun', cek_semua_periode)
        .first()
      //jika sudah pernah diset sasaran semua periode maka opsi set perperiode tidak boleh lagi
      if (cek) {
        return true
      }
      //jika belum pernah diset sasaran semua periode maka opsi set perperiode dizinkan
      return await Database.connection(conn).from('sasaran').where('tahun', new_sasaran).first()
    }
  }

  /* ambil informasi apakah populasi sudah pernah diinsert ke database */
  public static async get_populasi(tahun) {
    return await Database.connection(conn)
      .from('populasi')
      .whereRaw("periode like '" + tahun + "%' ")
      .first()
  }

  /* insert data populasi dari webservice ke database */
  public static async insert_populasi(data_populasi) {
    const trx = await Database.connection(conn).transaction()
    try {
      await trx.insertQuery().table('populasi').insert(data_populasi)

      await trx.commit()

      return true
    } catch (error) {
      console.log(error)
      await trx.rollback()
      return false
    }
  }

  /* mengubah sasaran tracer study */
  public static async set_sasaran(tahun_periode: string, status_import: number) {
    //set semua status_aktif jadi 0
    await Database.connection(conn).from('sasaran').update({ status_aktif: 0 })

    return await Database.connection(conn).table('sasaran').insert({
      tahun: tahun_periode,
      status_aktif: 1,
      status_import_monitoring: status_import,
    })
  }

  /* mengambil jadwal tracer study yg sedang aktif */
  public static async get_jadwal() {
    return await Database.connection(conn).from('sasaran').where('status_aktif', 1).first()
  }

  /* mengubah jadwal tracer study yg sedang aktif */
  public static async set_jadwal(waktu_mulai: Date, waktu_berakhir: Date) {
    const SearchId = { status_aktif: 1 }

    const Updates = {
      waktu_mulai: waktu_mulai,
      waktu_berakhir: waktu_berakhir,
    }
    return await Sasaran.updateOrCreate(SearchId, Updates)
  }

  /* mengambil data pengumuman */
  public static async get_pengumuman() {
    return await Database.connection(conn).from('pengumuman').first()
  }

  /* memperbarui data pengumuman */
  public static async update_pengumuman(
    path_banner: string,
    pengumuman: string,
    laporan_online: string,
    tujuan: string,
    target_responden: string,
    jadwal: string,
    hubungi_kami: string
  ) {
    const SearchId = { id: 1 }
    const Updates = {
      path_banner: path_banner,
      pengumuman: pengumuman,
      laporan_online: laporan_online,
      tujuan: tujuan,
      target_responden: target_responden,
      jadwal: jadwal,
      hubungi_kami: hubungi_kami,
    }
    return await Pengumuman.updateOrCreate(SearchId, Updates)
  }
}
