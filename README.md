## Oto Klix test

project ini menggunakan React SSR

#### Instalasi

copy file .env.example dan ubah namanya menjadi .env, lalu:

```sh
npm install
```

### Test

cara menjalankan unit test:

```sh
npm run test
```

#### Untuk Development

```sh
npm run dev
```

Dalam proses ini akan ada error, itu dikarenakan file dist/server.js belum ada, file tersebut akan dibuat secara otomatis. Proses pada terminal akan terlihat seperti berikut:

![Alt Text](https://github.com/ybasori/otoklix_test/raw/master/20220311_004456.gif)

Kemudian aplikasi bisa dibuka di browser dengan url http://localhost:3000

#### Untuk Production

Pertama,

```sh
npm run build
```

Lalu,

```sh
npm run start
```
