 
  /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*.8,
      height = window.innerHeight*.8,
      margin = {top:20, bottom:50, left:50, right:50},
      innerWidth = width - margin.right - margin.left, 
      innerHeight = height - margin.top - margin.bottom;
  
let xScale1, yScale1, xScale2, yScale2, xScale3, yScale3;
let xAxisGroup2; 
let colorScale1, colorScale2, colorScale3;
let svg2, svg3, lineGen, tooltip;
let data2, borough;

    /* LOAD DATA */
d3.csv('./Dataset/All.csv', d3.autoType)
    .then(data => {
    
// CHART 1. Vertical Bar Chart: Grad Rates by Borough for Cohort Year 2018
   /* Filter data */
  const data1 = data.filter(d => d.Category === "Location" && d.Cohort_Year === 2018); 
  borough = data1.map(d=> d.subCategory);

    /* SCALES */
  xScale1 = d3.scaleBand()
          .domain(data1.map(d=> d.subCategory))
          .range([0, innerWidth/2])
          .padding(.15)          
   
  yScale1 = d3.scaleLinear()
          .domain([55, 100])
          .range([innerHeight/2, 0])
                
  colorScale1 = d3.scaleOrdinal()
          .domain(data1.map(d=> d.subCategory))
          .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])

  /*  // LINE GENERATOR FUNCTION
  lineGen = d3.line()
              .curve(d3.curveBasis)
              .x(d => xScale1(data1.Cohort_Year))
              .y(d => yScale1(data1.Percent_Grads)) 
  */      
  /* ELEMENTS */
  const container1 = d3.select("#container_top")
                    .append("svg")
                      .attr("width",width/2)// + margin.right + margin.left)
                      .attr("height",height/2 + margin.top + margin.bottom)
                    .append("g")
                      .attr("transform",`translate(${0},${0})`);
  
  container1.append("g")
            .call(d3.axisBottom(xScale1).tickSizeOuter(0))
              .attr("transform", `translate(${0},${innerHeight/2})`)            
            .append("text")
              .attr("x",innerWidth/3)
              .attr("y",margin.bottom)
              .attr("fill","black")
              .attr("text-anchor","end")
              .attr("font-size","14px")
              .style("font-weight", "bold")
              .text("Graduation Rates by Borough")
    
  /* For the first chart: SELECT - DATA JOIN - DRAW */
  container1.selectAll("rect")
            .data(data1)
            .join("rect")
            .attr("width", xScale1.bandwidth())
            .attr("height", 0)
            .attr("x", d =>xScale1(d.subCategory))
            .attr("y", innerHeight/2)
            .attr("fill", d=>colorScale1(d.subCategory))
            .transition()
              .duration(800)
              .attr("y", d=>yScale1(d.Percent_Grads))
              .attr("height", d=>innerHeight/2 - yScale1(d.Percent_Grads))
              .delay((d,i) => i*200)
              .attr("fill", d=>colorScale1(d.subCategory))             
  
  container1.selectAll("text.bar-label")
            .data(data1, d=>d.id)
            .join("text")
              .attr("class","bar-label") 
              .text(d => d.Percent_Grads+"%")            
              .attr("x", d => xScale1(d.subCategory)+xScale1.bandwidth()/2)
              .attr("y", innerHeight/2)
              .attr("opacity",0)
              .transition()
                .duration(800)
                .delay((d,i) => i*200)
                .attr("y", d => yScale1(d.Percent_Grads)+25)
                .attr("font-size","12px")
                .style("fill","#190707")
               // .style("font-weight","bold")
                .attr("text-anchor", "middle")
                .attr("opacity",1);
  /*
  container1.selectAll(".path")
            .data(data1, d=>d.id)
            .join("path")
            .attr("class","line_thick")
            .attr("d", d => lineGen(d.Percent_Grads))
            .style("stroke", "red")
            .call(enter => enter
              .transition()
                .duration(1500)
                .attrTween("stroke-dasharray", function(){
                  const l = this.getTotalLength(),
                    i = d3.interpolateString("0,"+l, l+","+l);
                    return function(t){return i(t)};
                })
                .on("end", ()=>{d3.select(this).transition();})
             );
  */
})
// CHART 2. Bar Chart with Selection for Borough: Grad Rates by ethnicity in each borough for Cohort Year 2018 
  
