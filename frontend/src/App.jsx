import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "../src/form/login";
import Logout from "../src/form/logout";
//admin
import AdminDashboard from "../src/form/admin/dashboard";
//bahanbaku
import IndexBahanBaku from "../src/form/admin/bahan_baku/indexBahanBaku";
import CreateBahanBaku from "../src/form/admin/bahan_baku/createBahanBaku";
import DeleteBahanBaku from "../src/form/admin/bahan_baku/deleteBahanBaku";
import EditBahanBaku from "../src/form/admin/bahan_baku/editBahanBaku";
//produksi
import IndexProduksi from "./form/admin/produksi/indexProduksi";
import CreateProduksi from "./form/admin/produksi/createProduksi";
import DeleteProduksi from "./form/admin/produksi/deleteProduksi";
import EditProduksi from "./form/admin/produksi/editProduksi";
//customer
import IndexCustomer from "./form/admin/customer/indexCustomer";
import CreateCustomer from "./form/admin/customer/createCustomer";
import DeleteCustomer from "./form/admin/customer/deleteCustomer";
import EditCustomer from "./form/admin/customer/editCustomer";
//supplier
import IndexSupplier from "./form/admin/supplier/indexSupplier";
import CreateSupplier from "./form/admin/supplier/createSupplier";
import DeleteSupplier from "./form/admin/supplier/deleteSupplier";
import EditSupplier from "./form/admin/supplier/editSupplier";
//eoq
import IndexEOQ from "./form/admin/hitung_eoq/indexEOQ";
import CreateEOQ from "./form/admin/hitung_eoq/createEOQ";
import DeleteEOQ from "./form/admin/hitung_eoq/deleteEOQ";
import EditEOQ from "./form/admin/hitung_eoq/editEOQ";
//jit
import IndexJIT from "./form/admin/jit/indexJIT";
import CreateJIT from "./form/admin/jit/createJIT";
import DeleteJIT from "./form/admin/jit/deleteJIT";
import EditJIT from "./form/admin/jit/editJIT";
//pembelian
import IndexPembelian from "./form/admin/pembelian/indexPembelian";
import DetailPembelian from "./form/admin/pembelian/detailPembelian";
import StatusPembelian from "./form/admin/pembelian/statusPembelian";
import CreatePembelian from "./form/admin/pembelian/createPembelian";
import DeletePembelian from "./form/admin/pembelian/deletePembelian";

import SupervisorDashboard from "../src/form/supervisor/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bahan-baku" element={<IndexBahanBaku />} />
        <Route path="/admin/bahan-baku/tambah" element={<CreateBahanBaku />} />
        <Route path="/admin/bahan-baku/edit/:kode_bahan_baku" element={<EditBahanBaku />}/>
        <Route path="/admin/bahan-baku/delete/:kode_bahan_baku" element={<DeleteBahanBaku />}/>

        <Route path="/admin/produksi" element={<IndexProduksi />} />
        <Route path="/admin/produksi/tambah" element={<CreateProduksi />} />
        <Route path="/admin/produksi/edit/:kode_produksi" element={<EditProduksi />}/>
        <Route path="/admin/produksi/delete/:kode_produksi" element={<DeleteProduksi />}/>

        <Route path="/admin/customer" element={<IndexCustomer />} />
        <Route path="/admin/customer/tambah" element={<CreateCustomer />} />
        <Route path="/admin/customer/edit/:kode" element={<EditCustomer />}/>
        <Route path="/admin/customer/delete/:kode" element={<DeleteCustomer />}/>

        <Route path="/admin/supplier" element={<IndexSupplier />} />
        <Route path="/admin/supplier/tambah" element={<CreateSupplier />} />
        <Route path="/admin/supplier/edit/:kode" element={<EditSupplier />}/>
        <Route path="/admin/supplier/delete/:kode" element={<DeleteSupplier />}/>

        <Route path="/admin/economic-order-quantity" element={<IndexEOQ />} />
        <Route path="/admin/economic-order-quantity/tambah" element={<CreateEOQ />} />
        <Route path="/admin/economic-order-quantity/edit/:id" element={<EditEOQ />}/>
        <Route path="/admin/economic-order-quantity/delete/:id" element={<DeleteEOQ />}/>

        <Route path="/admin/just-in-time" element={<IndexJIT />} />
        <Route path="/admin/just-in-time/tambah" element={<CreateJIT />} />
        <Route path="/admin/just-in-time/edit/:id" element={<EditJIT />}/>
        <Route path="/admin/just-in-time/delete/:id" element={<DeleteJIT />}/>

        <Route path="/admin/pembelian" element={<IndexPembelian />} />
        <Route path="/admin/pembelian/detail-pembelian/:no_pembelian" element={<DetailPembelian />} />
        <Route path="/admin/pembelian/status-pembelian/:no_pembelian" element={<StatusPembelian />} />
        <Route path="/admin/pembelian/tambah" element={<CreatePembelian />} />
        <Route path="/admin/pembelian/delete/:no_pembelian" element={<DeletePembelian />}/>


        <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
