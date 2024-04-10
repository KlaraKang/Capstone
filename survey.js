  /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*.45,
      height = window.innerHeight*.8,
      margin = {top:50, bottom:50, left:160, right:10},
      innerWidth = width - margin.right - margin.left, 
      innerHeight = height - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('./Dataset/SurveyBoro.csv', d3.autotype)
  .then(rawdata => {
    
   /* FILTER DATA */
  const data = rawdata.filter(d=> d.id < 31)
  const category = [... new Set(data.map(d=>d.Category))];
  const boro = [... new Set(data.map(d=>d.Borough).sort())]; 

  console.log("boro",boro)

   /* APPEND SVG */
  const container = d3.select("#container_right")

  let svg = container.append("svg")
           .attr("width", width)
           .attr("height", height)
          .append("g")
           .attr("transform", `translate(${0},${0})`);
 
   /* X AXIS SCALE*/    
  let xScale = d3.scaleBand()
           .range([margin.left, width])
           .domain(boro)
           .padding(0.05);
   
  svg.append("g")
       .attr("transform", `translate(${0},${innerHeight*2/3})`)
       .call(d3.axisBottom(xScale).tickSize(0))
       .style("font-size", "12px")
       .select(".domain").remove()
 
   /* Y AXIS SCALE */
  let yScale = d3.scaleBand()
         .range([margin.top, innerHeight*2/3])
         .domain(category)
         .padding(0.1);
 
  svg.append("g")
       .style("font-size", "12px")
       .attr("transform", `translate(${margin.left+5},${0})`)
       .call(d3.axisLeft(yScale).tickSize(0))      
       .select(".domain").remove()
     
   /* COLOR SCALE */
  let colorScale = d3.scaleSequential([70, 90], d3.interpolatePuBuGn);
   
   /* TOOLTIPS */
  tooltip = container.append("div")              
             .attr("class", "tooltip")
             .style("visibility", "hidden")
 
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
        .html(`<div>Positive: ${d.Percent}%</div>`)
        .style("visibility","visible")
        .style("opacity", 1)
        .style("fill","black")
        .style("left", `${mx}px`)
        .style("top", `${my+15}px`)
   }
   const mouseout = function(event,d) {
      tooltip
        .style("opacity", 0)
 
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 1)
   }
             
   /* SELECT - JOIN - DATA FOR THE SQUARES */
  svg.selectAll()
       .data(data, d=>d.id)
       .join(
        enter=>enter
        .append("rect")
        .attr("x", d => xScale(d.Borough))
        .attr("y", d => yScale(d.Category))
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .style("fill", d=>colorScale(d.Percent))
        .style("stroke-width", 4)
        .style("stroke", "none")
          .on("mouseover", mouseover) 
          .on("mousemove", mousemove)         
          .on("mouseout", mouseout) 
        )

    /* HEATMAP TITLE */
  svg.append("text")
       .attr("x", innerWidth/2 + margin.left)
       .attr("y", innerHeight*2/3+margin.top)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .style("font-weight", "bold")
       .text("Chart 33. Percent Positive for Each Framework Element");  
    
