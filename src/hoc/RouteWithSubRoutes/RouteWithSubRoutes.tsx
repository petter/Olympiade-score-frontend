import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import DefaultLoader from '../../components/UI/DefaultLoader/DefaultLoader';

const RouteWithSubRoutes = (routes: RouteWithSubRoutesProps) => {
    return (
        <Route
            path={routes.path}
            render={props => (

                routes.async ? (
                    <Suspense fallback={<DefaultLoader />}>
                        <routes.component {...props} />
                    </Suspense>
                ) : (
                        <routes.component {...props} />
                    )

            )}
        />
    );
}

interface RouteWithSubRoutesProps {
    path: string;
    component: any;
    routes?: RouteWithSubRoutesProps;
    async?: boolean;
    exact?: boolean;
    key?: number;

}

export default RouteWithSubRoutes;