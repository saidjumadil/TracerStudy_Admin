# Tracer Study Admin

ini merupakan projek dari Tracer Study yang mengelola sistem bagian Admin

## How To Run

```
  $ yarn install
  $ yarn run dev
```

## Config Prettier in Vscode

```
 $ yarn run lint
 $ yarn run format
```

## Deploy Server
1. Build Adonis dan install
```
  $ yarn build
  $ cd build
  $ yarn install --production
```
2. Copy folder `ssl_certificate` dan file `.env.example` ke dalam folder `build`
3. Rename file `.env.example` di folder `build` menjadi `.env`
4. Extract zip semua isi folder `build` menjadi `build_admin.zip`. 
#### Note: Isi folder `build` yang diextract bukan folder `build`

## Laporan ke Pak Kurnia
Kirim `build_admin.zip` dan mengingatkan untuk melakukan `yarn install --production` di server.
## Source

- [Adonis 5](https://adonisjs.com/)
- [Yarn](https://yarnpkg.com/)
