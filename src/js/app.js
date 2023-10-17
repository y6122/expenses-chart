import Chart from "chart.js/auto/auto";

const chartBox = document.getElementById("chart-bar");

async function feachJson() {
  const response = await fetch("./src/js/data.json");
  const data = await response.json();

  function colorOfBar(){
    const maxAmount= Math.max(...data.map((item)=>item.amount))
    return data.map(item=>{
      return item.amount==maxAmount?'hsl(186, 34%, 60%)':'hsl(10, 79%, 65%)'
    })
    
      
      
   }
  
  
  return new Chart(chartBox, {
    type: "bar",
    data: {
      labels: data.map((item) => item.day),
      datasets: [
        {
          backgroundColor: colorOfBar(),
          borderRadius: 5,
          borderSkipped: "middle",
          label: false,
          data: data.map((item) => item.amount),
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          yAlign: "bottom",
          displayColors: false,
          caretSize: 0,
          caretPadding: 5,

          callbacks: {
            title: () => "",
            label: function (context) {
              let label = context.parsed.y;
              return "$" + label;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          display: false,
        },

        x: {
          grid: {
            display: false,
            offset: false,
          },
        },
      },
    },
  });

  
}

feachJson();