/******** SURVEY RESPONSE RATES ********/ 

  /* FILTER DATA */
  const parent = rawdata.filter(d => d.Category == "Parent_Response");

  /* SCALES */
  let xScale2 = d3.scaleBand()
              .domain(parent.map(d=> d.Borough))
              .range([margin.left, width-margin.left])
              .padding(.15)          

  let yScale2 = d3.scaleLinear()
              .domain([0, 100])
              .range([innerHeight/2, 0])
        
  let colorScale2 = d3.scaleOrdinal()
              .domain(parent.map(d=> d.Borough))
              .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])

  /* SVG ELEMENTS */
  const container2 = d3.select("#container_bottom")
            .append("svg")
              .attr("width", width)
              .attr("height", height/2)
            .append("g")
              .attr("transform",`translate(${0},${0})`);

  container2.append("g")
            .call(d3.axisBottom(xScale2).tickSizeOuter(0))
              .attr("transform", `translate(${0},${innerHeight/2})`)            
            .append("text")
              .attr("x",width/2)
              .attr("y", margin.bottom-5)
              .attr("fill","black")
              .attr("text-anchor","middle")
              .attr("font-size","14px")
              .style("font-weight", "bold")
              .text("Chart 34. Parent Response Rates")

  /* For the first chart: SELECT - DATA JOIN - DRAW */
  container2.selectAll("rect")
            .data(parent)
            .join("rect")
            .attr("width", xScale2.bandwidth())
            .attr("height", 0)
            .attr("x", d =>xScale2(d.Borough))
            .attr("y", innerHeight/2)
            .attr("fill", d=>colorScale2(d.Borough))
            .transition()
              .duration(800)
              .attr("y", d=>yScale2(d.Percent))
              .attr("height", d=>innerHeight/2 - yScale2(d.Percent))
              .delay((d,i) => i*200)
              .attr("fill", d=>colorScale2(d.Borough))             

  container2.selectAll("text.bar-label")
    .data(parent, d=>d.id)
    .join("text")
      .attr("class","bar-label") 
      .text(d => d.Percent + "%")            
      .attr("x", d => xScale2(d.Borough)+xScale2.bandwidth()/2)
      .attr("y", innerHeight/2)
      .attr("opacity",0)
      .transition()
        .duration(800)
        .delay((d,i) => i*200)
        .attr("y", d => yScale2(d.Percent)-5)
        .attr("font-size","12px")
        .style("fill","#190707")
        .style("font-weight","bold")
        .attr("text-anchor", "middle")
        .attr("opacity",1);

    /* FILTER DATA */
    const student = rawdata.filter(d => d.Category == "Student_Response");
  
    /* SCALES */
    let xScale3 = d3.scaleBand()
                .domain(student.map(d=> d.Borough))
                .range([margin.left, width-margin.left])
                .padding(.15)          
  
    let yScale3 = d3.scaleLinear()
                .domain([0, 100])
                .range([height/2+margin.top, margin.top])
          
    let colorScale3 = d3.scaleOrdinal()
                .domain(student.map(d=> d.Borough))
                .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
  
    /* SVG ELEMENTS */
    const container3 = d3.select("#container_bottom")
              .append("svg")
                .attr("width", width)
                .attr("height", height/2+margin.top)
              .append("g")
                .attr("transform",`translate(${0},${0})`);
  
    container3.append("g")
              .call(d3.axisBottom(xScale3).tickSizeOuter(0))
                .attr("transform", `translate(${0},${innerHeight/2+margin.top})`)            
              .append("text")
                .attr("x",width/2)
                .attr("y", margin.bottom-5)
                .attr("fill","black")
                .attr("text-anchor","middle")
                .attr("font-size","14px")
                .style("font-weight", "bold")
                .text("Chart 35. Student Response Rates")
  
    /* For the first chart: SELECT - DATA JOIN - DRAW */
    container3.selectAll("rect")
              .data(student)
              .join("rect")
              .attr("width", xScale3.bandwidth())
              .attr("height", 0)
              .attr("x", d =>xScale3(d.Borough))
              .attr("y", innerHeight/2+margin.top)
              .attr("fill", d=>colorScale3(d.Borough))
              .transition()
                .duration(800)
                .attr("y", d=>yScale3(d.Percent))
                .attr("height", d=>innerHeight/2+margin.top - yScale3(d.Percent))
                .delay((d,i) => i*200)
                .attr("fill", d=>colorScale3(d.Borough))             
  
    container3.selectAll("text.bar-label")
              .data(student, d=>d.id)
              .join("text")
                .attr("class","bar-label") 
                .text(d => d.Percent + "%")            
                .attr("x", d => xScale3(d.Borough)+xScale3.bandwidth()/2)
                .attr("y", innerHeight/2)
                .attr("opacity",0)
                .transition()
                  .duration(800)
                  .delay((d,i) => i*200)
                  .attr("y", d => yScale3(d.Percent)-5)
                  .attr("font-size","12px")
                  .style("fill","#190707")
                  .style("font-weight","bold")
                  .attr("text-anchor", "middle")
                  .attr("opacity",1);       
})
 