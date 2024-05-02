// chart
const width = window.innerWidth*.9,
      height = window.innerHeight*.8,
      margin = {top:50, bottom:50, left:50, right:30},
      innerWidth = width - margin.left - margin.right,
      innerHeight = height*0.8 - margin.top - margin.bottom,
      radius = 2.5;

// global empty variables
let colorScale, svg1, svg2, svg3, svg4,svg5, svg6;
let tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6;
let xScale1, xScale2, xScale3, xScale4, xScale5, xScale6;
let yScale1, yScale2, yScale3, yScale4,yScale5, yScale6;
let borough;

/* APPLICATION STATE */
let state = {
data: [],  
hover: null,
selection1: "All", 
selection2: "All",
selection3: "All", 
selection4: "All",
selection5: "All", 
selection6: "All",
};

/* LOAD DATA */
d3.csv("./Dataset/SchoolSurvey.csv", d => {
    return {
    school_name: d.school_name,
    Borough: d.Borough,    
    Grad_Rate: +d.Grad_Rate,
    Rigorous_Instr: +d.Rigorous_Instr,
    Collaborative: +d.Collaborative,
    Supportive: +d.Supportive,
    Leadership: +d.Leadership,
    FamilyComm: +d.FamilyComm,
    Trust: +d.Trust
    }
}).then(raw_data => {

    // save the summed data to application state
    state.data = raw_data;

    state.data.forEach((d,i) => {d.id = i+1;});
    console.log("state", state.data)

    borough = [... new Set(state.data.map(d=>d.Borough))]; 
    chart1();
    chart2();
    chart3();
    chart4();
    chart5();
    chart6();
});

