import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import styles from "./styles.module.css";

interface Props {
  items: any;
}

function Card(props: Props) {
  const { items } = props;

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = items.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
    <div className={styles.cards}>
      {
       currentItems.map((item: any) => {
         return (
            <div className={styles.productCard} key={item.id} >
              <h2 >Hola</h2>
              <img src={item.url} alt={item.title} />
            </div>
         );
        })
      }
    </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.page_num}
        previousClassName={styles.page_num}
        nextClassName={styles.page_num}
        activeClassName={styles.active}
      />
    </>
  );
}

export default Card;