/* APPLICATION STATE */
let state = {
    data: [], 
    hover: null,
    selection: "All" //default selection
}; 
  /* LOAD DATA */
d3.csv('./Dataset/GradByEthBoro.csv', d3.autoType)
    .then(rawdata => {
      state.data = rawdata;
      init();
});    
  /* INITIALIZING FUNCTION */
  function init() {

    /* Filter data */
  const data2 = state.data.filter(d => d.Borough === "All")
 
    /* SCALES */
  xScale2 = d3.scaleBand()
      .domain(data2.map(d=> d.subCategory))
      .range([0, innerWidth/2])
      .padding(.3)          

  yScale2 = d3.scaleLinear()
      .domain([60, 100])
      .range([innerHeight/2, 0])
            
  colorScale2 = d3.scaleOrdinal()
      .domain(data2.map(d=> d.subCategory))
      .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057"])//,"#2471A3"
      //.range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057","#5499C7","#2980B9","#2471A3","#1F618D","#1A5276"])
    
  /* ELEMENTS */
  const container2 = d3.select("#container_bottom")
  
  svg2 = container2.append("svg")
                      .attr("width",width/2)// + margin.right + margin.left)
                      .attr("height",height/2 + margin.top + margin.bottom)
                    .append("g")
                      .attr("transform",`translate(${0},${0})`);
  
  xAxisGroup2 = svg2.append("g")
            .call(d3.axisBottom(xScale2).tickSizeOuter(0))
              .attr("transform", `translate(${0},${innerHeight/2})`)            
            .append("text")
              .attr("x",innerWidth/3)
              .attr("y",margin.bottom)
              .attr("fill","black")
              .attr("text-anchor","end")
              .attr("font-size","14px")              
              .style("font-weight", "bold")
              .text("Graduation Rates by Ethnicity")

    // + UI ELEMENT SETUP
    /*manual drop-down menu */  
  const selectElement = d3.select("#dropdown")
  console.log(borough)
  selectElement.selectAll("option") // "option" is a HTML element
                  .data(["Select Borough", ...new Set(state.data.map(d => d.Borough))]) 
                  .join("option")
                  .attr("value", d => d) // what's on the data
                  .text(d=> d) // what users can see
                  .style("font-weight", "bold")

    /* set up event listener to filter data based on dropdown menu selection*/
  selectElement.on("change", event => {
      state.selection = event.target.value
      draw(); 
  });

    draw();  
}

