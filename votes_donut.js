function votes_donut() {
    // Data 2022
    var data22 = [
        { party: "PPD/PSD", votes: 1589823, color: "#f39640"},
        { party: "IL", votes: 273399, color: "#2ea9dc"},
        { party: "CDS-PP", votes: 0, color: "#6082B6"},
        { party: "CH", votes: 399510, color: "#242653"},
        { party: "PSD/CDS", votes: 0, color: "#D89255"},
        { party: "PCP-PEV", votes: 238962, color: "#e20719"},
        { party: "BE", votes: 244596, color: "#CF9FFF"}, 
        { party: "L", votes: 71196, color: "#a7ce62"},
        { party: "PS", votes: 2301887, color: "#e75195"},
        { party: "PAN", votes: 88127, color: "#1e6782"},
    ];

    // Data 2019
    var data19 = [
        { party: "PPD/PSD", votes: 1457704, color: "#f39640"},
        { party: "IL", votes: 67681, color: "#2ea9dc"},
        { party: "CDS-PP", votes: 221774, color: "#6082B6"},
        { party: "CH", votes: 67826, color: "#242653"},
        { party: "PSD/CDS", deputies: 0, color: "#D89255"},
        { party: "PCP-PEV", votes: 332473, color: "#e20719"},
        { party: "BE", votes: 500017, color: "#CF9FFF"}, 
        { party: "L", votes: 57172, color: "#a7ce62"},
        { party: "PS", votes: 1908036, color: "#e75195"},
        { party: "PAN", votes: 174511, color: "#1e6782"}
    ];

    // Data 2015
    var data15 = [
        { party: "PPD/PSD", votes: 0, color: "#f39640"},
        { party: "IL", votes: 0, color: "#2ea9dc"},
        { party: "CDS-PP", votes: 0, color: "#6082B6"},
        { party: "CH", votes: 0, color: "#242653"},
        { party: "PSD/CDS", votes: 2074986, color: "#D89255"},
        { party: "PCP-PEV", votes: 445980, color: "#e20719"},
        { party: "BE", votes: 550892, color: "#CF9FFF"}, 
        { party: "L", votes: 0, color: "#a7ce62"},
        { party: "PS", votes: 1747685, color: "#e75195"},
        { party: "PAN", votes: 75140, color: "#1e6782"}
    ];

    // Semi-Donut Dimension
    var width = 600,
    height = 385,
    margin = 20,
    radius = Math.min(width, height) / 2 - margin;
    
    // SVG Container
    var svg = d3.select("#votes_donut").append("svg")
        .attr("class", "svg_donut")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2 - 50) + "," + (height / 2 - 10)+ ")");
    
    // Semi Donut Chart
    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(80);

    var arcOver = d3.arc()
        .outerRadius(radius + 10)
        .innerRadius(80)

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.votes; });

    var path = svg.selectAll("path")
        .data(pie(data22))
        .enter().append("path")
        .attr("class", "arc");

    path.transition()
        .attr("d", arc)
        .style("fill", function(d) { return d.data.color; })
        .each(function(d) {
            this._current = d;
        })
    
    path.on("mouseover", mouseover)
        .on("mousemove", function(d,i) {
            d3.select("#parlament_donut_tooltip")
            .style("left", (event.pageX) - 50 + "px")
            .style("top", (event.pageY) - 77 + "px")
            .select("#name")
            .text(i.data.party);
            d3.select("#parlament_donut_tooltip")
            .select("#value")
            .text((i.data.votes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

			d3.select("#parlament_donut_tooltip").classed("hidden", false);
        })
        .on("mouseout", mouseout);

    function mouseover() {
        d3.select(this).transition()
            .duration(400)
            .attr("d", arcOver);
    }
    
    function mouseout() {
        d3.select(this).transition()
        .duration(500)
        .attr("d", arc);
        d3.select("#parlament_donut_tooltip").classed("hidden", true);
    }

    // Year Data Handler
    var yearList = document.getElementById("year_list_values");
    yearList.addEventListener("change", function() {
        var year = yearList.options[yearList.selectedIndex].value;
        switch(year) {
            case "2022":
                changeData(data22);
                break;
            case "2019":
                changeData(data19);
                break;
            case "2015":
                changeData(data15);
                break;
            default:
                break;
        }
    });
    
    function changeData(data) {
        path.data(pie(data));
        path.transition().duration(500).attrTween("d", arcTween);
    }

    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }

    function currentActiveParties(data) {
        var tempData = [];
        data.forEach(function (d) {
            if (d.deputies > 0) {
                tempData.push(d);
            }
        })
        return tempData;
    }

}