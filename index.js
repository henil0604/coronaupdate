dataResponse()
function dataResponse() {
    var progressbar = document.getElementById('progressbar')
    var status = document.getElementById('status')
    var statusVal = document.getElementById('statusVal')

    var xhr = new XMLHttpRequest();
    progressbar.style.width = "1%"
    statusVal.innerText = "Sending Request"
    console.log("Sending Request");

    xhr.open('GET', 'https://api.covid19api.com/summary', true);
    progressbar.style.width = "10%";
    statusVal.innerText = "Opening Files"
    console.log("Opening Files");

    //ON LOAD
    xhr.onload = function (element) {
        if (this.status === 200) {
            console.log(this.responseText);

            progressbar.style.width = "20%";
            statusVal.innerText = "Loading Data"
            console.log("Loading Data");
            // console.log(this.responseText);

            let json = JSON.parse(this.responseText)

            // console.log(json);

            let globalData = json.Global;
            let countryData = json.Countries;
            progressbar.style.width = "30%";
            statusVal.innerText = "Preparing JSON Data"
            console.log("Preparing JSON Data");

            if (globalData) {
                let globalDataDiv = document.getElementById('globalData')

                // console.log(globalData);

                let globalConfirmed = globalData.TotalConfirmed;
                let globalDeaths = globalData.TotalDeaths;
                let globalRecovered = globalData.TotalRecovered;
                let globalNewConfirmed = globalData.NewConfirmed;
                let globalNewDeaths = globalData.NewDeaths;
                let globalNewRecovered = globalData.NewRecovered;

                progressbar.style.width = "40%";
                statusVal.innerText = "Bringing Data for Global"
                console.log("Bringing Data for Global");

                let html = `
                    <div class="card text-white bg-warning  mb-3 my-5 " style="min-width: 20rem;">
                        <div class="card-header">
                            <h3 class="card-title">Global</h3>
                        </div>
                        <div class="card-body">
                            <p class="card-text" id="globalConfirmed"><strong>Confirmed:</strong> ${globalConfirmed}</p>
                            <p class="card-text" id="globalDeaths"><strong>Deaths:</strong> ${globalDeaths}</p>
                            <p class="card-text" id="globalRecovered"><strong>Recovered:</strong> ${globalRecovered}</p>
                            <p class="card-text" id="globalNewConfirmed"><strong>New Confirmed:</strong> ${globalNewConfirmed}</p>
                            <p class="card-text" id="globalNewDeaths"><strong>New Deaths:</strong> ${globalNewDeaths}</p>
                            <p class="card-text" id="globalNewRecovered"><strong>New Recovered:</strong> ${globalNewRecovered}</p>
                        </div>
                    </div>
                `;

                globalDataDiv.innerHTML += html
                progressbar.style.width = "50%";
                statusVal.innerText = "Global Dat Puted"
                console.log("Global Data Puted");

            }

            countryData.forEach(function (element, index) {
                // console.log(element);
                let countryDataDiv = document.getElementById('countryData')


                let countryName = element.Country
                let countryConfirmed = element.TotalConfirmed
                let countryDeaths = element.TotalDeaths
                let countryRecovered = element.TotalRecovered
                let countryNewConfirmed = element.NewConfirmed
                let countryNewDeaths = element.NewDeaths
                let countryNewRecovered = element.NewRecovered
                let countryDate = element.Date
                let cardColor;
                if (countryConfirmed < 30000) {
                    cardColor = "success"
                }
                else if (countryConfirmed < 180000) {
                    cardColor = "warning"
                }
                else {
                    cardColor = "danger"
                }
                progressbar.style.width = "65%";
                statusVal.innerText = "Preparing Data fro Countries"
                console.log("Preparing Data for Countries");

                let countryHtml = `
                    <div class="card text-white bg-${cardColor} mb-3 my-2 mx-2" style="min-width: 20rem; max-width: 20rem;">
                        <div class="card-header">
                            <h3 class="card-title">${countryName}</h3>
                        </div>
                        <div class="card-body">
                            <p class="card-text" id="countryConfirmed"><strong>Confirmed:</strong> ${countryConfirmed}</p>
                            <p class="card-text" id="countryDeaths"><strong>Deaths:</strong> ${countryDeaths}</p>
                            <p class="card-text" id="countryRecovered"><strong>Recovered:</strong> ${countryRecovered}</p>
                            <p class="card-text" id="countryNewConfirmed"><strong>New Confirmed:</strong> ${countryNewConfirmed}</p>
                            <p class="card-text" id="countryNewDeaths"><strong>New Deaths:</strong> ${countryNewDeaths}</p>
                            <p class="card-text" id="countryNewRecovered"><strong>New Recovered:</strong> ${countryNewRecovered}</p>
                        </div>
                    </div>
                `

                countryDataDiv.innerHTML += countryHtml
                progressbar.style.width = "80%";
                statusVal.innerText = "Country Data Puted"
                console.log("Country Data Puted");

                xhr.send()
                progressbar.style.width = "90%";
                statusVal.innerText = "Preparing Cards"
                console.log("Preparing Cards");

                progressbar.style.width = "100%";
                statusVal.innerText = "Done"
                console.log("Done");

                setTimeout(() => {
                    document.getElementById('progressbardiv').innerHTML = ""
                    document.getElementById('status').innerHTML = ""
                }, 1000);
            })

        }
        else {
            document.getElementById('progressbardiv').innerHTML = ""
            statusVal.innerText = "Connection Failed! Try Again..."
        }
    }

}


window.addEventListener('error', function () {
    console.log("error")
})