function chart1() {
// SCALES
  xScale1 = d3.scaleLinear()
          .domain(d3.extent(state.data, d =>d.Rigorous_Instr)) 
          .range([margin.left, innerWidth/3-margin.right]) 
    
  yScale1 = d3.scaleLinear()
          .domain(d3.extent(state.data, d=>d.Grad_Rate))
          .range([innerHeight-margin.bottom, margin.top])

  colorScale = d3.scaleOrdinal().domain(borough)
            .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])

    // AXES
    const xAxis1 = d3.axisBottom(xScale1).ticks(10)//.tickFormat(d=>d3.format(".1f")(d))
    
    const yAxis1 = d3.axisLeft(yScale1).ticks(10)

    // SVG ELEMENT
    const container1 = d3.select("#container1")

  svg1 = container1.append("svg")
      .attr("width", innerWidth/2)
      .attr("height", height)

  tooltip1 = container1.append("div")
      .attr("class", "tooltip")
      .style("visibility", "hidden")


    // CALL AXES to draw Axis lines
  svg1.append("g")
      .attr("class","xAxis")
      .attr("transform", `translate(${0},${innerHeight-margin.bottom+margin.top})`)
      .call(xAxis1)
      .append("text")
         .attr("y", margin.bottom)
         .attr("x", innerWidth/4)
         .attr("stroke", "black")
         .attr("font-size","14px")
         .attr("text-anchor", "middle")
         .text("Chart 33. Rigorous Instruction: % Positive"); 

  svg1.append("g")
      .attr("class","yAxis")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis1)
      .append("text")
         .attr("y", margin.top-15)
         .attr("x", 0)
         .attr("stroke", "black")
         .attr("font-size","14px")
         .attr("text-anchor", "middle")
         .text("Graduation Rate"); 

  /* GRID LINES FOR THE CITY AVERAGE VALUE */
  svg1.selectAll("line.grid")
    .data(yScale1.ticks(5))
    .enter()
    .append("line")
      .attr("class", "grid")
      .attr("x1", margin.left)
      .attr("y1", yScale1(83.7)+margin.top)
      .attr("x2", innerWidth/3-margin.right+10)
      .attr("y2", yScale1(83.7)+margin.top)
      .style("stroke", "purple")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "3 3");

  svg1.append("text")
      .attr("x", innerWidth/3 - margin.right +15) 
      .attr("y", yScale1(83.7)+margin.top) 
      .style("fill","purple")
      .style("font-size","10px")
      .text("Average Grad: 83.7%");     

  svg1.selectAll("line.grid2")
      .data(xScale1.ticks(5))
      .enter()
      .append("line")
        .attr("class", "grid2")
        .attr("x1", xScale1(74.8))
        .attr("y1", margin.top+20)//+margin.bottom)
        .attr("x2", xScale1(74.8))
        .attr("y2", innerHeight)
        .style("stroke", "purple")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "3 3");

  svg1.append("text")
    .attr("x", xScale1(74.8)-margin.left) 
    .attr("y", margin.top+18) 
    .style("fill","purple")
    .style("font-size","10px")
    .text("Average Positive: 74.8%");  

  // UI ELEMENT SETUP
    /*manual drop-down menu */
    const options = borough.concat("All").sort(d3.ascending)
    console.log(options)
    const selectElement1 = d3.select("#dropdown1")

    selectElement1.selectAll("option") 
            .data(options)
            .join("option")
            .attr("value", d => d)
            .text(d=> d) 

    /* set up event listener to filter data based on dropdown menu selection*/
    selectElement1.on("change", event => {
      state.selection1 = event.target.value
      draw1();
    }); 

    draw1();
}
function draw1(){

    // FILTER DATA BASED ON STATE
    const filteredData1 = state.data
    .filter(d => state.selection1 === "All" || 
                 state.selection1 === d.Borough)
    console.log(filteredData1)

    svg1.selectAll("circle.dot")
    .data(filteredData1, d=>d.id) // to match data to unique id
    .attr("id", (d,i)=>i)
    .join(
    // HANDLE ENTER SELECTION
    enter => enter
    .append("circle")
    .attr("class","dot")      
    .attr("r", 0)
    .attr("cx", d=> xScale1(d.Rigorous_Instr))
    .attr("cy", d => yScale1(d.Grad_Rate)+margin.top)
    .attr("fill", "black")
      .on("mouseover", function(event, d, i){
        tooltip1
          .html(`<div>${d.school_name}</div>
                <div>${d.Borough}</div>
                <div>Grad_Rate: ${d.Grad_Rate}%</div>
                <div>Positive: ${d.Rigorous_Instr}%</div>`)
          .style("visibility", "visible")
      })
      .on("mousemove", function(event){
        tooltip1
          .style("top", event.pageY +15 + "px")
          .style("left", event.pageX + 0 + "px")
      })
      .on("mouseout", function(event, d) {
        tooltip1
          .html(``)
          .style("visibility", "hidden");
      })
    .call(
      enter => enter
      .transition()
      .delay((d,i) => i*3)
      .duration(1000)
      .attr("r", radius*1.5)
      .attr("cy", d => yScale1(d.Grad_Rate)+margin.top)
      .attr("fill", d => colorScale(d.Borough))
      .style("stroke", "#000")      
      .attr("opacity", 1)
      )
    ,
    // HANDLE UPDATE SELECTION
    update => update,

    // HANDLE EXIT SELECTION
    exit => exit
      .transition()
      .duration(500)
     // .delay(150)
      .attr("r", 0)
      .remove("dot")
)}

