import { z } from "zod";

export const createBahanBakuSchma = z.object({
  nama_bahan: z.string().min(3),
  harga_bahan: z.string().min(1),
  stok_bahan: z.string().min(1),
  satuan: z.string().min(1),
});

export const createPenitipSchema = z.object({
  nama_penitip: z.string().min(3),
  email_penitip: z.string().email(),
  no_telp_penitip: z.string().min(10).max(14),
  alamat_penitip: z.string().min(10),
});

export const createPengeluaranLainSchema = z.object({
  nama_pengeluaran: z.string().min(3),
  biaya_pengeluaran: z.string().min(1),
  tanggal_pengeluaran: z.date(),
});

export const createProdukSchema = z.object({
  nama_produk: z.string().min(1, {
    message: "Nama Produk harus diisi!"
  }),
  harga_produk: z.number().min(1, {
    message: "Harga Produk harus diisi!"
  }),
  deskripsi_produk: z.string().min(1, {
    message: "Deskripsi Produk harus diisi!"
  }),
  stok: z.number().optional(),
  loyang: z.string().optional(),
  status_produk: z.string().min(1, {
    message: "Status Produk harus dipilih!"
  }),
  jenis_makanan: z.string().min(1, {
    message: "Jenis Makanan harus dipilih!"
  }),
  jenis_produk: z.string().min(1, {
    message: "Jenis Produk harus dipilih!"
  })
}).refine(
  (data) => {
    if(data.jenis_produk === "Titipan"){
      return data.stok !== undefined && data.stok > 0;
    }

    return true;
  },
  {
    message: "Stok harus harus diisi jika produk titipan!",
    path: ["stok"],
  }
).refine(
  (data) => {
    if (data.jenis_makanan === "Cake") {
      // If jenis_produk is "Pre Order", then loyang must be non-empty
      return data.loyang && data.loyang.trim().length > 0;
    }
    return true;
  },
  {
    message: "Loyang harus diisi jika jenis makanan Cake!",
    path: ["loyang"],
  }
);

export const editKuotaHarianSchema = z.object({
  kuota: z.number().min(0, {
    message: "Kuota Harus Diisi!"
  }),
  keterangan: z.string().optional()
})


export const createEditHampersSchema = z.object({
  nama_hampers: z.string().min(1, {
    message: "Nama Hampers harus diisi!"
  }),
  deskripsi_hampers: z.string().min(1, {
    message: "Deskripsi Hampers harus diisi!"
  })
})