/* DRAW FUNCTION */
function draw() {

    // + FILTER DATA BASED ON STATE     
  const filteredData = state.data.filter(d => d.Borough === state.selection)

  console.log(filteredData)
    // + UPDATE DOMAINS, if needed
  xScale2.domain(filteredData.map(d=>d.subCategory))
  colorScale2.domain(filteredData.map(d=>d.subCategory))

  svg2.selectAll("rect.bar")
        .data(filteredData, d => d.id)
        .join(
        // + HANDLE ENTER SELECTION
        enter => enter
          .append("rect")
          .attr("class","bar")
          .attr("width", xScale2.bandwidth())
          .attr("height", 0)
          .attr("x", (d,i)=>xScale2(d.subCategory))
          .attr("y", innerHeight/2)
          .attr("fill", d=>colorScale2(d.subCategory))
          .call(enter => enter
            .transition()
            .duration(800)
            .attr("y",(d,i)=>yScale2(d.Percent_Grads))
            .attr("height", (d,i)=>innerHeight/2-yScale2(d.Percent_Grads))
            .delay((d,i)=>i*200)
            .attr("fill", d=>colorScale2(d.subCategory))
          )
          ,
          // + HANDLE UPDATE SELECTION
          update => update
          ,
          // + HANDLE EXIT SELECTION
          exit => exit
            .transition()
            .duration(50)
            .attr("y", yScale2(0))
            .attr("height", 0)
            .remove("bar")  
        )   

    svg2.selectAll("text.bar-label")
      .data(filteredData, d => d.id)
      .join(
        enter=>enter
          .append("text")
          .attr("class","bar-label")
          .text(d=>d.Percent_Grads+"%")
          .attr("x", (d,i)=>xScale2(d.subCategory)+xScale2.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .call(enter => enter
            .transition()
            .duration(800)
            .delay((d,i)=>i*200)
            .attr("x", (d, i) => xScale2(d.subCategory)+xScale2.bandwidth()/2)
            .attr("y", d=>yScale2(d.Percent_Grads)+25)
            .attr("text-anchor", "middle")
            .style("fill","black")
            .attr("opacity",1)
            )
          
        ,
        update=>update
        ,
        exit => exit
        .transition()
        .duration(50)
        .attr("y", 0)
        .remove("data-labels")   
        )  
}

  /* LOAD DATA */
d3.csv('./Dataset/GradByEthDistrict.csv', d3.autoType)
    .then(data => {
    
// CHART 1. Vertical Bar Chart: Grad Rates by Borough for Cohort Year 2018
   /* Filter data */
  const ethnicity = [... new Set(data.map(d=>d.Category))]
  const district = [... new Set(data.map(d=>d.District))]

  console.log("ethnicity",ethnicity)
  console.log("district",district)

  /* APPEND SVG */
  svg3 = d3.select("#container_right")
          .append("svg")
            .attr("width", width/2 - margin.left - margin.right)
            .attr("height", height)// - margin.top - margin.bottom)
          .append("g")
            .attr("transform", `translate(${0},${margin.top})`);

  /* X AXIS SCALE*/    
  xScale3 = d3.scaleBand()
            .range([margin.right, innerWidth/2-margin.right])
            .domain(ethnicity)
            .padding(0.05);
    
  svg3.append("g")
      .attr("transform", `translate(${0},${innerHeight})`)
      .call(d3.axisBottom(xScale3).tickSize(0))
      .style("font-size", "10px")
      .select(".domain").remove()

  /* Y AXIS SCALE */
  yScale3 = d3.scaleBand()
          .range([margin.top,innerHeight])
          .domain(district)
          .padding(0.1);

  svg3.append("g")
      .style("font-size", "10px")
      .attr("transform", `translate(${margin.right},${0})`)
      .call(d3.axisLeft(yScale3).tickSize(0))      
      .select(".domain").remove()
      
  /* COLOR SCALE */
  colorScale3 = d3.scaleSequential([40, 100], d3.interpolateGreens);
  /*
  colorScale3 = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([20,100])
  */
  /* TOOLTIPS */
  tooltip = svg3.append("div.tooltip")              
              .attr("class", "tooltip")
              .style("visibility", "hidden")
      /*        .attr("x",0)
              .attr("y",0)
              .style("top", 0)
              .style("left", 0)              
              .style("background-color", "white")
              .style("border", "solid")
              .style("border-width", "2px")
              .style("border-radius", "2px")
              .style("padding", "0.5px")
  
  tooltip.append("text")
          .attr("fill","black")
          .style("pointer-events","none");
*/
  // TOOLTIP FUNCTIONS 
  const mouseover = function(event, d) {
    tooltip
      .style("opacity", 1)
      .style("visibility","visible")

    d3.select(this)
      .style("stroke", "black")
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
  svg3.selectAll()
    .data(data, d=>d.id)
    .join("rect")
      .attr("x", d => xScale3(d.Category))
      .attr("y", d => yScale3(d.District))
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("width", xScale3.bandwidth())
      .attr("height", yScale3.bandwidth())
      .style("fill", d => colorScale3(d.Percent_Grads))
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
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
  svg3.append("text")
        .attr("x", innerWidth/4)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Graduation Rates by Ethnicity and District");  
    
})
