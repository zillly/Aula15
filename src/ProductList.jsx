import style from "./ProductList.module.css";
import { useEffect } from "react";
import axios from "axios";

function ProductList({ productList, productsIsLoading, getProducts }) {

    async function deleteProduct(productId) {
        try {
          await axios.delete(`api/products/${productId}`);
          getProducts; // Atualiza a lista de produtos após a exclusão
        } catch (error) {
          alert(`Ocorreu um erro ao excluir o produto - Erro: ${error}`);
        }
      }
      

    useEffect(
        () => {
            console.log("<ProductList /> Foi Montado");
        }, []
    )
    return (
        <>
            {
                !productsIsLoading ?
                    productList.length > 0 ?
                        productList.map(product => {
                            return (
                                <div
                                    className={style.div}
                                    key={product.id}
                                >
                                    <div className={style.title}>{product.title}</div>
                                    <div className={style.description}>{product.description}</div>
                                    <div className={style.details}>Preço: {product.price}</div>
                                    <div className={style.details}>Estoque: {product.stock}</div>
                                    <div className={style.details}>Categoria: {product.category}</div>
                                    <div className={style.details}>Código: {product.id}</div>
                                    <img
                                        src={product.image}
                                        alt={product.id}
                                        className={style.img}
                                    />
                                    <button className={style.button} onClick={() => deleteProduct(product.id)}>Excluir</button>
                                </div>

                            )
                        })
                        : <h2>A lista de produtos se encontra vazia</h2>
                    : <h2>Carregando...</h2>
            }
        </>
    );
}

export default ProductList;