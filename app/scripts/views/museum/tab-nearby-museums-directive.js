(function () {
    'use strict';

    /* ngInject */
    function NearbyMuseumsTabController($log, $scope, $timeout, ACSGraphs, LegendMap) {
        var ctl = this;
        var museumTypes;

        initialize();

        function initialize() {
            ctl.stateTotal = 0;
            ctl.areaTotal = 0;
            $scope.$watch(function () { return ctl.stateData; }, onStateDataChanged);
            $scope.$watch(function () { return ctl.areaData; }, onAreaDataChanged);
            $scope.$watch(function () { return ctl.isTabVisible; }, onTabVisibleChanged);
            museumTypes = _.values(LegendMap);
        }

        // adds missing museum types and sorts alphabetically
        function prepareBarChartData(data) {
            var zeroCounts = [];
            _.forEach(museumTypes, function (museumType) {
                // if not in data, add a zero count to out
                if (!_.find(data, function (item) { return item.label === museumType; })) {
                    zeroCounts.push({
                        label: museumType,
                        series: 0,
                        value: 0
                    });
                }
            });
            return _.sortBy(zeroCounts.concat(data), function (item) { return item.label; });
        }

        function onStateDataChanged(newData) {
            if (newData) {
                ctl.stateData = newData;
                ctl.stateTotal = _(newData).pluck('value').reduce(_.add, 0);
                if (ctl.areaData) {
                    draw();
                }
            }
        }

        function onAreaDataChanged(newData) {
            if (newData) {
                ctl.areaData = newData;
                ctl.areaTotal = _(newData).pluck('value').reduce(_.add, 0);
                if (ctl.stateData) {
                    draw();
                }
            }
        }

        function onTabVisibleChanged() {
            if (ctl.isTabVisible) {
                $timeout(function () {
                    draw(true);
                });
            }
        }

        function draw(forceRedraw) {
            var barOpts = {
                forceRedraw: forceRedraw,
                margin: {
                    left: 150,
                    right: 30
                },
                labelCharacters: null
            };
            ACSGraphs.drawBarChart('nearby-state',
                                   prepareBarChartData(ctl.stateData),
                                   barOpts);
            ACSGraphs.drawBarChart('nearby-area',
                                   prepareBarChartData(ctl.areaData),
                                   barOpts);
        }
    }

    /* ngInject */
    function imlsTabNearbyMuseums() {
        var module = {
            restrict: 'E',
            templateUrl: 'scripts/views/museum/tab-nearby-museums-partial.html',
            scope: {
                stateData: '=',
                areaData: '=',
                isTabVisible: '='
            },
            controller: 'NearbyMuseumsTabController',
            controllerAs: 'nearby',
            bindToController: true
        };
        return module;
    }

    angular.module('imls.views.museum')
    .controller('NearbyMuseumsTabController', NearbyMuseumsTabController)
    .directive('imlsTabNearbyMuseums', imlsTabNearbyMuseums);

})();
