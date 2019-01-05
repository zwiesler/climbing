import _ from 'lodash';
import {CLIMBING_SHEET_ID} from "../utils/secrets";

export const initialCenterDefault = {lat: 42.3601, lng: -71.0589};
export const googleSheetURL = "https://docs.google.com/spreadsheets/d/" + CLIMBING_SHEET_ID;
export const googleSheetTabMap = {
    'log': '2003074421',
    'newEngland': '645314090',
    'freerider': '617802640',
    'moonlight': '1991768076',
    'colorado': '567437704'
};

export function handleError(error, context) {
    if (_.isNil(error.response) || _.isNil(error.response.status)) {
        context.setState({
            modalOpen: true,
            modalMessage: 'Looks like there was an issue communicating with the server.'
        });
    } else if (error.response.status === 412) {
        context.setState({
            modalOpen: true,
            errorStatus: 412,
            modalMessage: 'Precondition failed'
        });
    } else if (error.response.status === 401) {
        localStorage.clear();
        context.props.history.push('/');
    } else if (error.response.status === 403) {
        context.setState({
            modalOpen: true,
            errorStatus: 403,
            modalMessage: 'Sorry you are not authorized to use this tool.'
        });
    }
}