function chart2() {

  xScale2 = d3.scaleLinear()
          .domain(d3.extent(state.data, d =>d.Collaborative)) 
          .range([margin.left, innerWidth/3-margin.right]) 

  yScale2 = d3.scaleLinear()
          .domain(d3.extent(state.data, d=>d.Grad_Rate))
          .range([innerHeight-margin.bottom, margin.top])

  const xAxis2 = d3.axisBottom(xScale2).ticks(10)
  const yAxis2 = d3.axisLeft(yScale2).ticks(10)

   /**** second chart ***/
    // SVG ELEMENT
  const container2 = d3.select("#container2")

  svg2 = container2.append("svg")
      .attr("width", innerWidth/2)
      .attr("height", height)

  tooltip2 = container2.append("div")
      .attr("class", "tooltip")
      .style("visibility", "hidden")

    // CALL AXES to draw Axis lines
  svg2.append("g")
      .attr("class","xAxis")
      .attr("transform", `translate(${0},${innerHeight-margin.bottom+margin.top})`)
      .call(xAxis2)
      .append("text")
         .attr("y", margin.bottom)
         .attr("x", innerWidth/4)
         .attr("stroke", "black")
         .attr("font-size","14px")
         .attr("text-anchor", "middle")
         .text("Chart 34. Collaborative Teachers: % Positive"); 

   svg2.append("g")
      .attr("class","yAxis")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis2)
      .append("text")
         .attr("y", margin.top-15)
         .attr("x", 0)
         .attr("stroke", "black")
         .attr("font-size","14px")
         .attr("text-anchor", "middle")
         .text("Graduation Rate"); 

  /* GRID LINES FOR THE CITY AVERAGE VALUE */
  svg2.selectAll("line.grid")
    .data(yScale2.ticks(5))
    .enter()
    .append("line")
      .attr("class", "grid")
      .attr("x1", margin.left)
      .attr("y1", yScale2(83.7)+margin.top)
      .attr("x2", innerWidth/3-margin.right+10)
      .attr("y2", yScale2(83.7)+margin.top)
      .style("stroke", "purple")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "3 3");

  svg2.append("text")
      .attr("x", innerWidth/3 - margin.right +15) 
      .attr("y", yScale2(83.7)+margin.top) 
      .style("fill","purple")
      .style("font-size","10px")
      .text("Average Grad: 83.7%");     

  svg2.selectAll("line.grid2")
         .data(xScale2.ticks(5))
         .enter()
         .append("line")
           .attr("class", "grid2")
           .attr("x1", xScale2(81.2))
           .attr("y1", margin.top+20)//+margin.bottom)
           .attr("x2", xScale2(81.2))
           .attr("y2", innerHeight)
           .style("stroke", "purple")
           .style("stroke-width", 1)
           .style("stroke-dasharray", "3 3");
   
  svg2.append("text")
       .attr("x", xScale2(81.2)-margin.left) 
       .attr("y", margin.top+18) 
       .style("fill","purple")
       .style("font-size","10px")
       .text("Average Positive: 81.2%");  

  const options = borough.concat("All").sort(d3.ascending)       
  const selectElement2 = d3.select("#dropdown2")
  selectElement2.selectAll("option") 
            .data(options) 
            .join("option")
            .attr("value", d => d) 
            .text(d=> d) 

    /* set up event listener to filter data based on dropdown menu selection*/
    selectElement2.on("change", event => {
      state.selection2 = event.target.value
      draw2();
    });
    draw2();
}

function draw2(){
   // FILTER DATA BASED ON STATE
  const filteredData2 = state.data
   .filter(d => state.selection2 === "All" || 
               state.selection2 === d.Borough)

  svg2.selectAll("circle.dot2")
      .data(filteredData2, d=>d.id) 
      .attr("id", (d,i)=>i)
      .join(
      // HANDLE ENTER SELECTION
        enter => enter
          .append("circle")
          .attr("class","dot2")      
          .attr("r", 0)
          .attr("cx", d=> xScale2(d.Collaborative))
          .attr("cy", d => yScale2(d.Grad_Rate)+margin.top)
          .attr("fill", "black")
          .on("mouseover", function(event, d, i){
            tooltip2
              .html(`<div>${d.school_name}</div>
                    <div>${d.Borough}</div>
                    <div>Graduation: ${d.Grad_Rate}%</div>
                    <div>Positive: ${d.Collaborative}%</div>`)
              .style("visibility", "visible")
          })
          .on("mousemove", function(event){
            tooltip2
              .style("top", event.pageY +15 + "px")
              .style("left", event.pageX + 0 + "px")
          })
          .on("mouseout", function(event, d) {
            tooltip2
              .html(``)
              .style("visibility", "hidden");
          })
          .call(
            enter => enter
              .transition()
              .delay((d,i) => i*3)
              .duration(1000)
              .attr("r", radius*1.5)
              .attr("cy", d => yScale2(d.Grad_Rate)+margin.top)
              .attr("fill", d => colorScale(d.Borough))
              .style("stroke", "#000")      
              .attr("opacity", 1)
            )
            ,
            // HANDLE UPDATE SELECTION
            update => update,
          
            // HANDLE EXIT SELECTION
            exit => exit
              .transition()
              .duration(500)
              .attr("r", 0)
              .remove("dot")
)}

