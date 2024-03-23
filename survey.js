  /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*.45,
      height = window.innerHeight*.8,
      margin = {top:50, bottom:30, left:150, right:10},
      innerWidth = width - margin.right - margin.left, 
      innerHeight = height - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('./Dataset/SurveyBoro.csv', d3.autotype)
  .then(data => {
    
   /* FILTER DATA */
  const category = [... new Set(data.map(d=>d.Category))];
  const boro = [... new Set(data.map(d=>d.Borough))]; 

 console.log("boro",boro)

   /* APPEND SVG */
   const container = d3.select("#container_right")
         .append("svg")
           .attr("width", width)
           .attr("height", height)
         .append("g")
           .attr("transform", `translate(${0},${0})`);
 
   /* X AXIS SCALE*/    
   let xScale = d3.scaleBand()
           .range([margin.left, width])
           .domain(boro)
           .padding(0.05);
   
   container.append("g")
       .attr("transform", `translate(${0},${innerHeight})`)
       .call(d3.axisBottom(xScale).tickSize(0))
       .style("font-size", "10px")
       .select(".domain").remove()
 
   /* Y AXIS SCALE */
   let yScale = d3.scaleBand()
         .range([margin.top, innerHeight])
         .domain(category)
         .padding(0.1);
 
   container.append("g")
       .style("font-size", "10px")
       .attr("transform", `translate(${margin.left},${0})`)
       .call(d3.axisLeft(yScale).tickSize(0))      
       .select(".domain").remove()
     
   /* COLOR SCALE */
   let colorScale = d3.scaleSequential([70, 90], d3.interpolatePuBuGn);
   
   /* TOOLTIPS */
   tooltip = container.append("div.tooltip")              
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
        .html(`<div>"% Positive: " ${d.Percent}</div>`)
        .style("visibility","visible")
        .style("opacity", 1)
        .style("fill","black")
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
   container.selectAll()
       .data(data, d=>d.id)
       .join("rect")
        .attr("x", d => xScale(d.Borough))
        .attr("y", d => yScale(d.Category))
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .style("fill", d=>colorScale(d.Percent))
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 1)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
          
   container.selectAll()
          .data(data, d=>d.id) 
          .join("text")
            .attr("x", d => xScale(d.Borough)+xScale.bandwidth()/2)
            .attr("y", d => yScale(d.Category)+yScale.bandwidth()/2)
            .style("fill", "#1F2221")
            .style("font-size", "12px")
            .style("text-anchor","middle")
            .text(d=>d.Percent+" %")    
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
   container.append("text")
       .attr("x", innerWidth/3 + 10)
       .attr("y", margin.top-10)
       .attr("text-anchor", "start")
       .style("font-size", "14px")
       .style("font-weight", "bold")
       .text("Percent Positive for Each Framework");  
    
 
 })
 