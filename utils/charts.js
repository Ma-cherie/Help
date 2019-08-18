const Data = require('./dataset');
//<%import_charts%>


var chartbase = {
chart: null,
onInit: function (canvas, width, height) {
    const chart = echarts.init(canvas, null, {
                               width: width,
                               height: height
                               });
    this.chart = chart
    canvas.setChart(chart)
    this.setOption(this.optionBuilder())
    var that = this
    this.subscribe(this.id, function () {
                   that.setOption(that.optionBuilder())
                   })
    return chart
},
setOption: function (option) {
    this.chart.setOption(option)
}
}




module.exports = {
    
}
