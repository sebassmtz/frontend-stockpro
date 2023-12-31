"use client";
import { ReactNode, useMemo, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./style.module.scss";
import SideBar from "@/components/SideBar/SideBar";
import { menuData } from "@/helpers/HeaderCashier";
import { ModalContext } from "@/context/ModalContext";
import { CashRegisterContext } from "@/context/CashRegisterContext";
import { Product } from "@/interfaces/Product";
import { CashRegister } from "@/interfaces/CashRegister";
import { Sale, ProductDetailSale} from "@/interfaces/Sale";
import { ProductContext } from "@/context/ProductContext";
import { SaleContext } from "@/context/SaleContext";
import DetailsProductDialog from "./products/Dialogs/DetailsProduct/DetailsProductDialog";
import OpenTurn from "./OpenTurn";
import CloseTurn from "./logoutCashier/CloseTurn";
import CreateWithdrawl from "./withdrawl/CreateWithdrawl";
import ModalBase from "@/app/components/Modal/Modal";
import { Client } from "@/interfaces/Client";
import { ClientContext } from "@/context/ClientContext";

const NavBarData = {
  logoHref: "/cashier",
  settingsHref: "/cashier/settings",
  notificationsHref: "/cashier",
};


interface Props {
  children: ReactNode | ReactNode[];
}

function CashierLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[] | undefined>([]);

  const [selectedSale, setSelectedSale] = useState<Sale>();
  const [sales, setSales] = useState<Sale[] | undefined>([]);

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clients, setClients] = useState<Client[] | undefined>([]);

  const [productsSale, setProductsSale] = useState<ProductDetailSale[] | undefined>([]);
  const [selectProductSale, setSelectProductSale] = useState<ProductDetailSale | undefined>();

  const [selectedCashRegister, setSelectedCashRegister] = useState<CashRegister>();
  const [cashRegisters, setCashRegisters] = useState<CashRegister[] | undefined>([]);

  const modalContext = useMemo(
      () => ({
        open,
        setOpen,
        id,
        setId,
      }),
      [open, id]
  );
  const productContext = useMemo(
      () => ({
        selectedProduct,
        setSelectedProduct,
        products,
        setProducts,
      }),
      [selectedProduct, products]
  );

  const clientContext = useMemo(
        () => ({
            selectedClient,
            setSelectedClient,
            clients,
            setClients,
        }),
        [selectedClient, clients]
  );
  const cashRegisterContext = useMemo(
      () => ({
          selectedCashRegister,
          setSelectedCashRegister,
          cashRegisters,
          setCashRegisters,
      }),
      [selectedCashRegister, cashRegisters]
    );

    const saleContext = useMemo(
        () => ({
            selectedSale,
            setSelectedSale,
            sales,
            setSales,
            productsSale,
            setProductsSale,
            selectProductSale,
            setSelectProductSale,
        }),
        [selectedSale, sales, productsSale, selectProductSale]
    );

  function SelectModal() {
    switch (id) {
      case "detailsProduct":
        return <DetailsProductDialog />;
        case "closeTurn":
            return <CloseTurn />;
        case "openTurn":
            return <OpenTurn />;
        case "addWithdrawl":
            return <CreateWithdrawl />;
      default:
        break;
    }
  }

  return (
    <div className={styles.main}>
      <NavBar {...NavBarData} />
      <div className={styles.container}>
        <div className={styles.menuContainer}>
          <SideBar {...menuData} />
        </div>
          <div className={styles.contentContainer}>
            <ProductContext.Provider value={productContext}>
                <ClientContext.Provider value={clientContext}>
                    <CashRegisterContext.Provider value={cashRegisterContext}>
                        <SaleContext.Provider value={saleContext}>
                            <ModalContext.Provider value={modalContext}>
                                <ModalBase isOpen={open} id={id}>
                                    {SelectModal()}
                                </ModalBase>
                                <main className={styles.layout__main}>{children}</main>
                            </ModalContext.Provider>
                        </SaleContext.Provider>
                    </CashRegisterContext.Provider>
                </ClientContext.Provider>
            </ProductContext.Provider>
          </div>
      </div>
    </div>
  );
}

export default CashierLayout;