function chart3() {
  // SCALES
    xScale3 = d3.scaleLinear()
            .domain(d3.extent(state.data, d =>d.Supportive)) 
            .range([margin.left, innerWidth/3-margin.right]) 
      
    yScale3 = d3.scaleLinear()
            .domain(d3.extent(state.data, d=>d.Grad_Rate))
            .range([innerHeight-margin.bottom, margin.top])
  
    colorScale = d3.scaleOrdinal().domain(borough)
              .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
  
      // AXES
      const xAxis3 = d3.axisBottom(xScale3).ticks(10)//.tickFormat(d=>d3.format(".1f")(d))
      
      const yAxis3 = d3.axisLeft(yScale3).ticks(10)
  
      // SVG ELEMENT
      const container3 = d3.select("#container3")
  
    svg3 = container3.append("svg")
        .attr("width", innerWidth/2)
        .attr("height", height)
  
    tooltip3 = container3.append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden")
  
  
      // CALL AXES to draw Axis lines
     svg3.append("g")
        .attr("class","xAxis")
        .attr("transform", `translate(${0},${innerHeight-margin.bottom+margin.top})`)
        .call(xAxis3)
        .append("text")
           .attr("y", margin.bottom)
           .attr("x", innerWidth/4)
           .attr("stroke", "black")
           .attr("font-size","14px")
           .attr("text-anchor", "middle")
           .text("Chart 35. Supportive Environment: % Positive"); 
  
     svg3.append("g")
        .attr("class","yAxis")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(yAxis3)
        .append("text")
           .attr("y", margin.top-15)
           .attr("x", 0)
           .attr("stroke", "black")
           .attr("font-size","14px")
           .attr("text-anchor", "middle")
           .text("Graduation Rate"); 
  
    /* GRID LINES FOR THE CITY AVERAGE VALUE */
    svg3.selectAll("line.grid")
    .data(yScale3.ticks(5))
    .enter()
    .append("line")
      .attr("class", "grid")
      .attr("x1", margin.left)
      .attr("y1", yScale3(83.7)+margin.top)
      .attr("x2", innerWidth/3-margin.right+10)
      .attr("y2", yScale3(83.7)+margin.top)
      .style("stroke", "purple")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "3 3");

  svg3.append("text")
      .attr("x", innerWidth/3 - margin.right +15) 
      .attr("y", yScale3(83.7)+margin.top) 
      .style("fill","purple")
      .style("font-size","10px")
      .text("Average Grad: 83.7%");     

  svg3.selectAll("line.grid2")
         .data(xScale3.ticks(5))
         .enter()
         .append("line")
           .attr("class", "grid2")
           .attr("x1", xScale3(74.5))
           .attr("y1", margin.top+20)//+margin.bottom)
           .attr("x2", xScale3(74.5))
           .attr("y2", innerHeight)
           .style("stroke", "purple")
           .style("stroke-width", 1)
           .style("stroke-dasharray", "3 3");
   
  svg3.append("text")
       .attr("x", xScale3(74.5)-margin.left) 
       .attr("y", margin.top+18) 
       .style("fill","purple")
       .style("font-size","10px")
       .text("Average Positive: 74.5%");   

    // UI ELEMENT SETUP
      /*manual drop-down menu */
      const options = borough.concat("All").sort(d3.ascending)
      console.log(options)
      const selectElement3 = d3.select("#dropdown3")
  
      selectElement3.selectAll("option") 
              .data(options)
              .join("option")
              .attr("value", d => d) 
              .text(d=> d) 
  
      /* set up event listener to filter data based on dropdown menu selection*/
      selectElement3.on("change", event => {
        state.selection3 = event.target.value
        draw3();
      }); 
  
      draw3();
  }
  function draw3(){
  
      // FILTER DATA BASED ON STATE
      const filteredData3 = state.data
      .filter(d => state.selection3 === "All" || 
                   state.selection3 === d.Borough)
      console.log(filteredData3)
  
      svg3.selectAll("circle.dot")
      .data(filteredData3, d=>d.id) // to match data to unique id
      .attr("id", (d,i)=>i)
      .join(
      // HANDLE ENTER SELECTION
      enter => enter
      .append("circle")
      .attr("class","dot")      
      .attr("r", 0)
      .attr("cx", d=> xScale3(d.Supportive))
      .attr("cy", d => yScale3(d.Grad_Rate)+margin.top)
      .attr("fill", "black")
        .on("mouseover", function(event, d, i){
          tooltip3
            .html(`<div>${d.school_name}</div>
                  <div>${d.Borough}</div>
                  <div>Grad_Rate: ${d.Grad_Rate}%</div>
                  <div>Positive: ${d.Supportive}%</div>`)
            .style("visibility", "visible")
        })
        .on("mousemove", function(event){
          tooltip3            
          .style("top", event.pageY +15 + "px")
          .style("left", event.pageX + 0 + "px")
        })
        .on("mouseout", function(event, d) {
          tooltip3
            .html(``)
            .style("visibility", "hidden");
        })
      .call(
        enter => enter
        .transition()
        .delay((d,i) => i*3)
        .duration(1000)
        .attr("r", radius*1.5)
        .attr("cy", d => yScale3(d.Grad_Rate)+margin.top)
        .attr("fill", d => colorScale(d.Borough))
        .style("stroke", "#000")      
        .attr("opacity", 1)
        )
      ,
      // HANDLE UPDATE SELECTION
      update => update,
  
      // HANDLE EXIT SELECTION
      exit => exit
        .transition()
        .duration(500)
        .attr("r", 0)
        .remove("dot")
  )}
  
