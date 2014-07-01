(function(ng) {
    
    'use strict';

    ng.module('ngSailsApp')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/products', '/products/list');

            $stateProvider
                .state('products', {
                    abstract: true,
                    url: '/products',
                    controller: 'ProductsCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        ProductsDefinition : function getProductsDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('products');
                        },
                        Products: function productsListResolve(Restangular) {
                            return Restangular.all('products').getList();
                        }
                    },
                })
                .state('products.list', {
                    url: '/list',
                    templateUrl: 'app/products/products-list.html'
                })
                .state('products.add', {
                    url: '/add',
                    templateUrl: 'app/products/products-add-edit.html'
                })
                .state('products.info', {
                    url: '/info/:id',
                    controller: 'SingleProductsCtrl',
                    templateUrl: 'app/products/products-info.html'
                })
                .state('products.edit', {
                    url: '/edit/:id',
                    controller: 'SingleProductsCtrl',
                    templateUrl: 'app/products/products-add-edit.html'
                });
        });
})(
    window.angular
);
