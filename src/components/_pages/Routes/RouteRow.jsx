import ActionsBtn from "./ActionsBtn";
import { dateFormatUtc, priceFormat } from '../../../constants/general';

export default function RouteRow({ route, onFetchRoutes }) {        
    return (
        <>
            <tr>
                <td>{route.carrier ? route.carrier.name : ''}</td>
                <td>{route.vessel ? route.vessel.name : ''}</td>
                <td>{route.voyage}</td>
                <td>{route.polObj ? route.polObj.name : ''}</td>
                <td>{route.podObj ? route.podObj.name: ''}</td>
                <td>{route.departureDate ? dateFormatUtc(route.departureDate) : ''}</td>
                <td>{route.arrivalDate ? dateFormatUtc(route.arrivalDate) : ''}</td>
                <td>{route.priceFirst ? priceFormat(route.priceFirst) : ''}</td>
                <td>{route.priceSecond ? priceFormat(route.priceSecond) : ''}</td>
                <td>{route.priceThird ? priceFormat(route.priceThird) : ''}</td>
                <td>{route.priceFourth ? priceFormat(route.priceFourth) : ''}</td>
                <td>{route.priceDate ? priceFormat(route.priceDate) : ''}</td>
                <td className="actions">
                    <ActionsBtn
                        route={route}
                        onFetchRoutes={onFetchRoutes}
                    />
                </td>
            </tr>
        </>
    );
}