function chart4() {
  
  xScale4 = d3.scaleLinear()
            .domain(d3.extent(state.data, d =>d.Leadership)) 
            .range([margin.left, innerWidth/3-margin.right]) 
  
  yScale4 = d3.scaleLinear()
            .domain(d3.extent(state.data, d=>d.Grad_Rate))
            .range([innerHeight-margin.bottom, margin.top])
  
  const xAxis4 = d3.axisBottom(xScale4).ticks(10)
  const yAxis4 = d3.axisLeft(yScale4).ticks(10)
  
  /**** second chart ***/
  // SVG ELEMENT
  const container4 = d3.select("#container4")
  
  svg4 = container4.append("svg")
        .attr("width", innerWidth/2)
        .attr("height", height)
  
  tooltip4 = container4.append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden")
  
  // CALL AXES to draw Axis lines
  svg4.append("g")
        .attr("class","xAxis")
        .attr("transform", `translate(${0},${innerHeight-margin.bottom+margin.top})`)
        .call(xAxis4)
        .append("text")
           .attr("y", margin.bottom)
           .attr("x", innerWidth/4)
           .attr("stroke", "black")
           .attr("font-size","14px")
           .attr("text-anchor", "middle")
           .text("Chart 36. Effective Leadership: % Positive"); 
  
  svg4.append("g")
        .attr("class","yAxis")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(yAxis4)
        .append("text")
           .attr("y", margin.top-15)
           .attr("x", 0)
           .attr("stroke", "black")
           .attr("font-size","14px")
           .attr("text-anchor", "middle")
           .text("Graduation Rate"); 

  /* GRID LINES FOR THE CITY AVERAGE VALUE */
  svg4.selectAll("line.grid")
     .data(yScale4.ticks(5))
     .enter()
     .append("line")
       .attr("class", "grid")
       .attr("x1", margin.left)
       .attr("y1", yScale4(83.7)+margin.top)
       .attr("x2", innerWidth/3-margin.right+10)
       .attr("y2", yScale4(83.7)+margin.top)
       .style("stroke", "purple")
       .style("stroke-width", 1)
       .style("stroke-dasharray", "3 3");
 
  svg4.append("text")
       .attr("x", innerWidth/3 - margin.right +15) 
       .attr("y", yScale4(83.7)+margin.top) 
       .style("fill","purple")
       .style("font-size","10px")
       .text("Average Grad: 83.7%");     
 
  svg4.selectAll("line.grid2")
          .data(xScale4.ticks(5))
          .enter()
          .append("line")
            .attr("class", "grid2")
            .attr("x1", xScale4(80))
            .attr("y1", margin.top+20)
            .attr("x2", xScale4(80))
            .attr("y2", innerHeight)
            .style("stroke", "purple")
            .style("stroke-width", 1)
            .style("stroke-dasharray", "3 3");
    
  svg4.append("text")
        .attr("x", xScale4(80)-margin.left) 
        .attr("y", margin.top+18) 
        .style("fill","purple")
        .style("font-size","10px")
        .text("Average Positive: 80%");    


  const options = borough.concat("All").sort(d3.ascending)       
  const selectElement4 = d3.select("#dropdown4")
  selectElement4.selectAll("option") 
              .data(options) 
              .join("option")
              .attr("value", d => d) 
              .text(d=> d) 
  
  /* set up event listener to filter data based on dropdown menu selection*/
   selectElement4.on("change", event => {
    state.selection4 = event.target.value
    draw4();
  });
  draw4();
}
  
