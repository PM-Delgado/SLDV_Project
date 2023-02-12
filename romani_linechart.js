function romani_linechart() {
    const romani_data_map = {
        2021: 67,
        2020: 53,
        2019: 84,
        2018: 74,
        2017:58
    }

    const romani_data = Object.keys(romani_data_map).map(key => ({year: parseInt(key), comp: romani_data_map[key]}));

    const margin = {top:40, bottom: 50, left: 40, right: 40},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    // SVG Container
    const svg = d3.select("#romani_linechart").append("svg")
        .attr("class", "svg_line")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        
    const plot_g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    

    // SVG Title
    plot_g.append("text")
        .attr("x", 40)
        .attr("y", -20)
        .attr("text-align", "center")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .text("Romani Ethnicity Complaints by Year");

    function update(data) {
        // X Axis
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, width]);

        plot_g.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format("d")));
        
        // Y Axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.comp) + 16])
            .range([height, 0]);

        plot_g.append("g")
            .attr("transform", `translate(${0},${0})`)
            .call(d3.axisLeft(y));
        
        plot_g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#eb6b38")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function(d) {return x(d.year)})
                .y(function(d) {return y(d.comp)}));

        const mouse_g = plot_g.append("g")
            .classed("mouse", true)
            .style("display", "none");

        mouse_g.append('rect')
            .attr('width', 2)
            .attr('x',-1)
            .attr('height', height)
            .attr('fill', 'lightgray')
            .attr('stroke-opacity', '0');

        mouse_g.append('circle')
            .attr('r', 3)
            .attr("stroke", "lightgray");

        mouse_g.append('text');

        svg.on("mouseover", function(mouse) {
            mouse_g.style("display", "block");
        });

        const [min_year, max_year] = d3.extent(data, d => d.year);
        svg.on("mousemove", function(mouse) {
            const [x_cord, y_cord] = d3.pointer(mouse);
            const ratio = x_cord / width;
            const current_year = min_year + Math.round(ratio * (max_year - min_year));
            const comp_now = data.find(d => d.year === current_year).comp;
            
            mouse_g.attr('transform', `translate(${x(current_year)},${0})`);
            
            mouse_g.select('text')
            .text(`Complaints: ${comp_now}`)
            .attr('text-anchor', current_year < (min_year + max_year) / 2 ? "start" : "end")
            .attr('font-family', 'sans-serif')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold');

            mouse_g.select('circle')
            .attr('cy', y(comp_now));
        });
        svg.on("mouseout", function(mouse) {
            mouse_g.style('display', 'none');
          });
        
        return svg.node();
    }

    update(romani_data);
}