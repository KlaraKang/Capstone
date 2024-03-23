const margin = {top: 50, right: 200, bottom: 80, left: 50},
      width =  window.innerWidth*.95, 
      height =  window.innerHeight*.95,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom;

/*********** CHART1. GROUPED BAR CHART: ECONOMIC STATUS ***********/

d3.csv("./Dataset/GradBoroPov.csv", (d, i, columns) => {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }).then(data => {

    let category = data.columns.slice(1);

    const svg = d3.select("#container_top")
              .append("svg")
                .attr("width", width/2)
                .attr("height", height/2 + margin.top + margin.bottom)
              .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

    let x0 = d3.scaleBand()
            .rangeRound([0, width/2 - margin.right])
            .paddingInner(0.1);

    let x1 = d3.scaleBand()
            .padding(0.05);

    let yAxis = d3.scaleLinear()
            .rangeRound([height/2, 0]);

    let colorScale = d3.scaleOrdinal()
            .range(["#E8590B","#909F9D"]);

    x0.domain(data.map(d=> d.Borough));
    x1.domain(category).rangeRound([0, x0.bandwidth()]);
    yAxis.domain([0, d3.max(data, d=> d3.max(category, key=>d[key]))]).nice();

    svg.append("g").selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d=> `translate(${x0(d.Borough)},${0})`)
        .selectAll("rect")
        .data(d=> category.map(function(key) { return {key: key, value: d[key]}; }))
        .join("rect")
            .attr("x", d=> x1(d.key))
            .attr("y", d=> yAxis(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d=> height/2 - yAxis(d.value))
            .attr("fill", d=> colorScale(d.key));

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", `translate(${0},${height/2})`)
       .call(d3.axisBottom(x0));

    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yAxis).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", yAxis(yAxis.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Graduation Rates (%)")
      
  /* GRID LINE FOR THE CITY AVERAGE VALUE */
    svg.selectAll("line.grid")
        .data(yAxis.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yAxis(83.7))
          .attr("x2", width/2 - margin.right)
          .attr("y2", yAxis(83.7))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "3 3");

    svg.append("text")
          .attr("x", width/2 - margin.right +10) 
          .attr("y", yAxis(83.7)) 
          .style("fill","red")
          .style("font-size","10px")
          .text("City Average: 83.7%");

  /* LEGEND */
    let legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(category.slice())
        .join("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
       .attr("x", innerWidth/2 + 20)
       .attr("width", 15)
       .attr("height", 15)
       .attr("fill", colorScale);

    legend.append("text")
       .attr("x", innerWidth/2 + 15)
       .attr("y", 10)
       .attr("dy", "0.32em")
       .text(d=>d);
});

/*********** CHART2. GROUPED BAR CHART: ELL ***********/