function draw4(){
  // FILTER DATA BASED ON STATE
  const filteredData4 = state.data
     .filter(d => state.selection4 === "All" || 
                 state.selection4 === d.Borough)
  
  svg4.selectAll("circle.dot2")
      .data(filteredData4, d=>d.id) 
      .attr("id", (d,i)=>i)
      .join(
      // HANDLE ENTER SELECTION
      enter => enter
        .append("circle")
        .attr("class","dot2")      
        .attr("r", 0)
        .attr("cx", d=> xScale4(d.Leadership))
        .attr("cy", d => yScale4(d.Grad_Rate)+margin.top)
        .attr("fill", "black")
        .on("mouseover", function(event, d, i){
          tooltip4
          .html(`<div>${d.school_name}</div>
                <div>${d.Borough}</div>
                <div>Graduation: ${d.Grad_Rate}%</div>
                <div>Positive: ${d.Leadership}%</div>`)
          .style("visibility", "visible")
        })
        .on("mousemove", function(event){
          tooltip4
          .style("top", event.pageY +15 + "px")
          .style("left", event.pageX + 0 + "px")
        })
        .on("mouseout", function(event, d) {
          tooltip4
          .html(``)
          .style("visibility", "hidden");
        })
        .call(
        enter => enter
          .transition()
          .delay((d,i) => i*3)
          .duration(1000)
          .attr("r", radius*1.5)
          .attr("cy", d => yScale4(d.Grad_Rate)+margin.top)
          .attr("fill", d => colorScale(d.Borough))
          .style("stroke", "#000")      
          .attr("opacity", 1)
        )
        ,
        // HANDLE UPDATE SELECTION
        update => update
        ,    
        // HANDLE EXIT SELECTION
        exit => exit
          .transition()
          .duration(500)
          .attr("r", 0)
          .remove("dot")
)}

function chart5() {
 // SCALES
  xScale5 = d3.scaleLinear()
              .domain(d3.extent(state.data, d =>d.FamilyComm)) 
              .range([margin.left, innerWidth/3-margin.right]) 
        
  yScale5 = d3.scaleLinear()
              .domain(d3.extent(state.data, d=>d.Grad_Rate))
              .range([innerHeight-margin.bottom, margin.top])
    
  colorScale = d3.scaleOrdinal().domain(borough)
                 .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
    
  // AXES
  const xAxis5 = d3.axisBottom(xScale5).ticks(10)
  const yAxis5 = d3.axisLeft(yScale5).ticks(10)
    
  // SVG ELEMENT
  const container5 = d3.select("#container5")
    
  svg5 = container5.append("svg")
          .attr("width", innerWidth/2)
          .attr("height", height)
    
  tooltip5 = container5.append("div")
          .attr("class", "tooltip")
          .style("visibility", "hidden")
    
    
  // CALL AXES to draw Axis lines
  svg5.append("g")
          .attr("class","xAxis")
          .attr("transform", `translate(${0},${innerHeight-margin.bottom+margin.top})`)
          .call(xAxis5)
          .append("text")
             .attr("y", margin.bottom)
             .attr("x", innerWidth/4)
             .attr("stroke", "black")
             .attr("font-size","14px")
             .attr("text-anchor", "middle")
             .text("Chart 37. Family-Community Ties: % Positive"); 
    
  svg5.append("g")
          .attr("class","yAxis")
          .attr("transform", `translate(${margin.left},${margin.top})`)
          .call(yAxis5)
          .append("text")
             .attr("y", margin.top-15)
             .attr("x", 0)
             .attr("stroke", "black")
             .attr("font-size","14px")
             .attr("text-anchor", "middle")
             .text("Graduation Rate"); 
    
      /* GRID LINES FOR THE CITY AVERAGE VALUE */
  svg5.selectAll("line.grid")
      .data(yScale5.ticks(5))
      .enter()
      .append("line")
        .attr("class", "grid")
        .attr("x1", margin.left)
        .attr("y1", yScale5(83.7)+margin.top)
        .attr("x2", innerWidth/3-margin.right+10)
        .attr("y2", yScale5(83.7)+margin.top)
        .style("stroke", "purple")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "3 3");
  
    svg5.append("text")
        .attr("x", innerWidth/3 - margin.right +15) 
        .attr("y", yScale5(83.7)+margin.top) 
        .style("fill","purple")
        .style("font-size","10px")
        .text("Average Grad: 83.7%");     
  
    svg5.selectAll("line.grid2")
           .data(xScale5.ticks(5))
           .enter()
           .append("line")
             .attr("class", "grid2")
             .attr("x1", xScale5(85.3))
             .attr("y1", margin.top+20)
             .attr("x2", xScale5(85.3))
             .attr("y2", innerHeight)
             .style("stroke", "purple")
             .style("stroke-width", 1)
             .style("stroke-dasharray", "3 3");
     
    svg5.append("text")
         .attr("x", xScale5(85.3)-margin.left) 
         .attr("y", margin.top+18) 
         .style("fill","purple")
         .style("font-size","10px")
         .text("Average Positive: 85.3%");   

  // UI ELEMENT SETUP
  /*manual drop-down menu */
  const options = borough.concat("All").sort(d3.ascending)
  const selectElement5 = d3.select("#dropdown5")
    
  selectElement5.selectAll("option") 
                .data(options)
                .join("option")
                .attr("value", d => d) 
                .text(d=> d) 
    
  /* set up event listener to filter data based on dropdown menu selection*/
  selectElement5.on("change", event => {
      state.selection5 = event.target.value
    draw5();
  }); 
    
  draw5();
}

