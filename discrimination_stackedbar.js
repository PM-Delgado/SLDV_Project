function discrimination_stackedbar() {
    const color_range = ["#A29E9D", "#57BEDD", "#E651E8", "#51E87A", "#7851E8", "#E86A51", "#DAE851"];

    const BR_LEGEND = "Brazilian nationality as the basis of the discriminatory expression present in the complaint.";
    const RO_LEGEND = "Romani ethnicity as the basis of the discriminatory expression present in the complaint.";
    const BL_LEGEND = "Black skin color as the basis of the discriminatory expression present in the complaint.";
    const IM_LEGEND = "Immigrant as the basis of the discriminatory expression present in the complaint.";
    const RA_LEGEND = "Racism as the basis of the discriminatory expression present in the complaint.";
    const ME_LEGEND = "Multiple Expressions, meaning that two or more discriminatory expressions were present in the complaint.";
    const OT_LEGEND = "Others, meaning other discriminatory expressions present in the complaint.";
    
    // set the dimensions and margins of the graph
    const margin = {top: 40, right: 110, bottom: 40, left: 50},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#discrimination_stackedbarchart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("https://raw.githubusercontent.com/PM-Delgado/SLDV_Project/main/csv_files/data_discri_stackedbar.csv").then( function(data) {
        // List Subgroups
        const subgroups = data.columns.slice(1);
        
        // List Groups
        const groups = data.map(d => d.year);

        // Add X axis
        const x = d3.scaleBand()
            .range([0, width])
            .padding([0.2])
        
        x.domain(groups)

        svg.append("g")
            .style("font-size", "16px")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 400])
            .range([ height, 0 ]);
        svg.append("g")
            .style("font-size", "16px")
            .call(d3.axisLeft(y));

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(color_range);

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
                .attr("class", d => "discRect " + d.key) // Add a class to each subgroup: their name
                .selectAll("rect")
                .data(d => d)
                .join("rect")
                    .attr("class", "currRect")
                    .style("opacity", 1)
                    .attr("x", d => x(d.data.year))
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth())
                    .on("mousemove", function (event,d) {
                        const subGroupName = d3.select(this.parentNode).datum().key
                        d3.select("#discrimination_barchart_tooltip")
                                .style("left", (event.pageX) - 50 + "px")
                                .style("top", (event.pageY) - 77 + "px")
                                .select("#year")
                                .text(d.data.year);

                            d3.select("#discrimination_barchart_tooltip")
                                .select("#factor")
                                .text(translateCSVtoGraph(subGroupName));

                            d3.select("#discrimination_barchart_tooltip")
                                .select("#value")
                                .text(d.data[subGroupName]);

                            d3.select("#discrimination_barchart_tooltip").classed("hidden", false);
                    })
                    .on("mouseout", function (event,d) { // When user do not hover anymore
                        d3.select("#discrimination_barchart_tooltip").classed("hidden", true);
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
                d3.select("#discrimination_barchart_legend_tooltip")
                .style("left", (event.pageX) + 15 + "px")
                .style("top", (event.pageY) + "px")
                .select("#text")
                .text(legendText(i));

                d3.select("#discrimination_barchart_legend_tooltip").classed("hidden", false);

                // Group Highlight
                const subGroupName = d3.select(this.parentNode).datum().key
                // Reduce opacity of all rect to 0.2
                d3.selectAll(".discRect").style("opacity", 0.2)
                // Highlight all rects of this subgroup with opacity 0.6
                d3.selectAll("."+i).style("opacity", 1)
            })
            .on("mouseout", function(d,i) {
                d3.select("#discrimination_barchart_legend_tooltip").classed("hidden", true);
                d3.selectAll(".discRect")
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
                case "brazilian":
                    return "Brazilian"
                case "romani":
                    return "Romani"
                case "blacksin":
                    return "Black Skin"
                case "immigrants":
                    return "Immigrant"
                case "racism":
                    return "Racism"
                case "multexp":
                    return "Mult Expr."
                case "others":
                    return "Others"
                default:
                    break;       
            }
        }

        function legendText(factor) {
            switch(factor) {
                case "brazilian":
                    return BR_LEGEND
                case "romani":
                    return RO_LEGEND
                case "blacksin":
                    return BL_LEGEND
                case "immigrants":
                    return IM_LEGEND
                case "racism":
                    return RA_LEGEND
                case "multexp":
                    return ME_LEGEND
                case "others":
                    return OT_LEGEND
                default:
                    break;       
            }
        }
    })
}