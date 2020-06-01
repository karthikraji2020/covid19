var URLS =[
  `https://api.covid19api.com/summary`,
  `https://api.covid19api.com/live/country/india/status/confirmed`
];
debugger;
getChartData();
var requestOptions = {
  method: "GET",
  redirect: "follow",
};


  async function getChartData() {
    const first = fetch(`${URLS[0]}`, requestOptions).catch((error) => console.log("error", error));
   const two = fetch(`${URLS[1]}`, requestOptions).catch((error) => console.log("error", error));
   const firstvalue = await first.json();
   debugger;
   const secondvalue = await two.json();
 }

fetch("https://api.covid19api.com/summary", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.table(result);
    setNames(result);
  })
  .catch((error) => console.log("error", error));

// for line chart

function renderTable(tableRowObject,i) {
  let tableRowData= `<tr>
 <td>  ${tableRowObject[i].Country}</td>
 <td>${tableRowObject[i].TotalConfirmed}</td>
 <td> 
 <div class="clearfix">
 <span class="float-left">
 ${tableRowObject[i].NewConfirmed}
 </span>
 <span class="float-right">
     <span class="fas fa-angle-double-up text-danger"></span>
 </span>
 </div> 
 </td>
 <td >
 <div class="clearfix">
 <span class="float-left">
 ${tableRowObject[i].TotalDeaths}
 </span>
 <span class="float-right">
     <span class="fas fa-angle-double-up text-danger"></span>
 </span>
 </div> 
 </td>
 <td >
 <div class="clearfix">
 <span class="float-left">
 ${tableRowObject[i].TotalRecovered}
 </span>
 <span class="float-right">
  <span class="fas fa-angle-double-up text-success"></span>
 </span>
 </div> 
 </td>
</tr>`;
return tableRowData;
}

fetch(
  "https://api.covid19api.com/live/country/india/status/confirmed",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.table(result);
    setLineChartData(result);
  })
  .catch((error) => console.log("error", error));
//

function filterData(countryName_copy, Text) {
  let filterText = Text.trim().toLowerCase();
  let country_names = document.querySelector(".country-names");
  let filterObjects = countryName_copy.Countries.filter(function (item) {
    let reData =
      item.Country.toLowerCase().includes(filterText) ||
      item.TotalConfirmed.toString() === filterText ||
      item.NewConfirmed.toString() === filterText ||
      item.TotalDeaths.toString() == filterText ||
      item.TotalRecovered.toString() == filterText;
    return reData;
  });
  country_names.innerHTML = "";

  for (let i = 0; i < filterObjects.length; i++) {
    country_names.innerHTML += renderTable(filterObjects,i);
  }

}


function nextSlot(num, countryName_copy) {
  // prestartingI=n-1
  // lI=n*10
  let prestartingI = num - 1;
  let lI = num * 10;
  let d1 = prestartingI + "0";
  let sI = parseInt(d1);
  let nextslot = countryName_copy.Countries.slice(sI, lI);
  country_names = document.querySelector(".country-names");
  country_names.innerHTML = "";
  for (let i = 0; i < nextslot.length; i++) {
    country_names.innerHTML += renderTable(nextslot,i);
  }

}
