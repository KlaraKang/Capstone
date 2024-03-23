  /* GLOBAL CONSTANTS AND VARIABLES */
const margin = {top: 30, right: 100, bottom: 20, left: 100},
      width =  window.innerWidth*.8, 
      height =  window.innerHeight*.8; 

let legendRectSize = 15,
    legendSpacing = 5,
    legendHeight = legendRectSize + legendSpacing;

let angleGen, arcGen, legend, legendColor;
let svg1, svg2, svg3, svg4, svg5, svg6;
    
let w = 210, h = 210,
    outerRadius = w/3,
    innerRadius = 30;
    
d3.csv('./Dataset/SchoolsAB.csv')
  .then(rawdata => {
   
    const BXdata = rawdata.filter(d => d.Borough === "Bronx");
    const BKdata = rawdata.filter(d => d.Borough === "Brooklyn");
     const MTdata = rawdata.filter(d => d.Borough === "Manhattan");
    const QSdata = rawdata.filter(d => d.Borough === "Queens");
    const SIdata = rawdata.filter(d => d.Borough === "Staten Island");
    const AllData = rawdata.filter(d => d.Borough === "All");   
    
/********** Six PIE CHARTS **********/    
  angleGen = d3.pie()
            .startAngle(0)
            .endAngle(2*Math.PI)
            .value((d,i) => +d.Total)
            .sort(null)
            .padAngle(.01);
                
  arcGen = d3.arc()  
          .outerRadius(outerRadius)
          .innerRadius(innerRadius);   
  
  legendColor = d3.scaleOrdinal()
              .range(["#0d6114","#990c08"]);

  /*** CHART 1. SCHOOLS IN ALL BOROUGHS */

  svg1 = d3.select("#container_top")
        .append("svg")
          .attr("width", width/3)
          .attr("height", height/2)
        .append("g")
          .attr("transform",`translate(${width/6+margin.left},${height/4+margin.top})`)
      
  svg1.append("text")
      .attr("x", -20)
      .attr("y", margin.top-height/4)
      .attr("fill","black")
      .attr("font-weight","bold")
      .attr("font-size","14px")
      .text("Citywide")

  svg1.selectAll("path.arc")
      .data(angleGen(AllData), d=>d.id)
      .enter()
      .append("path")
      .attr("d", d=>arcGen(d))
      .attr("fill", d=>legendColor(d.data.Status))
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .call(
        enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
          })
      )    
  let rest1 = function() {
    
    svg1.selectAll("text.newText")
        .data(angleGen(AllData), d=>d.id)
        .enter()
          .append("text")
          .attr("class","newText")
          .call (
            enter=>enter
              .transition()
              .duration(200)
              .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
              .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
              .attr("dy", ".6em")
              .attr("text-anchor", "middle")
              .style("fill","white")                 
          )

    legend = d3.select("#container_legend")
          .append("svg")
            .attr("width", width)
            .attr("height", 50)
          .append("g")
            .attr("transform",`translate(${width/2-margin.left},${0})`)

    legend.selectAll(".legend")
          .data(angleGen(AllData))
          .enter()          
          .append("g")
          .attr("class","legend")
          .attr("transform", (d,i) => `translate(${((i*legendHeight*15)-50)},${0})`)

    legend.selectAll(".legend").append("rect") 
          .attr("width", legendRectSize)
          .attr("height", legendRectSize)
          .attr("rx", 5)
          .attr("ry", 5) 
          .attr("x", 40)
          .attr("y", 18)     
          .style("fill", d=>legendColor(d.data.Status))
          .style("stroke", legendColor)
    
    legend.selectAll(".legend").append("text")
          //.data(angleGen(AllData))
          .attr("x", 60)
          .attr("y", 30)
          .text(d=>d.data.Status+" the average")
            .style("fill", "#190707")
            .style("font-size", "14px") 
            .style("font-weight", "bold");
    
    } 
  setTimeout(rest1,1000);

  /*** CHART 2. SCHOOLS IN BRONX ***/

  svg2 = d3.select("#container_top")
        .append("svg")
          .attr("width", width/3)
          .attr("height", height/2)
        .append("g")
          .attr("transform",`translate(${width/6+margin.left},${height/4+margin.top})`)
        
  svg2.append("text")
      .attr("x", -30)
      .attr("y", margin.top-height/4)
      .attr("fill","black")
      .attr("font-weight","bold")
      .attr("font-size","14px")
      .text("Bronx")   
  
  svg2.selectAll("path.arc")
      .data(angleGen(BXdata), d=>d.id)
      .enter()
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor(d.data.Status))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
          enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
          })
        )    
  let rest2 = function() {
    
    svg2.selectAll("text.newText")
        .data(angleGen(BXdata), d=>d.id)
        .enter()
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".6em")
            .attr("text-anchor", "middle")
            .style("fill","white")                 
        )
  } 
  setTimeout(rest2,1000);

  /*** CHART 3. SCHOOLS IN BROOKLYN ***/  

  svg3 = d3.select("#container_top")
        .append("svg")
          .attr("width", width/3)
          .attr("height", height/2)
        .append("g")
          .attr("transform",`translate(${width/6+margin.left},${height/4+margin.top})`)
      
  svg3.append("text")
      .attr("x",-30)
      .attr("y",margin.top-height/4)
      .attr("fill","black")
      .attr("font-weight","bold")
      .attr("font-size","14px")
      .text("Brooklyn")
  
  svg3.selectAll("path.arc")
      .data(angleGen(BKdata), d=>d.id)
      .enter()
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor(d.data.Status))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
          enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
          })
        )    
  let rest3 = function() {
    
    svg3.selectAll("text.newText")
        .data(angleGen(BKdata), d=>d.id)
        .enter()
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".6em")
            .attr("text-anchor", "middle")
            .style("fill","white")                 
        )
  } 
  setTimeout(rest3,1000);

  /*** CHART 4. SCHOOLS IN MANHATTAN ***/  
  svg4 = d3.select("#container_bottom")
        .append("svg")
          .attr("width", width/3)
          .attr("height", height/2)
        .append("g")
          .attr("transform",`translate(${width/6+margin.left},${height/4+margin.top})`);
      
  svg4.append("text")
      .attr("x",-30)
      .attr("y",margin.top-height/4)
      .attr("fill","black")
      .attr("font-weight","bold")
      .attr("font-size","14px")
      .text("Manhattan")

  svg4.selectAll("path.arc")
      .data(angleGen(MTdata), d=>d.id)
      .enter()
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor(d.data.Status))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
          enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
          })
        )    
  let rest4 = function() {
    
    svg4.selectAll("text.newText")
        .data(angleGen(MTdata), d=>d.id)
        .enter()
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".6em")
            .attr("text-anchor", "middle")
            .style("fill","white")                 
        )
  } 
  setTimeout(rest4,1000);

  /*** CHART 5. SCHOOLS IN QUEENS ***/
  svg5 = d3.select("#container_bottom")
        .append("svg")
          .attr("width", width/3)
          .attr("height", height/2)
        .append("g")
          .attr("transform",`translate(${width/6+margin.left},${height/4+margin.top})`);
    
  svg5.append("text")
      .attr("x",-30)
      .attr("y",margin.top-height/4)
      .attr("fill","black")
      .attr("font-weight","bold")
      .attr("font-size","14px")
      .text("Queens")  

  svg5.selectAll("path.arc")
      .data(angleGen(QSdata), d=>d.id)
      .enter()
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor(d.data.Status))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
          enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
          })
        )    
  let rest5 = function() {
    
    svg5.selectAll("text.newText")
        .data(angleGen(QSdata), d=>d.id)
        .enter()
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".6em")
            .attr("text-anchor", "middle")
            .style("fill","white")                 
        )
  } 
  setTimeout(rest5,1000);
      
  /*** CHART 6. SCHOOLS IN STATEN ISLAND ***/
  svg6 = d3.select("#container_bottom")
        .append("svg")
          .attr("width", width/3)
          .attr("height", height/2)
        .append("g")
          .attr("transform",`translate(${width/6+margin.left},${height/4+margin.top})`);

  svg6.append("text")
      .attr("x",-50)
      .attr("y",margin.top-height/4)
      .attr("fill","black")
      .attr("font-weight","bold")
      .attr("font-size","14px")
      .text("Staten Island")  
  
  svg6.selectAll("path.arc")
      .data(angleGen(SIdata), d=>d.id)
      .enter()
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor(d.data.Status))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
          enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
          })
        )    
  let rest6 = function() {
    
    svg6.selectAll("text.newText")
        .data(angleGen(SIdata), d=>d.id)
        .enter()
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".6em")
            .attr("text-anchor", "middle")
            .style("fill","white")                 
        )
  } 
  setTimeout(rest6,1000);
})
    
    