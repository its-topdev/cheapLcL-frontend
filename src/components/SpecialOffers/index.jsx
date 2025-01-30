import SpecailOfferItem from "./SpecailOfferItem";
import "./style.scss";

const SPECAIL_OFFERS = [
    {id: 1, type: 'Ocean Freight', icon: 'dfdf', price: "$144", pol: 'Shenzen', pod: 'Loa Angeles'},
    {id: 2, type: 'Ocean Freight', icon: 'dfdf', price: "$154", pol: 'Shenzen', pod: 'Loa Angeles'},
    {id: 3, type: 'Ocean Freight', icon: 'dfdf', price: "$213", pol: 'Shenzen', pod: 'Loa Angeles'},
    {id: 4, type: 'Ocean Freight', icon: 'dfdf', price: "$716", pol: 'Shenzen', pod: 'Loa Angeles'},
];

function SpecialOffers({amount}) {
    const rows = [];
    const offers = SPECAIL_OFFERS;
    const amountOffers = offers.slice(0,amount);
    amountOffers.forEach((offer) => {
        rows.push(
          <SpecailOfferItem
            offer={offer}
            key={offer.id} />
        );
      });
    return (
        <div className="specail-offers">
            <h3 className="specail-offers-title">Specail Offers:</h3>
            {rows}
        </div>
    );
}

export default SpecialOffers;