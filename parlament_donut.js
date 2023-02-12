function parlament_donut() {
    // Data 2022
    var data22 = [
        { party: "PCP-PEV", deputies: 6, color: "#e20719"},
        { party: "BE", deputies: 5, color: "#CF9FFF"}, 
        { party: "L", deputies: 1, color: "#a7ce62"},
        { party: "PS", deputies: 120, color: "#e75195"},
        { party: "PAN", deputies: 1, color: "#1e6782"},
        { party: "PPD/PSD", deputies: 77, color: "#f39640"},
        { party: "PSD/CDS", deputies: 0, color: "#D89255"},
        { party: "IL", deputies: 8, color: "#2ea9dc"},
        { party: "CDS-PP", deputies: 0, color: "#6082B6"},
        { party: "CH", deputies: 12, color: "#242653"}
    ];

    // Data 2019
    var data19 = [
        { party: "PCP-PEV", deputies: 12, color: "#e20719"},
        { party: "BE", deputies: 19, color: "#CF9FFF"}, 
        { party: "L", deputies: 1, color: "#a7ce62"},
        { party: "PS", deputies: 108, color: "#e75195"},
        { party: "PAN", deputies: 4, color: "#1e6782"},
        { party: "PPD/PSD", deputies: 79, color: "#f39640"},
        { party: "PSD/CDS", deputies: 0, color: "#D89255"},
        { party: "IL", deputies: 1, color: "#2ea9dc"},
        { party: "CDS-PP", deputies: 5, color: "#6082B6"},
        { party: "CH", deputies: 1, color: "#242653"}
    ];

    // Data 2015
    var data15 = [
        { party: "PCP-PEV", deputies: 17, color: "#e20719"},
        { party: "BE", deputies: 19, color: "#CF9FFF"}, 
        { party: "L", deputies: 0, color: "#a7ce62"},
        { party: "PS", deputies: 86, color: "#e75195"},
        { party: "PAN", deputies: 1, color: "#1e6782"},
        { party: "PPD/PSD", deputies: 0, color: "#f39640"},
        { party: "PSD/CDS", deputies: 107, color: "#D89255"},
        { party: "IL", deputies: 0, color: "#2ea9dc"},
        { party: "CDS-PP", deputies: 0, color: "#6082B6"},
        { party: "CH", deputies: 0, color: "#242653"}
    ];

    // Party Descriptions
    const CDU_DESC = "PCP-PEV, also known as Unitary Democratic Coalition (CDU in Portuguese), " +
                        'is a political coalition between the Portuguese Communist Party (PCP) and the Ecologist Party "The Greens" (PEV).';

    const BE_DESC = "Left Bloc, abbr. BE, is a left-wing populist, democratic socialist political party founded in 1999.";
    
    const L_DESC = "LIVRE ('FREE', in literal translation), is a green political party founded in 2014.\n" +
                    "Its principles are ecology, freedom, equity, solidarity, socialism and Europeanism.";
    
    const PS_DESC = "The Socialist Party (PS) is a centre-left social-democratic political party founded in 1973."
                    + " PS is also one of the two major parties in Portuguese politics.";
    
    const PAN_DESC = "People-Animals-Nature (PAN) is an environmentalist, animal rights and animal welfare focused political party founded in 2009."
    
    const PSD_DESC = "The Social Democratic Party (known as PSD) is a centre-right liberal-conservative political party founded in 1974."
                    + " Being one of the two major parties in Portugal, on ballot papers its initials appear as PPD/PSD, because Democratic People's Party (PPD) was the original party's name.";

    const IL_DESC = "The Liberal Initiative (IL) is a liberal political party founded in 2017. It defends opposition to statism through liberalism.";
    
    const CDS_DESC = "CDS - People's Party (CDS/PP) is a right-wing conservative and Christian democratic political party founded in 1974.";

    const CH_DESC = "Chega ('Enough', in literal translation), is a far-right, national conservative, populist political party founded in 2019.";

    const PSDCDS_DESC = "The Portugal Ahead was a conservative political and electoral alliance formed by PPD/PSD and CDS-PP."

    // Party Links
    const CDU_LINK = "https://en.wikipedia.org/wiki/Unitary_Democratic_Coalition";
    const BE_LINK = "https://en.wikipedia.org/wiki/Left_Bloc_(Portugal)";
    const L_LINK = "https://en.wikipedia.org/wiki/LIVRE";
    const PS_LINK = "https://en.wikipedia.org/wiki/Socialist_Party_(Portugal)";
    const PAN_LINK = "https://en.wikipedia.org/wiki/People_Animals_Nature";
    const PSD_LINK = "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Portugal)";
    const IL_LINK = "https://en.wikipedia.org/wiki/Liberal_Initiative";
    const CDS_LINK = "https://en.wikipedia.org/wiki/CDS_%E2%80%93_People%27s_Party";
    const CH_LINK = "https://en.wikipedia.org/wiki/Chega_(political_party)";
    const PSDCDS_LINK = "https://en.wikipedia.org/wiki/Coalition_PSD/CDS";

    // Semi-Donut Dimension
    var width = 600,
    height = 500,
    margin = 20,
    radius = Math.min(width, height) / 2 - margin;
    
    // SVG Container
    var svg = d3.select("#parlament_donut").append("svg")
        .attr("class", "svg_donut")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2 - 50) + "," + height / 2 + ")");
    
    // Semi Donut Chart
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 150);

    var arcOver = d3.arc()
        .outerRadius(radius + 10)
        .innerRadius(radius - 150)

    var pie = d3.pie()
        .sort(null)
        .startAngle(-90 * (Math.PI / 180))
        .endAngle(90 * (Math.PI / 180))
        .value(function(d) { return d.deputies; });

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
            .text(i.data.deputies);

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

    // Legend
    var legendRectSize = 20;
    var legendSpacing = 15;

    function drawLegend(data) {
        var legend = svg.selectAll(".legend")
            .data(pie(currentActiveParties(data)))
            .enter()
            .append("g")
            .attr('class', 'circle-legend')
            .attr("transform", function(d,i){
                return "translate(" + (width - 350) + "," + (-height/2.3 + (i * 25)) + ")"; // place each legend on the right and bump each one down 15 pixels
            });

        legend.append('circle') //keys
            .style("fill", function(d) { return d.data.color; })
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', '.5rem')
            .on("mousemove", function(d,i) {
                d3.select("#parlament_donut_legend_tooltip")
                .style("left", (event.pageX) + 15 + "px")
                .style("top", (event.pageY) + "px")
                .select("#text")
                .text(legendTooltipText(i.data.party));

                d3.select("#parlament_donut_legend_tooltip").classed("hidden", false);
            })
            .on("mouseout", function(d,i) {
                d3.select("#parlament_donut_legend_tooltip").classed("hidden", true);
            })
            .on("click", function(d,i) {
                window.open(legendTooltipLink(i.data.party));
            });

        legend.append('text') //labels
            .attr('x', legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function (d) {
                return d.data.party;
            });

    }

    drawLegend(data22);

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
        svg.selectAll("g.circle-legend").remove();
        drawLegend(data);
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

    function legendTooltipText(party) {
        switch(party) {
            case "PCP-PEV":
                return CDU_DESC;
                break;
            case "BE":
                return BE_DESC;
                break;
            case "L":
                return L_DESC;
                break;
            case "PS":
                return PS_DESC;
                break;
            case "PAN":
                return PAN_DESC;
                break;
            case "PPD/PSD":
                return PSD_DESC;
                break;
            case "IL":
                return IL_DESC;
                break;
            case "CDS-PP":
                return CDS_DESC;
                break;
            case "CH":
                return CH_DESC;
                break;
            case "PSD/CDS":
                return PSDCDS_DESC;
            default:
                break;
        }
    }

    function legendTooltipLink(party) {
        switch(party) {
            case "PCP-PEV":
                return CDU_LINK;
                break;
            case "BE":
                return BE_LINK;
                break;
            case "L":
                return L_LINK;
                break;
            case "PS":
                return PS_LINK;
                break;
            case "PAN":
                return PAN_LINK;
                break;
            case "PPD/PSD":
                return PSD_LINK;
                break;
            case "IL":
                return IL_LINK;
                break;
            case "CDS-PP":
                return CDS_LINK;
                break;
            case "CH":
                return CH_LINK;
                break;
            case "PSD/CDS":
                return PSDCDS_LINK;
            default:
                break;
        }
    }
}