d3.csv("./Dataset/GradBoroEng.csv", (d, i, columns) => {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
   }).then(data => {
    
        let category = data.columns.slice(1);
   
   const svg = d3.select("#container_top")
               .append("svg")
                 .attr("width", width/2)
                 .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                 .attr("transform", `translate(${margin.left},${margin.top})`);
    
   let x0 = d3.scaleBand()
              .rangeRound([0, innerWidth/2])
              .paddingInner(0.1);
    
   let x1 = d3.scaleBand()
              .padding(0.05);
    
   let yAxis = d3.scaleLinear()
                .rangeRound([height/2,0])//-margin.top-margin.bottom]);
    
   let colorScale = d3.scaleOrdinal()
                .range(["#FDD538","#D9B282","#909F9D"]);
    
   x0.domain(data.map(d=> d.Borough));
   x1.domain(category).rangeRound([0, x0.bandwidth()]);
   yAxis.domain([0, d3.max(data, d=> d3.max(category, key=>d[key]))]).nice();
    
   svg.append("g").selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d=> `translate(${x0(d.Borough)},${0})`)
        .selectAll("rect")
        .data(d=> category.map(function(key) { return {key: key, value: d[key]}; }))
        .join("rect")
            .attr("x", d=> x1(d.key))
            .attr("y", d=> yAxis(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d=> height/2 - yAxis(d.value))
            .attr("fill", d=> colorScale(d.key));
    
   svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${0},${height/2})`)
        .call(d3.axisBottom(x0));

   svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(yAxis).ticks(null, "s"))
        .append("text")
          .attr("x", 2)
          .attr("y", yAxis(yAxis.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Graduation Rates (%)");

  /* GRID LINE FOR THE CITY AVERAGE VALUE */
   svg.selectAll("line.grid")
      .data(yAxis.ticks(5))
      .enter()
      .append("line")
        .attr("class", "grid")
        .attr("x1", 0)
        .attr("y1", yAxis(83.7))
        .attr("x2", innerWidth/2)
        .attr("y2", yAxis(83.7))
        .style("stroke", "red")
        .style("stroke-width", 0.5)
        .style("stroke-dasharray", "3 3");
/*
   svg.append("text")
      .attr("x", -100) 
      .attr("y", yAxis(83.7)) 
      .style("fill","red")
      .style("font-size","10px")
      .text("City Average: 83.7%"); 
*/
   /* REGEND */
   let legend = svg.append("g")
           .attr("font-family", "sans-serif")
           .attr("font-size", 10)
           .attr("text-anchor", "end")
           .selectAll("g")
           .data(category.slice())
           .join("g")
             .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   
   legend.append("rect")
          .attr("x", innerWidth/2 + margin.left + 10)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", colorScale);
   
   legend.append("text")
          .attr("x", innerWidth/2 + margin.left + 5)
          .attr("y", 10)
          .attr("dy", "0.32em")
          .text(d=>d);
})
    
/*********** CHART3. GROUPED BAR CHART: DISABILITY ***********/

d3.csv("./Dataset/GradBoroDisab.csv", (d, i, columns) => {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
   }).then(data => {
    
   let category = data.columns.slice(1).reverse();
    
   const svg = d3.select("#container_bottom")
                 .append("svg")
                   .attr("width", width/2)
                   .attr("height", height/2 + margin.top + margin.bottom)
                 .append("g")
                   .attr("transform", `translate(${margin.left},${margin.top})`);
    
   let x0 = d3.scaleBand()
             .rangeRound([0, width/2 - margin.right])
             .paddingInner(0.1);
    
   let x1 = d3.scaleBand()
              .padding(0.05);
    
   let yAxis = d3.scaleLinear()
                .rangeRound([height/2, 0]);
    
   let colorScale = d3.scaleOrdinal()
                .range(["#58FAF4","#909F9D"]);
    
   x0.domain(data.map(d=> d.Borough));
   x1.domain(category).rangeRound([0, x0.bandwidth()]);
   yAxis.domain([0, d3.max(data, d=> d3.max(category, key=>d[key]))]).nice();
    
   svg.append("g").selectAll("g")
        .data(data)
        .join("g")
           .attr("transform", d=> `translate(${x0(d.Borough)},${0})`)
           .selectAll("rect")
           .data(d=> category.map(function(key) { return {key: key, value: d[key]}; }))
           .join("rect")
              .attr("x", d=> x1(d.key))
              .attr("y", d=> yAxis(d.value))
              .attr("width", x1.bandwidth())
              .attr("height", d=> height/2 - yAxis(d.value))
              .attr("fill", d=> colorScale(d.key));
    
   svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${0},${height/2})`)
      .call(d3.axisBottom(x0));
    
   svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yAxis).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", yAxis(yAxis.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Graduation Rates (%)");

  /* GRID LINE FOR THE CITY AVERAGE VALUE */
   svg.selectAll("line.grid")
      .data(yAxis.ticks(5))
      .enter()
      .append("line")
       .attr("class", "grid")
       .attr("x1", 0)
       .attr("y1", yAxis(83.7))
       .attr("x2", width/2 - margin.right)
       .attr("y2", yAxis(83.7))
       .style("stroke", "red")
       .style("stroke-width", 0.5)
       .style("stroke-dasharray", "3 3");

   svg.append("text")
         .attr("x", width/2 - margin.right +10) 
         .attr("y", yAxis(83.7)) 
         .style("fill","red")
         .style("font-size","10px")
         .text("City Average: 83.7%"); 

   /* LEGEND */      
   let legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(category.slice())
            .join("g")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
   legend.append("rect")
           .attr("x", innerWidth/2 + 20)
           .attr("width", 15)
           .attr("height", 15)
           .attr("fill", colorScale);
    
   legend.append("text")
           .attr("x", innerWidth/2 + 15)
           .attr("y", 10)
           .attr("dy", "0.32em")
           .text(d=>d);
    });
       
