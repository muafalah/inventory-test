# Technical Test

oleh Muhammad Ifa Amrillah

## Teknologi yang Digunakan

<ol>
<li><strong>Next.js</strong></li>

Next.js merupakan framework React yang digunakan untuk membangun aplikasi full-stack. React digunakan dalam pembentukan komponen dan antarmuka pengguna. Sementara itu, Next.js digunakan untuk fitur tambahan dan optimisasi. Selain itu, Next.js menangani konfigurasi tingkat rendah (low-level), sehingga aplikasi dapat dikembangkan dan dideploy dengan cepat. Meskipun Next.js digunakan untuk membangun aplikasi full-stack, framework ini sering digunakan juga untuk mengembangkan frontend aplikasi.

Berikut adalah struktur direktori yang digunakan dalam project ini:

```
.
├── public/
└── src/
    ├── app/
    ├── components/
    ├── hooks/
    ├── lib/
        ├── schemas/
        ├── services/
    ├── providers/
    └── middleware.ts
```

Penjelasan masing-masing folder sebagai berikut.

<ul>
    <li> `public/`: Folder yang berisi aset-aset statis seperti gambar, favicon, dan svg.</li>
    <li> `src/`: Folder utama berisi source code aplikasi.</li>
    <ul>
        <li>`app/`: Folder utama dalam routing dan rendering halaman dalam App Router Next.js, yang berisi layout, halaman (`page.tsx`), route groups, dan komponennya.</li>
        <li>`app/`: Folder yang berfungsi untuk menyimpan komponen yang dapat digunakan kembali (reusable).</li>
        <li>`lib/`: Folder yang berisi fungsi pembantu (_helper functions_) seperti utilitas, config, dll.</li>
        <li>`schemas/`: Folder yang berisi definisi skema yang digunakan dalam validasi data</li>
        <li>`services/`: Folder yang berisi daftar endpoint & key yang digunakan untuk berkomunikasi dengan service eksternal.</li>
        <li>`providers/`: Folder yang berisi abstraksi layanan atau wrapper untuk dependency eksternal.</li>
        <li>`middleware.ts`: File yang berisi middleware untuk menangani intercept request. Digunakan dalam rerouting pengguna ketika mengakses bagian website yang tidak diperbolehkan. Misalnya, pengguna yang belum login mengakses homepage.</li>
    </ul>
</ul>

<li><strong>Tailwind CSS</strong></li>

Tailwind CSS adalah framework CSS utility-first yang memudahkan proses styling komponen antarmuka pengguna secara efisien dan konsisten. Pendekatan utility-first memungkinkan pengembangan yang cepat menggunakan kelas-kelas yang siap dipakai langsung dalam source code React. Selain itu, kelas-kelas ini menghasilkan penggunaan elemen desain yang konsisten.

<li><strong>TypeScript</strong></li>

TypeScript adalah bahasa pemrograman yang merupakan dibangun di atas JavaScript dan menambahkan fitur static typing. Dengan TypeScript, kita dapat menentukan tipe data pada variabel, parameter, dan hasil fungsi, sehingga dapat mengurangi potensi bug akibat kesalahan tipe data sejak proses pengembangan.

<li><strong>Zod</strong></li>

Zod adalah library validasi skema TypeScript yang digunakan untuk memastikan data yang diterima sesuai dengan struktur dan tipe yang diharapkan. Alur penggunaan mulai dari mendefinisikan skema data, lalu melakukan validasi input dari form, yang dilakukan secara otomatis. Jika data tidak sesuai skema, Zod akan mengembalikan error sesuai kesalahan pada data input.

<li><strong>React Hook Form</strong></li>

React Hook Form adalah library manajemen form untuk React yang ringan dan efisien. Dengan memanfaatkan hook dari React, library ini memungkinkan pembuatan form yang responsif dan mudah divalidasi. Integrasi dengan library validasi seperti Zod juga sangat mudah, sehingga proses validasi dapat dilakukan secara otomatis dan deklaratif.

<li><strong>TanStack React Query</strong></li> 
TanStack React Query adalah library manajemen data asynchronous di React, seperti fetching, caching, syncing, dan updating data dari server. Library ini memudahkan penanganan status data seperti loading, error, dan success, serta meningkatkan performa aplikasi dengan caching dan re-fetching otomatis.

<li><strong>shadcn/ui</strong></li>

Shadcn/ui adalah kumpulan komponen UI berbasis Tailwind CSS yang dirancang agar dapat dikustomisasi dengan mudah. Komponen-komponen ini dibangun menggunakan Radix UI dan ditujukan untuk memberikan fleksibilitas tinggi, sehingga developer dapat membuat antarmuka pengguna yang konsisten, responsif, dan dapat diatur sesuai kebutuhan desain aplikasi.

</ol>

## Langkah Instalasi dan Penjalanan

Berikut adalah langkah-langkah untuk instalasi dan menjalankan project.

<ol>

<li>Instal Node.js versi terbaru</li>

Node.js dapat diinstal melalui laman [https://nodejs.org/en/download](https://nodejs.org/en/download)

<li>Clone repository ke dalam perangkat Anda.</li>

```console
$ git clone https://github.com/muafalah/inventory-test.git
```

<li> Buka folder project di terminal </li>

```console
$ cd inventory-test
```

<li> Install dependency yang dibutuhkan oleh aplikasi </li>

```console
$ npm install
```

<li>Salin file konfigurasi environment: Salin file <code>.env.example</code> dan ubah namanya menjadi <code>.env</code> </li>

```console
$ cp .env.example .env
```

<li> Build project </li>

```console
$ npm run build
```

<li> Jalankan aplikasi </li>

```console
$ npm run start
```

<li> Buka aplikasi di browser </li>

Aplikasi bisa diakses di [http://localhost:3000](http://localhost:3000)

</ol>