function draw5(){
    
  // FILTER DATA BASED ON STATE
  const filteredData5 = state.data
        .filter(d => state.selection5 === "All" || 
                     state.selection5 === d.Borough)
      
  svg5.selectAll("circle.dot")
        .data(filteredData5, d=>d.id)
        .attr("id", (d,i)=>i)
        .join(
        // HANDLE ENTER SELECTION
        enter => enter
        .append("circle")
        .attr("class","dot")      
        .attr("r", 0)
        .attr("cx", d=> xScale5(d.FamilyComm))
        .attr("cy", d => yScale5(d.Grad_Rate)+margin.top)
        .attr("fill", "black")
          .on("mouseover", function(event, d, i){
            tooltip5
              .html(`<div>${d.school_name}</div>
                    <div>${d.Borough}</div>
                    <div>Grad_Rate: ${d.Grad_Rate}%</div>
                    <div>Positive: ${d.FamilyComm}%</div>`)
              .style("visibility", "visible")
          })
          .on("mousemove", function(event){
            tooltip5            
            .style("top", event.pageY +15 + "px")
            .style("left", event.pageX + 0 + "px")
          })
          .on("mouseout", function(event, d) {
            tooltip5
              .html(``)
              .style("visibility", "hidden");
          })
        .call(
        enter => enter
          .transition()
          .delay((d,i) => i*3)
          .duration(1000)
          .attr("r", radius*1.5)
          .attr("cy", d => yScale5(d.Grad_Rate)+margin.top)
          .attr("fill", d => colorScale(d.Borough))
          .style("stroke", "#000")      
          .attr("opacity", 1)
          )
        ,
        // HANDLE UPDATE SELECTION
        update => update,
    
        // HANDLE EXIT SELECTION
        exit => exit
          .transition()
          .duration(500)
          .attr("r", 0)
          .remove("dot")
)}
    