/*** CHART4. HEATMAP: GRADUATION BY ECONOMIC STATUS FOR ALL SCHOOL DISTRICTS ***/

  /* LOAD DATA */
d3.csv('./Dataset/GradDistByCategory.csv', d3.autoType)
  .then(data => {

 /* Filter data */
  const poverty = [... new Set(data.filter(d=>d.Category === "Poverty")
                                 .map(d=>d.subCategory))];
  const language = [... new Set(data.filter(d=>d.Category === "English")
                                  .map(d=>d.subCategory))];
  const disability = [... new Set(data.filter(d=>d.Category === "Disability")
                                    .map(d=>d.subCategory).reverse())];
  const district = [... new Set(data.map(d=>d.District))];

  const category = poverty.concat(language).concat(disability);

   /* APPEND SVG */
   let svg = d3.select("#container_bottom")
        .append("svg")
          .attr("width", width/2)
          .attr("height", height/2 + margin.bottom*2 + margin.top)
        .append("g")
          .attr("transform", `translate(${0},${0})`);

   /* X AXIS SCALE*/    
   let xScale = d3.scaleBand()
          .range([margin.left, width/2])
          .domain(category)
          .padding(0.05);
  
   svg.append("g")
      .attr("transform", `translate(${0},${height/2 + + margin.bottom + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .style("font-size", "10px")
      .select(".domain").remove()

   /* Y AXIS SCALE */
   let yScale = d3.scaleBand()
        .range([margin.top, height/2 + margin.top + margin.bottom])
        .domain(district)
        .padding(0.1);

   svg.append("g")
      .style("font-size", "10px")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yScale).tickSize(0))      
      .select(".domain").remove()
    
  /* COLOR SCALE */
  let colorScale = d3.scaleSequential([30, 100], d3.interpolateReds);

  /* TOOLTIPS */
tooltip = svg.append("div.tooltip")              
            .attr("class", "tooltip")
            .style("visibility", "hidden")
            .attr("x",0)
            .attr("y",0)
            .style("top", 0)
            .style("left", 0)              
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "2px")
            .style("padding", "0.5px")

tooltip.append("text")
        .attr("fill","black")
        .style("pointer-events","none");

  /* TOOLTIP FUNCTIONS */
   const mouseover = function(event, d) {
     tooltip
       .style("opacity", 1)
       .style("visibility","visible")

     d3.select(this)
       .style("stroke", "grey")
       .style("opacity", 1)
   }
   const mousemove = function(event, d, i) {
   const [mx, my] = d3.pointer(event);
     tooltip
       .html(`"Grad Rate: " ${d.Percent_Grads}`)
       .style("visibility","visible")
       .style("left", `${mx}px`)
       .style("top", `${my}px`)
   }
   const mouseleave = function(event,d) {
     tooltip
       .style("opacity", 0)

     d3.select(this)
       .style("stroke", "none")
       .style("opacity", 0.8)
   }
            
   /* SELECT - JOIN - DATA FOR THE SQUARES */
   svg.selectAll()
      .data(data, d=>d.id)
      .join("rect")
       .attr("x", d => xScale(d.subCategory))
       .attr("y", d => yScale(d.District))
       .attr("rx", 2)
       .attr("ry", 2)
       .attr("width", xScale.bandwidth())
       .attr("height", yScale.bandwidth())
       .style("fill", d => colorScale(d.Percent_Grads))
       .style("stroke-width", 4)
       .style("stroke", "none")
       .style("opacity", 1)
         .on("mouseover", mouseover)
         .on("mousemove", mousemove)
         .on("mouseleave", mouseleave)
      
    /*
      .on("mouseover", function(event, d){
          tooltip
            .html(`${d.Percent_Grads}+"%"`)
            .style("visibility", "visible")
        }) 
      .on("mousemove", function(event){
          tooltip
            .style("left", (event.pageX + 30 + "px"))
            .style("top", (event.pageY + "px"))
        })         
      .on("mouseout", function(event,d){
          tooltip
          .html(``)
          .style("visibility", "hidden");
        }) 
    */
   /* HEATMAP TITLE */
   svg.append("text")
      .attr("x", width/4)
      .attr("y", margin.top-10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("District-Level Graduation Rates by Category");  
      console.log("end of heatmap",data)  
})


