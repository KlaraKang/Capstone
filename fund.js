const margin = {top: 50, right: 100, bottom: 70, left: 70},
      width = window.innerWidth * .9,
      height = window.innerHeight * .8,
      innerWidth = width - margin.left - margin.right;

let xScale,xAxis;
let colorScale;
let borough;

/* LOAD DATA */
d3.csv('./Dataset/FundingPerSchool.csv', (d, i, columns) => {  
  for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
  return d;
})
  .then(data => {
    
    // DATA MANIPULATION
    borough = data.columns.slice(2) 
     
    const FPdata = data.filter(d=> d.Category === "Funding_per_Pupil");
    const IMdata = data.filter(d=> d.Category === "Instructional_Media");
    const PSdata = data.filter(d=> d.Category === "Pupil_Support_Services");
   // const ENRLdata = data.filter(d=> d.Category === "Students_per_School");
    
    const boroughFP = borough.map(function(id) {
      return {
        id: id,
        values: FPdata.map(function(d) {
        return {year: d.AY, fund: +d[id] };
        })
      };
    });

    const boroughIM = borough.map(function(id) {
      return {
        id: id,
        values: IMdata.map(function(d) {
        return {year: d.AY, fund: +d[id] };
        })
      };
    });

    const boroughPS = borough.map(function(id) {
      return {
        id: id,
        values: PSdata.map(function(d) {
        return {year: d.AY, fund: +d[id] };
        })
      };
    });
/*
    const boroughENRL = borough.map(function(id) {
      return {
        id: id,
        values: ENRLdata.map(function(d) {
        return {year: d.AY, stud: +d[id] };
        })
      };
    });
*/
  // SCALES
  xScale = d3.scalePoint()
          .domain(FPdata.map(d => d.AY))
          .range([margin.left, innerWidth/2-margin.right])

  let yScale1 = d3.scaleLinear()
          .domain([d3.min(boroughFP, d=>d3.min(d.values, i=>i.fund))/1000, 
                   d3.max(boroughFP, d=> d3.max(d.values, i=>i.fund))/1000 + 1])
          .range([height - margin.top - margin.bottom, margin.bottom])

  let yScale2 = d3.scaleLinear()
          .domain([d3.min(boroughIM, d=>d3.min(d.values, i=>i.fund)), 
                   d3.max(boroughIM, d=> d3.max(d.values, i=>i.fund)) + 20])
          .range([height - margin.top - margin.bottom, margin.bottom]) 
          
  let yScale3 = d3.scaleLinear()
          .domain([d3.min(boroughPS, d=>d3.min(d.values, i=>i.fund))/1000, 
                   d3.max(boroughPS, d=> d3.max(d.values, i=>i.fund))/1000 + 0.5])
          .range([height - margin.top - margin.bottom, margin.bottom]) 
  /*
  let yScale4 = d3.scaleLinear()
          .domain([d3.min(boroughENRL, d=>d3.min(d.values, i=>i.stud))/100, 
                   d3.max(boroughENRL, d=> d3.max(d.values, i=>i.stud))/100])
          .range([height - margin.top - margin.bottom, margin.bottom]) 
  */
  colorScale = d3.scaleOrdinal()
                 .domain(boroughFP.map(d=>d.id))
                 .range(["#2b9b09", "#158ae9", "#e96806", "#38098f","#09c9d6"])

  // AXES
  xAxis = d3.axisBottom(xScale)
          .ticks(4).tickSizeOuter(0)

  /* DRAW CHART 1. SCHOOL FUNDING PER PUPIL */        

  // CREATE SVG ELEMENT 
  const container1 = d3.select("#container_top")
                  .style("position","relative");

  let svg1 = container1.append("svg")
        .attr("width", innerWidth/2 + margin.right) 
        .attr("height", height) 

  // CALL AXES
  svg1.append("g")
          .attr("class","xAxis")
          .attr("transform", `translate(${0},${height-margin.top-margin.bottom})`)
          .call(xAxis)
          .append("text")
            .attr("y", margin.bottom)
            .attr("x", innerWidth/4+margin.left)
            .attr("text-anchor", "end")
            .attr("fill","black")
            .style("font-size", "14px")
            .text("Academic Year");  

  svg1.append("g")
          .attr("class","yAxis")
          .attr("transform", `translate(${margin.left},${0})`)
          .call(d3.axisLeft(yScale1)
          .ticks(20).tickSizeOuter(0))
          .append("text")
            .attr("x", 5)
            .attr("y", margin.top)            
            .attr("text-anchor", "end")
            .attr("stroke","black")
            .style("font-size", "12px")
            .text("Thousand ($)");  

  // LINE GENERATOR FUNCTION
  let lineGen1 = d3.line()
              .curve(d3.curveMonotoneX)
              .x(d => xScale(d.year))
              .y(d => yScale1(d.fund/1000))          

  // DRAW LINES
  let byFP = svg1.selectAll(".borough")
            .data(boroughFP)
            .enter()
              .append("g")
              .attr("class", "borough")
              
  byFP.append("path")
          .attr("class","line")
          .attr("d", d => lineGen1(d.values))
          .style("stroke", d => colorScale(d.id))
          .call(enter => enter
            .transition()
              .duration(2000)
              .attrTween("stroke-dasharray", function(){
                const l = this.getTotalLength(),
                  i = d3.interpolateString("0,"+l, l+","+l);
                  return function(t){return i(t)};
              })
              .on("end", ()=>{d3.select(this).transition();})
            );   

  // ADD LINE LABEL 
  byFP.append("text")         
          .datum(function(d) {return {id: d.id, value: d.values[d.values.length -1]};})
          .call(
            enter => enter
            .attr("opacity",0)
            .attr("x", 0)
           .transition()              
              .duration(2000)
              .attr("transform", d=> `translate(${innerWidth/2-margin.right},${yScale1(d.value.fund/1000)})`)
              .attr("x", 5)              
              .attr("opacity",1)
              .attr("dy", "0.5em")
              .style("font", "12px sans-serif")
              .style("fill", d => colorScale(d.id))
              .text(d=> d.id)            
          );

  svg1.append("text")
          .attr("x", innerWidth/4+10)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .text("Chart 30. Average School Funding for 'Total School Funding per Pupil'")

/* DRAW CHART 2. SCHOOL FUNDING FOR INSTRUCTIONAL MEDIA */        

  // CREATE SVG ELEMENT 
  const container2 = d3.select("#container_top")
                  .style("position","relative");

  let svg2 = container2.append("svg")
        .attr("width", innerWidth/2 + margin.right)
        .attr("height", height)     

  // CALL AXES
  svg2.append("g")
          .attr("class","xAxis")
          .attr("transform", `translate(${0},${height-margin.top-margin.bottom})`)
          .call(xAxis)
          .append("text")
          .attr("y", margin.bottom)
          .attr("x", innerWidth/4+margin.left)
          .attr("text-anchor", "end")
          .attr("fill","black")
          .style("font-size", "14px")
          .text("Academic Year");  

  svg2.append("g")
          .attr("class","yAxis")
          .attr("transform", `translate(${margin.left},${0})`)
          .call(d3.axisLeft(yScale2)
          .ticks(20).tickSizeOuter(0))
          .append("text")
            .attr("x", 5)
            .attr("y", margin.top)            
            .attr("text-anchor", "end")
            .attr("stroke","black")
            .style("font-size", "12px")
            .text("Dollar ($)");  

  /* LINE GENERATOR FUNCTION*/
  let lineGen2 = d3.line()
              .curve(d3.curveMonotoneX)
              .x(d => xScale(d.year))
              .y(d => yScale2(d.fund))  
  
  // DRAW LINES
  let byIM = svg2.selectAll(".borough")
            .data(boroughIM)
            .enter()
              .append("g")
              .attr("class", "borough")
              
  byIM.append("path")
          .attr("class","line")
          .attr("d", d => lineGen2(d.values))
          .style("stroke", d => colorScale(d.id))
          .call(enter => enter
            .transition()
              .duration(2000)
              .attrTween("stroke-dasharray", function(){               
                const l = this.getTotalLength(),
                  i = d3.interpolateString("0,"+l, l+","+l);
                  return function(t){return i(t)};
              })
              .on("end", ()=>{d3.select(this).transition();})
            );   

  // ADD LINE LABEL 
  byIM.append("text")         
          .datum(function(d) {return {id: d.id, value: d.values[d.values.length -1]};})
          .call(
            enter => enter
            .attr("opacity",0)
            .attr("x", 0)
           .transition()              
              .duration(2000)
              .attr("transform", (d, id)=> `translate(${innerWidth/2-margin.right},${yScale2(d.value.fund)+id*5})`)
              .attr("x", 5)              
              .attr("opacity",1)
              .attr("dy", "0.5em")
            //  .attr("transform", "rotate(-65)")
              .style("font", "11px sans-serif")
              .style("fill", d => colorScale(d.id))
              .text(d=> d.id)            
          );

  svg2.append("text")
          .attr("x", innerWidth/4+10)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .text("Chart 31. Average School Funding per Student for 'Instructional Media'")


/* DRAW CHART 3. SCHOOL FUNDING FOR PUPIL SUPPORT SERVICES */        

  // CREATE SVG ELEMENT 
  const container3 = d3.select("#container_middle")
                  .style("position","relative");

  let svg3 = container3.append("svg")
        .attr("width", innerWidth/2 + margin.right)
        .attr("height", height) 

  /*svg1.append("g")
         .attr("transform", `translate(${0}, ${margin.top})`);      
*/
  // CALL AXES
  svg3.append("g")
          .attr("class","xAxis")
          .attr("transform", `translate(${0},${height-margin.top-margin.bottom})`)
          .call(xAxis)
          .append("text")
            .attr("y", margin.bottom)
            .attr("x", innerWidth/4+margin.left)
            .attr("text-anchor", "end")
            .attr("fill","black")
            .style("font-size", "14px")
            .text("Academic Year"); 

  svg3.append("g")
          .attr("class","yAxis")
          .attr("transform", `translate(${margin.left},${0})`)
          .call(d3.axisLeft(yScale3)
          .ticks(20).tickSizeOuter(0))
          .append("text")
            .attr("x", 5)
            .attr("y", margin.top)            
            .attr("text-anchor", "end")
            .attr("stroke","black")
            .style("font-size", "12px")
            .text("Thousand ($)");  

  // LINE GENERATOR FUNCTION
  let lineGen3 = d3.line()
              .curve(d3.curveMonotoneX)
              .x(d => xScale(d.year))
              .y(d => yScale3(d.fund/1000))          

  // DRAW LINES
  let byPS = svg3.selectAll(".borough")
            .data(boroughPS)
            .enter()
              .append("g")
              .attr("class", "borough")
              
  byPS.append("path")
          .attr("class","line")
          .attr("d", d => lineGen3(d.values))
          .style("stroke", d => colorScale(d.id))
          .call(enter => enter
            .transition()
              .duration(2000)
              .attrTween("stroke-dasharray", function(){
                const l = this.getTotalLength(),
                  i = d3.interpolateString("0,"+l, l+","+l);          
                  return function(t){return i(t)};
              })
              .on("end", ()=>{d3.select(this).transition();})
            );   

  // ADD LINE LABEL -- MAKE THEM ENTER FROM RIGHT
  byPS.append("text")         
          .datum(function(d) {return {id: d.id, value: d.values[d.values.length -1]};})
          .call(
            enter => enter
            .attr("opacity",0)
            .attr("x", 0)
           .transition()              
              .duration(2000)
              .attr("transform", d=> `translate(${innerWidth/2-margin.right},${yScale3(d.value.fund/1000)})`)
              .attr("x", 5)            
              .attr("opacity",1)
              .attr("dy", "0.5em")
              .style("font", "12px sans-serif")
              .style("fill", d => colorScale(d.id))
              .text(d=> d.id)            
          );

  svg3.append("text")
          .attr("x", innerWidth/4+10)
          .attr("y", 20)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .text("Chart 32. Average School Funding per Student for 'Student Support Services'");  


/* DRAW CHART 4. AVERAGE NUMBER OS STUDENTS PER SCHOOL       

  // CREATE SVG ELEMENT 
  const container4 = d3.select("#container_middle")
  .style("position","relative");

  let svg4 = container4.append("svg")
            .attr("width", innerWidth/2 + margin.right)
            .attr("height", height) 

  // CALL AXES
  svg4.append("g")
      .attr("class","xAxis")
      .attr("transform", `translate(${0},${height-margin.top-margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("y", margin.bottom)
      .attr("x", innerWidth/4+margin.left)
      .attr("text-anchor", "end")
      .attr("fill","black")
      .style("font-size", "14px")
      .text("Academic Year"); 

  svg4.append("g")
      .attr("class","yAxis")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yScale4)
      .ticks(20).tickSizeOuter(0))
      .append("text")
      .attr("x", 5)
      .attr("y", margin.top/3)            
      .attr("text-anchor", "end")
      .attr("stroke","black")
      .style("font-size", "12px")
      .text("Hundred");  

  // LINE GENERATOR FUNCTION
  let lineGen4 = d3.line()
                .curve(d3.curveMonotoneX)
                .x(d => xScale(d.year))
                .y(d => yScale4(d.stud/100))          

  // DRAW LINES
  let byENRL = svg4.selectAll(".borough")
                  .data(boroughENRL)
                  .enter()
                  .append("g")
                  .attr("class", "borough")

  byENRL.append("path")
        .attr("class","line")
        .attr("d", d => lineGen4(d.values))
        .style("stroke", d => colorScale(d.id))
        .call(enter => enter
        .transition()
        .duration(2000)
        .attrTween("stroke-dasharray", function(){
        const l = this.getTotalLength(),
          i = d3.interpolateString("0,"+l, l+","+l);          
          return function(t){return i(t)};
        })
        .on("end", ()=>{d3.select(this).transition();})
        );   

  // ADD LINE LABEL -- MAKE THEM ENTER FROM RIGHT
  byENRL.append("text")         
        .datum(function(d) {return {id: d.id, value: d.values[d.values.length -1]};})
        .call(
        enter => enter
        .attr("opacity",0)
        .attr("x", 0)
        .transition()              
          .duration(2000)
          .attr("transform", d=> `translate(${innerWidth/2-margin.right},${yScale4(d.value.stud/100)})`)
          .attr("x", 5)            
          .attr("opacity",1)
          .attr("dy", "0.5em")
          .style("font", "12px sans-serif")
          .style("fill", d => colorScale(d.id))
          .text(d=> d.id)            
       );

  svg4.append("text")
      .attr("x", innerWidth/4+10)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Average School Enrollment");  */ 
          
});