function chart6() {
    
  xScale6 = d3.scaleLinear()
              .domain(d3.extent(state.data, d =>d.Trust)) 
              .range([margin.left, innerWidth/3-margin.right]) 
    
  yScale6 = d3.scaleLinear()
              .domain(d3.extent(state.data, d=>d.Grad_Rate))
              .range([innerHeight-margin.bottom, margin.top])
    
  const xAxis6 = d3.axisBottom(xScale6).ticks(10)
  const yAxis6 = d3.axisLeft(yScale6).ticks(10)
    
  // SVG ELEMENT
  const container6 = d3.select("#container6")
    
  svg6 = container6.append("svg")
          .attr("width", innerWidth/2)
          .attr("height", height)
    
  tooltip6 = container6.append("div")
          .attr("class", "tooltip")
          .style("visibility", "hidden")
    
        // CALL AXES to draw Axis lines
  svg6.append("g")
          .attr("class","xAxis")
          .attr("transform", `translate(${0},${innerHeight-margin.bottom+margin.top})`)
          .call(xAxis6)
          .append("text")
             .attr("y", margin.bottom)
             .attr("x", innerWidth/4)
             .attr("stroke", "black")
             .attr("font-size","14px")
             .attr("text-anchor", "middle")
             .text("Chart 38. Trust and Respect: % Positive"); 
    
  svg6.append("g")
          .attr("class","yAxis")
          .attr("transform", `translate(${margin.left},${margin.top})`)
          .call(yAxis6)
          .append("text")
             .attr("y", margin.top-15)
             .attr("x", 0)
             .attr("stroke", "black")
             .attr("font-size","14px")
             .attr("text-anchor", "middle")
             .text("Graduation Rate"); 
    
    /* GRID LINES FOR THE CITY AVERAGE VALUE */
  svg6.selectAll("line.grid")
    .data(yScale6.ticks(5))
    .enter()
    .append("line")
      .attr("class", "grid")
      .attr("x1", margin.left)
      .attr("y1", yScale6(83.7)+margin.top)
      .attr("x2", innerWidth/3-margin.right+10)
      .attr("y2", yScale6(83.7)+margin.top)
      .style("stroke", "purple")
      .style("stroke-width", 1)
      .style("stroke-dasharray", "3 3");

  svg6.append("text")
      .attr("x", innerWidth/3 - margin.right +15) 
      .attr("y", yScale6(83.7)+margin.top) 
      .style("fill","purple")
      .style("font-size","10px")
      .text("Average Grad: 83.7%");     

  svg6.selectAll("line.grid2")
         .data(xScale6.ticks(5))
         .enter()
         .append("line")
           .attr("class", "grid2")
           .attr("x1", xScale6(84.8))
           .attr("y1", margin.top+20)
           .attr("x2", xScale6(84.8))
           .attr("y2", innerHeight)
           .style("stroke", "purple")
           .style("stroke-width", 1)
           .style("stroke-dasharray", "3 3");
   
  svg6.append("text")
       .attr("x", xScale6(84.8)-margin.left) 
       .attr("y", margin.top+18) 
       .style("fill","purple")
       .style("font-size","10px")
       .text("Average Positive: 84.8%");   

  const options = borough.concat("All").sort(d3.ascending)       
  const selectElement6 = d3.select("#dropdown6")
  
  selectElement6.selectAll("option") 
                .data(options) 
                .join("option")
                .attr("value", d => d) 
                .text(d=> d) 
    
  /* set up event listener to filter data based on dropdown menu selection*/
  selectElement6.on("change", event => {
    state.selection6 = event.target.value
    draw6();
  });

  draw6();
}
    
function draw6(){
  // FILTER DATA BASED ON STATE
  const filteredData6 = state.data
       .filter(d => state.selection6 === "All" || 
                   state.selection6 === d.Borough)
    
  svg6.selectAll("circle.dot2")
      .data(filteredData6, d=>d.id) 
      .attr("id", (d,i)=>i)
      .join(
        // HANDLE ENTER SELECTION
        enter => enter
          .append("circle")
          .attr("class","dot2")      
          .attr("r", 0)
          .attr("cx", d=> xScale6(d.Trust))
          .attr("cy", d => yScale6(d.Grad_Rate)+margin.top)
          .attr("fill", "black")
            .on("mouseover", function(event, d, i){
              tooltip6
                .html(`<div>${d.school_name}</div>
                  <div>${d.Borough}</div>
                  <div>Graduation: ${d.Grad_Rate}%</div>
                  <div>Positive: ${d.Trust}%</div>`)
                .style("visibility", "visible")
              })
            .on("mousemove", function(event){
              tooltip6
                .style("top", event.pageY +15 + "px")
                .style("left", event.pageX + 0 + "px")
              })
              .on("mouseout", function(event, d) {
                tooltip6
                  .html(``)
                  .style("visibility", "hidden");
              })
          .call(
            enter => enter
              .transition()
              .delay((d,i) => i*3)
              .duration(1000)
              .attr("r", radius*1.5)
              .attr("cy", d => yScale6(d.Grad_Rate)+margin.top)
              .attr("fill", d => colorScale(d.Borough))
              .style("stroke", "#000")      
              .attr("opacity", 1)
            )
            ,
            // HANDLE UPDATE SELECTION
            update => update
            ,  
           // HANDLE EXIT SELECTION
            exit => exit
              .transition()
              .duration(500)
              .attr("r", 0)
              .remove("dot")
 )};