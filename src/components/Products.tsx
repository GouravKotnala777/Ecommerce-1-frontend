import "../styles/components/products.scss";
import photo from "/public/vite.svg";

const Products = () => {
    //import.meta.env.VITE_SERVER_URL

    return(
        <div className="products_bg">
            {[1,2,3,4,5,6,7,8,9].map((q) => (
                <div className="product_cont" key={q}>
                    <div className="upper_part">
                        <img src={photo} alt={photo} />
                    </div>
                    <div className="middle_part">
                        <div className="info name">Name</div>
                        <div className="info price">price</div>
                        <div className="info rating">rating</div>
                    </div>
                    <div className="lower_part">
                        <button>Add</button>
                        <button>Buy</button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Products;