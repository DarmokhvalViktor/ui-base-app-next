import configureStore from "../../misc/redux/configureStore";
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import React, {useMemo} from "react";
import {Provider} from "react-redux";
import IntlProvider from "../../misc/providers/IntlProvider";
import rootReducer from "./reducers"
import Car from "./containers/CarDetails"
import getMessages from "./intl";

const store = configureStore(rootReducer)

function Index(props) {

    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <Provider store={store}>
            <IntlProvider messages={messages}>
                <Car {...props} />
            </IntlProvider>
        </Provider>
    );
}

export default Index;
