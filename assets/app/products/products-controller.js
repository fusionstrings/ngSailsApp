(function(ng, _) {

    'use strict';

    ng.module('ngSailsApp')
        .controller('ProductsCtrl', ProductsCtrl)
        .controller('SingleProductsCtrl', SingleProductsCtrl);

    function ProductsCtrl($scope, $state, Products, ProductsDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('products'.toLowerCase());
        
        $scope.products = Products;
        $scope.model_def = ProductsDefinition.originalElement;
        $scope.products = {};

        $scope.remove = function remove(products) {
            products = products || $scope.products;
            if (window.confirm('Are you sure you want to delete this products?')) {
                return resourceService.remove(products, $scope.products);
            }
        };

        $scope.save = function save(products) {
            products = products || $scope.products;
            return resourceService.save(products, $scope.products)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleProductsCtrl($scope, $stateParams, Products, ProductsDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.products = _.find(Products, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
