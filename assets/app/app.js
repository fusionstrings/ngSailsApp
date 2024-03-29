(function(ng, _) {
    'use strict';

    ng.module('ngSailsApp', ['restangular', 'ui.router'])
        .config(function(RestangularProvider) {
            RestangularProvider
                .addRequestInterceptor(function(el, operation) {
                    if (operation === 'put' || operation === 'post') {
                        // We don't need to send these to the API
                        _.each(['createdAt', 'updatedAt', 'definition'], function(prop) {
                            if (el[prop]) {
                                delete el[prop];
                            }
                        });
                    }
                    return el;
                })
                .setResponseExtractor(function(response) {
                    var newResponse = response;
                    if (_.isArray(response)) {
                        _.each(newResponse, function(value, idx) {
                            newResponse[idx].originalElement = _.clone(value, true);
                        });
                    } else {
                        newResponse.originalElement = _.clone(response, true);
                    }
                    return newResponse;
                });
        });

})(
    window.angular,
    window._
);