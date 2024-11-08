import "../styles/components/item_not_found.scss";

const ItemNotFound = ({heading, statusCode}:{heading:string; statusCode:number;}) => {

    return(
        <div className="item_not_found_outer_cont">
        <div className="item_not_found_inner_cont">
            {
                statusCode !== 200 &&
                    <div className="statusCode">{statusCode}</div>
            }
            <div className="heading">{heading}</div>
        </div>
        </div>
    )
}

export default ItemNotFound;