 
  /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*.8,
      height = window.innerHeight*.8,
      margin = {top:20, bottom:50, left:50, right:50},
      innerWidth = width - margin.right - margin.left, 
      innerHeight = height - margin.top - margin.bottom;
  
  /* LOAD DATA */
d3.csv('./Dataset/GradDistict.csv', d3.autoType)
    .then(data => {

   /* Filter data */
  const ethnicity = [... new Set(data.map(d=>d.subCategory))];
  const district = [... new Set(data.map(d=>d.District))];

  console.log("ethnicity",ethnicity)
  console.log("district",district)

/* HEATMAP1: POPULATION BY ETHNICITY FOR ALL SCHOOL DISTRICTS  */
   /* APPEND SVG */
   const container2 = d3.select("#container_top")
                  
   svg2 = container2.append("svg")
                     .attr("width", width/2)
                     .attr("height", height/2 + margin.bottom*2 + margin.top)
                    .append("g")
                     .attr("transform", `translate(${0},${0})`);
 
   /* X AXIS SCALE*/    
   xScale2 = d3.scaleBand()
             .range([margin.left, width/2])
             .domain(ethnicity)
             .padding(0.05);
     
   svg2.append("g")
       .attr("transform", `translate(${0},${margin.top*2})`)
       .call(d3.axisBottom(xScale2).tickSize(0))
       .style("font-size", "11px")
       .style("font-weight", "bold")
       .select(".domain").remove()
 
   /* Y AXIS SCALE */
   yScale2 = d3.scaleBand()
           .range([margin.top, height/2+margin.bottom])
           .domain(district)
           .padding(0.1);
 
   svg2.append("g")
       .style("font-size", "10px")
       .attr("transform", `translate(${margin.left},${margin.top*2})`)
       .call(d3.axisLeft(yScale2).tickSize(0))      
       .select(".domain").remove()
       
   /* COLOR SCALE */
   colorScale2 = d3.scaleSequential([0, 80], d3.interpolateBlues);
   
   /* TOOLTIPS */
   let tooltip2 = container2.append("div")              
               .attr("class", "tooltip")
               .style("visibility", "hidden")
   
   tooltip2.append("text")
           .attr("fill","black")
           .style("pointer-events","none");
 
   // TOOLTIP FUNCTIONS 
  const mouseover2 = function(event, d) {
     tooltip2
       .style("opacity", 1)
       .style("visibility","visible")
 
     d3.select(this)
       .style("stroke", "orange")
       .style("stroke-width", 3)
       .style("opacity", 1)
   }
   const mousemove2 = function(event, d, i) {
     const [mx, my] = d3.pointer(event);
     tooltip2
       .html(`<div>Distrcit ${d.District}</div>
       <div>${d.Percent_Cohort}% ${d.subCategory}</div>`)
       .style("visibility","visible")
       .style("top", `${my+550}px`)
       .style("left", `${mx+20}px`)
       
   }
   const mouseout2 = function(event,d) {
     tooltip2
       .style("opacity", 0)
 
     d3.select(this)
       .style("stroke", "none")
       .style("opacity", 1)
   }
               
   /* SELECT - JOIN - DATA FOR THE SQUARES */
   svg2.selectAll("rect")
     .data(data, d=>d.id)
     .join(
       enter => enter
       .append("rect")
         .attr("x", d => xScale2(d.subCategory))
         .attr("y", d => yScale2(d.District)+margin.top*2)
         .attr("rx", 3)
         .attr("ry", 3)
         .attr("width", xScale2.bandwidth()-2)
         .attr("height", yScale2.bandwidth())
         .style("fill", d => colorScale2(d.Percent_Cohort))
         .on("mouseover", mouseover2)
         .on("mousemove", mousemove2)
         .on("mouseout", mouseout2)
       )
     
   /* HEATMAP TITLE */
   svg2.append("text")
         .attr("x", innerWidth/4 +10)
         .attr("y", height/2+margin.top*2+margin.bottom+25)
         .attr("text-anchor", "middle")
         .style("font-size", "12px")
         .style("font-weight", "bold")
         .text("Chart 20. % Ethnicity in Each School District");  
     

/* HEATMAP2: GRADUATION BY ETHNICITY FOR ALL SCHOOL DISTRICTS  */

  /* APPEND SVG */
  const container3 = d3.select("#container_top")
                  
  svg3 = container3.append("svg")
                    .attr("width", width/2+margin.left+margin.right)
                    .attr("height", height/2 + margin.bottom*2 + margin.top)
                   .append("g")
                    .attr("transform", `translate(${margin.left+margin.right},${0})`);

  /* X AXIS SCALE*/    
  xScale3 = d3.scaleBand()
            .range([margin.left, width/2])
            .domain(ethnicity)
            .padding(0.05);
    
  svg3.append("g")
      .attr("transform", `translate(${0},${margin.top*2})`)
      .call(d3.axisBottom(xScale3).tickSize(0))
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .select(".domain").remove()

  /* Y AXIS SCALE */
  yScale3 = d3.scaleBand()
          .range([margin.top, height/2+margin.bottom])
          .domain(district)
          .padding(0.1);

  svg3.append("g")
      .style("font-size", "10px")
      .attr("transform", `translate(${margin.left},${margin.top*2})`)
      .call(d3.axisLeft(yScale3).tickSize(0))      
      .select(".domain").remove()
      
  /* COLOR SCALE */
  colorScale3 = d3.scaleSequential([40, 100], d3.interpolateGreens);
  
  /* TOOLTIPS */
  let tooltip3 = container3.append("div")              
              .attr("class", "tooltip")
              .style("visibility", "hidden")
  
  tooltip3.append("text")
          .attr("fill","black")
          .style("pointer-events","none");

  // TOOLTIP FUNCTIONS 
 const mouseover3 = function(event, d) {
    tooltip3
      .style("opacity", 1)
      .style("visibility","visible")

    d3.select(this)
      .style("stroke", "orange")
      .style("stroke-width", 3)
      .style("opacity", 1)
  }
  const mousemove3 = function(event, d, i) {
    const [mx, my] = d3.pointer(event);
    tooltip3
      .html(`<div>Distrcit ${d.District} ${d.subCategory}</div>
      <div>Grad Rate: ${d.Percent_Grads}%</div>`)
      .style("visibility","visible")
      .style("top", `${my+550}px`)
      .style("left", `${mx+width/2+130}px`)
      
  }
  const mouseout3 = function(event,d) {
    tooltip3
      .style("opacity", 0)

    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
              
  /* SELECT - JOIN - DATA FOR THE SQUARES */
  svg3.selectAll("rect")
    .data(data, d=>d.id)
    .join(
      enter => enter
      .append("rect")
        .attr("x", d => xScale3(d.subCategory))
        .attr("y", d => yScale3(d.District)+margin.top*2)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", xScale3.bandwidth()-2)
        .attr("height", yScale3.bandwidth())
        .style("fill", d => colorScale3(d.Percent_Grads))
        .on("mouseover", mouseover3)
        .on("mousemove", mousemove3)
        .on("mouseout", mouseout3)
      )
    
  /* HEATMAP TITLE */
  svg3.append("text")
        .attr("x", innerWidth/4 +10)
        .attr("y", height/2+margin.top*2+margin.bottom+25)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text("Chart 21. Graduation Rates by Ethnicity in Each District");  
    
})



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

/*** HEATMAP 3: POPULATION BY DEMOGRAPHICS FOR ALL SCHOOL DISTRICTS ***/

   /* APPEND SVG */
   const container4 = d3.select("#container_bottom");

   let svg4 = container4.append("svg")
           .attr("width", width/2+margin.left+margin.right)
           .attr("height", height/2 + margin.bottom*2 + margin.top)
         .append("g")
           .attr("transform", `translate(${0},${0})`);
 
    /* X AXIS SCALE*/    
    let xScale4 = d3.scaleBand()
           .range([margin.left, width/2])
           .domain(category)
           .padding(0.05);
   
    svg4.append("g")
       .attr("transform", `translate(${0},${0})`)
       .call(d3.axisBottom(xScale4).tickSize(0))
       .style("font-size", "11px")
       .style("font-weight", "bold")
       .select(".domain").remove()
 
    /* Y AXIS SCALE */
    let yScale4 = d3.scaleBand()
         .range([margin.top, height/2 + margin.bottom])
         .domain(district)
         .padding(0.1);
 
    svg4.append("g")
       .style("font-size", "10px")
       .attr("transform", `translate(${margin.left},${0})`)
       .call(d3.axisLeft(yScale4).tickSize(0))      
       .select(".domain").remove()
     
   /* COLOR SCALE */
   let colorScale4 = d3.scaleSequential([0, 95], d3.interpolatePurples);
 
     /* TOOLTIPS */
   let tooltip4 = container4.append("div")              
           .attr("class", "tooltip")
           .style("visibility", "hidden")
 
   tooltip4.append("text")
           .attr("fill","black")
           .style("pointer-events","none");
 
   // TOOLTIP FUNCTIONS 
   const mouseover4 = function(event, d) {
     tooltip4
       .style("opacity", 1)
       .style("visibility","visible")
 
     d3.select(this)
       .style("stroke", "grey")
       .style("stroke-width", 3)
       .style("opacity", 1)
     }
   const mousemove4 = function(event, d, i) {
     const [mx, my] = d3.pointer(event);
     tooltip4
       .html(`<div>Distrcit ${d.District}</div>
       <div>${d.Percent_Cohort}% ${d.subCategory}</div>`)
       .style("visibility","visible")
       .style("top", `${my+height+450}px`)
       .style("left", `${mx+20}px`)
       
     }
   const mouseleave4 = function(event,d) {
     tooltip4
     .style("opacity", 0)
 
     d3.select(this)
     .style("stroke", "none")
     .style("opacity", 1)
   }
         
    /* SELECT - JOIN - DATA FOR THE SQUARES */
    svg4.selectAll()
       .data(data, d=>d.id)
       .join(
         enter => enter
         .append("rect")
        .attr("x", d => xScale4(d.subCategory))
        .attr("y", d => yScale4(d.District))
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("width", xScale4.bandwidth())
        .attr("height", yScale4.bandwidth())
        .style("fill", d => colorScale4(d.Percent_Cohort))
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 1)
          .on("mouseover", mouseover4)
          .on("mousemove", mousemove4)
          .on("mouseleave", mouseleave4)
       )
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
    svg4.append("text")
       .attr("x", width/4)
       .attr("y", height/2+margin.top+50)
       .attr("text-anchor", "middle")
       .style("font-size", "12px")
       .style("font-weight", "bold")
       .text("Chart 22. % Students by Demographic Category in Each District");  
   
