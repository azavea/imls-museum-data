/**
 * Directive for displaying IMLS cartodb visualizations
 * To show demographic data on the map, add the attribute `demographics="true"`
 * See directive definition for other scope vars/attrs
 */
(function () {
    'use strict';

    /* ngInject */
    function VisController($attrs, $log, $q, $scope, $timeout, Config) {

        var MAP_SLIDE_TRANSITION_MS = 400;

        var defaultOptions = {
            shareable: false,
            search: false,
            fullscreen: false,
            scrollwheel: false,
            cartodb_logo: false
        };
        var ctl = this;
        var url;
        var map;

        initialize();

        function initialize() {
            ctl.demographics = !!($scope.$eval($attrs.demographics));
            ctl.visFullscreenClass = $attrs.visFullscreenClass || 'map-expanded';
            ctl.sublayers = [];
            ctl.radio = '-1';
            ctl.layersVisible = false;
            ctl.visId = ctl.visId || Config.cartodb.visId;
            ctl.visOptions = ctl.visOptions || defaultOptions;
            ctl.visOptions.tooltip = !ctl.demographics;
            ctl.visAccount = ctl.visAccount || Config.cartodb.account;
            url = 'https://' + ctl.visAccount + '.cartodb.com/api/v2/viz/' + ctl.visId + '/viz.json';
            cartodb.createVis('map', url, ctl.visOptions).done(onVisReady);

            ctl.onFullscreenClicked = onFullscreenClicked;
            ctl.onSublayerChange = onSublayerChange;
            $scope.$watch(function () { return ctl.visFullscreen; }, onVisFullscreenChanged);
        }

        function onSublayerChange(sublayer) {
            angular.forEach(ctl.sublayers, function (s) {
                s.hide();
                s.legend.set('visible', false);
            });
            if (sublayer) {
                sublayer.show();
                sublayer.legend.set('visible', true);
            } else {
                // Hide the sticky tooltip by clearing block styling...weee this is messy
                $('div.cartodb-tooltip').css('display', '');
            }
        }

        function onVisReady(vis) {
            map = vis.getNativeMap();

            if (ctl.demographics) {
                var demographicsOptions = angular.extend({}, defaultOptions, {tooltip: true});
                cartodb.createLayer(map, Config.cartodb.demographicVisUrl, demographicsOptions)
                .addTo(map).done(function (layer) {
                    $('div.cartodb-legend-stack').filter(':first').css('bottom', '150px');
                    ctl.sublayers = layer.getSubLayers();
                    ctl.onSublayerChange(ctl.sublayers[-1]);
                    $scope.$apply();
                });
            }

            // Force museum points back to the top
            // Always layer one of the main visualization (basemap is layer zero)
            var visLayers = vis.getLayers();
            if (visLayers && visLayers.length > 1) {
                visLayers[1].setZIndex(9999);
            }

            $scope.$emit('imls:vis:ready', vis, map);
        }

        function onFullscreenClicked() {
            ctl.visFullscreen = !ctl.visFullscreen;
        }

        function onVisFullscreenChanged(newValue) {
            var isOpen = !!(newValue);
            // Toggle class on body:
            //  Putting the 'overflow: hidden' on the body automatically hides scrollbars
            // Yes this is ugly but it keeps everything in the controller
            $('body').toggleClass(ctl.visFullscreenClass, isOpen);
            $timeout(function () {
                map.invalidateSize();
                if (ctl.visFullscreenOnToggle()) {
                    ctl.visFullscreenOnToggle()(isOpen);
                }
            }, MAP_SLIDE_TRANSITION_MS * 1.2);
        }
    }

    /* ngInject */
    function CartoDBVis() {

        var module = {
            restrict: 'E',
            scope: {
                visId: '@',
                visAccount: '@',
                visOptions: '=',
                visFullscreen: '=',
                visFullscreenOnToggle: '&'
                // attrs
                // visFullscreenClass: 'string', class to use for the fullscreen map class
                //                     default: 'map-expanded'
                // demographics: bool, should the demographics layers be shown on the map
                //                     default: false
            },
            templateUrl: 'scripts/map/cartodb-vis-partial.html',
            controller: 'VisController',
            controllerAs: 'vis',
            bindToController: true
        };
        return module;
    }

    angular.module('imls.map')
    .controller('VisController', VisController)
    .directive('cartodbVis', CartoDBVis);

})();
