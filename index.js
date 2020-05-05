dataResponse()
function dataResponse() {
    var progressbar = document.getElementById('progressbar')

    var xhr7 = new XMLHttpRequest();

    console.log("Sending Request...");

    xhr7.open('GET', 'https://api.covid19api.com/summary', true);

    //On Progress
    xhr7.onprogress = function onprogress() {
    }

    //ON LOAD

    xhr7.onload = function (element) {
        if (this.status === 200) {
            // console.log(this.responseText);

            let json = JSON.parse(this.responseText)

            // console.log(json);

            let globalData = json.Global;
            let countryData = json.Countries;

            if (globalData) {
                let globalDataDiv = document.getElementById('globalData')
                // console.log("Getting Data...");

                // console.log(globalData);

                let globalConfirmed = globalData.TotalConfirmed;
                let globalDeaths = globalData.TotalDeaths;
                let globalRecovered = globalData.TotalRecovered;
                let globalNewConfirmed = globalData.NewConfirmed;
                let globalNewDeaths = globalData.NewDeaths;
                let globalNewRecovered = globalData.NewRecovered;


                let html = `
                    <div class="card text-white bg-info  mb-3 my-5 " style="min-width: 20rem;">
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

                setTimeout(() => {
                    document.getElementById('progressbarDiv').innerHTML = ""
                }, 1000);
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

            })

        }
        else {

        }
    }
    xhr7.send()
}


window.addEventListener('error', function () {
    console.log("error")
})