/*** HEATMAP 4: GRADUATION BY DEMOGRAPHICS FOR ALL SCHOOL DISTRICTS ***/

   /* APPEND SVG */
  const container5 = d3.select("#container_bottom");

  let svg5 = container5.append("svg")
          .attr("width", width/2)
          .attr("height", height/2 + margin.bottom*2 + margin.top)
        .append("g")
          .attr("transform", `translate(${0},${0})`);

   /* X AXIS SCALE*/    
   let xScale5 = d3.scaleBand()
          .range([margin.left, width/2])
          .domain(category)
          .padding(0.05);
  
   svg5.append("g")
      .attr("transform", `translate(${0},${0})`)
      .call(d3.axisBottom(xScale5).tickSize(0))
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .select(".domain").remove()

   /* Y AXIS SCALE */
   let yScale5 = d3.scaleBand()
        .range([margin.top, height/2 + margin.bottom])
        .domain(district)
        .padding(0.1);

   svg5.append("g")
      .style("font-size", "10px")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yScale5).tickSize(0))      
      .select(".domain").remove()
    
  /* COLOR SCALE */
  let colorScale5 = d3.scaleSequential([30, 100], d3.interpolateReds);

    /* TOOLTIPS */
  let tooltip5 = container5.append("div")              
          .attr("class", "tooltip")
          .style("visibility", "hidden")

  tooltip5.append("text")
          .attr("fill","black")
          .style("pointer-events","none");

  // TOOLTIP FUNCTIONS 
  const mouseover5 = function(event, d) {
    tooltip5
      .style("opacity", 1)
      .style("visibility","visible")

    d3.select(this)
      .style("stroke", "grey")
      .style("stroke-width", 3)
      .style("opacity", 1)
    }
  const mousemove5 = function(event, d, i) {
    const [mx, my] = d3.pointer(event);
    tooltip5
      .html(`<div>Distrcit ${d.District} ${d.subCategory}</div>
      <div>Grad Rate: ${d.Percent_Grads}%</div>`)
      .style("visibility","visible")
      .style("top", `${my+height+450}px`)
      .style("left", `${mx+width/2+130}px`)
    }
  const mouseleave5 = function(event,d) {
    tooltip5
    .style("opacity", 0)

    d3.select(this)
    .style("stroke", "none")
    .style("opacity", 1)
  }
        
   /* SELECT - JOIN - DATA FOR THE SQUARES */
   svg5.selectAll()
      .data(data, d=>d.id)
      .join(
        enter => enter
        .append("rect")
       .attr("x", d => xScale5(d.subCategory))
       .attr("y", d => yScale5(d.District))
       .attr("rx", 2)
       .attr("ry", 2)
       .attr("width", xScale5.bandwidth())
       .attr("height", yScale5.bandwidth())
       .style("fill", d => colorScale5(d.Percent_Grads))
       .style("stroke-width", 4)
       .style("stroke", "none")
       .style("opacity", 1)
         .on("mouseover", mouseover5)
         .on("mousemove", mousemove5)
         .on("mouseleave", mouseleave5)
      )
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
   svg5.append("text")
      .attr("x", width/4)
      .attr("y", height/2+margin.top+margin.bottom)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Chart 23. Graduation Rates by Demographic Category in Each District");  
      
})


