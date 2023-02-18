function origincomp_stackedbar() {
    const color_range = ["#4f81bd", "#c0504d", "#9bbb59", "#ddd9c3", "#1f497d"];

    const VI_LEGEND = "The complaint was made by the victim itself.";
    const TP_LEGEND = "The complaint was made by a third party.";
    const NGO_LEGEND = "The complaint was made by a non-governmental organization.";
    const PE_LEGEND = "The complaint was made by a public entity.";
    const UP_LEGEND = "The complaint was made via an unofficial procedure.";
    
    // set the dimensions and margins of the graph
    const margin = {top: 40, right: 150, bottom: 40, left: 50},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#origincomp_stackedbarchart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("https://raw.githubusercontent.com/PM-Delgado/SLDV_Project/main/csv_files/data_origin_complaints.csv").then( function(data) {
        // List Subgroups
        const subgroups = data.columns.slice(1);
        
        // List Groups
        const groups = data.map(d => d.group);

        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        

        svg.append("g")
            .style("font-size", "16px")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([ height, 0 ]);
        svg.append("g")
            .style("font-size", "16px")
            .call(d3.axisLeft(y));

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(color_range);

        dataNormalized = []
        data.forEach(function(d){
            // Compute the total
            tot = 0
            for (i in subgroups){ name=subgroups[i] ; tot += +d[name] }
            // Now normalize
            for (i in subgroups){ name=subgroups[i] ; d[name] = d[name] / tot * 100}
        })
        
        //stack the data? --> stack per subgroup
        const stackedData = d3.stack()
            .keys(subgroups)
            (data)

        // ----------------
        // Tooltip, Legend
        // ----------------

        // Show the bars and Mouseover Tooltip
        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .join("g")
                .attr("fill", d => color(d.key))
                .attr("class", d => "originRect " + d.key) // Add a class to each subgroup: their name
                .selectAll("rect")
                .data(d => d)
                .join("rect")
                    .attr("class", "currRect")
                    .style("opacity", 1)
                    .attr("x", d => x(d.data.group))
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth())
                    .on("mousemove", function (event,d) {
                        const subGroupName = d3.select(this.parentNode).datum().key
                        d3.select("#origin_barchart_tooltip")
                                .style("left", (event.pageX) - 58 + "px")
                                .style("top", (event.pageY) - 79 + "px")
                                .select("#origin")
                                .text(translateCSVtoGraph(subGroupName));

                            d3.select("#origin_barchart_tooltip")
                                .select("#value")
                                .text(Math.round(d.data[subGroupName] * 10) / 10 + "%");

                            d3.select("#origin_barchart_tooltip").classed("hidden", false);
                    })
                    .on("mouseout", function (event,d) { // When user do not hover anymore
                        d3.select("#origin_barchart_tooltip").classed("hidden", true);
                    })

        
        // Legend
        var legendRectSize = 20;
        var legendSpacing = 15;
        
        var copy_subgroups = subgroups;
        var copy_color_range = color_range;
        copy_subgroups.reverse();
        copy_color_range.reverse();

        var legend = svg.selectAll(".legend")
            .data(copy_subgroups)
            .enter()
            .append("g")
            .attr('class', 'circle-legend')
            .attr("transform", function(d,i){
                return "translate(" + (width + 15) + "," + ((i * 25)) + ")"; // place each legend on the right and bump each one down 15 pixels
            });
        
        legend.append('circle') //keys
            .style("fill", function(d,i) {
                return copy_color_range[i];
            })
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', '.5rem')
            .on("mousemove", function(d,i) {
                // Legend Tooltip Text
                d3.select("#origin_barchart_legend_tooltip")
                .style("left", (event.pageX) + 15 + "px")
                .style("top", (event.pageY) + "px")
                .select("#text")
                .text(legendText(i));

                d3.select("#origin_barchart_legend_tooltip").classed("hidden", false);

                // Group Highlight
                const subGroupName = d3.select(this.parentNode).datum().key
                // Reduce opacity of all rect to 0.2
                d3.selectAll(".originRect").style("opacity", 0.2)
                // Highlight all rects of this subgroup with opacity 0.6
                d3.selectAll("."+i).style("opacity", 1)
            })
            .on("mouseout", function(d,i) {
                d3.select("#origin_barchart_legend_tooltip").classed("hidden", true);
                d3.selectAll(".originRect")
                    .style("opacity",1);
            });

            legend.append('text') //labels
                .attr('x', legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function (d) {
                    return translateCSVtoGraph(d);
                });

        function translateCSVtoGraph(factor) {
            switch(factor) {
                case "victim":
                    return "Victim"
                case "thirdparty":
                    return "Third Party"
                case "ngo":
                    return "NGO"
                case "publicentity":
                    return "Public Entity"
                case "unofficialproc":
                    return "Unofficial Proc."
                default:
                    break;       
            }
        }

        function legendText(factor) {
            switch(factor) {
                case "victim":
                    return VI_LEGEND
                case "thirdparty":
                    return TP_LEGEND
                case "ngo":
                    return NGO_LEGEND
                case "publicentity":
                    return PE_LEGEND
                case "unofficialproc":
                    return UP_LEGEND
                default:
                    break;       
            }
        }
    })
}