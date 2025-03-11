import ActionsBtn from "./ActionsBtn";
import {
  BookRequestPrefix,
  dateTimeFormat,
  priceFormat,
} from "../../../constants/general";

export default function QuoteRow({ quote, onfetchQuotes }) {
  // const statuses = {
  //     created: {color: '#AC8B06', background: '#FFFAE6'},
  //     cancelled: {color: '#B61B25',  background: '#FFFAE6'},
  //     Booked: {color: '#003E8B', background: '#F8F9FD'},
  // };

  return (
    <tr className="quote-row">
      <td>
        {BookRequestPrefix}-{quote.id}
      </td>
      <td>{quote.user && quote.user.name}</td>
      <td>{quote.basePrice && priceFormat(quote.basePrice)}</td>
      <td>{quote.weight}MT</td>
      <td>{quote.cbm}M³</td>
      <td>{quote.price && quote.price.vessel && quote.price.vessel.name}</td>
      <td>{quote.price && quote.price.voyage}</td>
      <td>{quote.price && quote.price.polObj && quote.price.polObj.name}</td>
      <td>{quote.price && quote.price.podObj && quote.price.podObj.name}</td>
      {/* <td>{quote.bookStatus && quote.bookStatus.name && <span style={{color: statuses[quote.bookStatus.name]['color'], background: statuses[quote.bookStatus.name]['background']}}>{quote.bookStatus.name}</span>}</td> */}
      <td>{quote.createdAt && dateTimeFormat(quote.createdAt)}</td>
      <td>
        {quote.bookStatus &&
          quote.bookStatus.name &&
          quote.bookStatus.name.toUpperCase()}
      </td>
      <td>
        <ActionsBtn quote={quote} onfetchQuotes={onfetchQuotes} />
      </td>
    </tr>
  );
}
