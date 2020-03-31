<template>
  <div>
    <div id="chartdiv"></div>
  </div>
</template>

<script>
  // import * as am4Core from '@amcharts/amcharts4/core';
  // import * as am4Maps from '@amcharts/amcharts4/maps';
  // import * as worldMap from '@amcharts/amcharts4-geodata/worldIndiaHigh';
  // import * as indiaMap from '@amcharts/amcharts4-geodata/india2019High';

  // export default {
  //   name: "World",
  //   data() {
  //     return {
  //     }
  //   },
  //   mounted() {
  //     const chart = am4Core.create("chartdiv", am4Maps.MapChart);

  //     // Set map definition
  //     chart.geodata = worldMap.default;

  //     // Set projection
  //     chart.projection = new am4Maps.projections.Mercator();

  //     // World map
  //     const worldSeries = chart.series.push(new am4Maps.MapPolygonSeries());
  //     worldSeries.exclude = ['AQ'];
  //     worldSeries.useGeodata = true;
  //     const polygonTemplate = worldSeries.mapPolygons.template;
  //     polygonTemplate.tooltipText = "{name}";
  //     polygonTemplate.fill = am4Core.color("#74B266");
  //     polygonTemplate.stroke = am4Core.color("#74B266");
  //     polygonTemplate.propertyFields.disabled = "disabled";
  //     const hs = polygonTemplate.states.create("hover");
  //     hs.properties.fill = am4Core.color("#367B25");
  //     worldSeries.data = [{
  //       id: "IN",
  //       disabled: true
  //     }];

  //     // India states map
  //     const indiaSeries = chart.series.push(new am4Maps.MapPolygonSeries());
  //     indiaSeries.geodata = indiaMap.default;
  //     const indiaPolygonTemplate = indiaSeries.mapPolygons.template;
  //     indiaPolygonTemplate.tooltipText = "{name}";
  //     indiaPolygonTemplate.fill = am4Core.color("#74B266");
  //     const ihs = indiaPolygonTemplate.states.create("hover");
  //     ihs.properties.fill = am4Core.color("#ffa500");
  //   },
  //   computed: {
  //   },
  //   methods: {
  //   }
  // }
</script>

<style lang="less" scoped>
#chartdiv {
  width: 100%;
  height: 90vh;
}

</style>
