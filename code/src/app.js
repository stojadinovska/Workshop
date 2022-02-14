let peopleBtn = document.getElementById("peopleBtn");
let shipsBtn = document.getElementById("shipsBtn");
let table = document.getElementById("table");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let loader = document.getElementById("loader");
let numButtons = document.getElementById("numButtons");

let apiPeople = "https://swapi.dev/api/people/?page=1"
let apiShips = "https://swapi.dev/api/starships/?page=1"
let counter = 1;
let api;
let limit;

peopleBtn.addEventListener("click",() => 
{
    api = apiPeople;
    numButtons.innerHTML = "";
    table.innerHTML = "";
    counter = 1;
    getPeople();
    create();
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
    loader.style.display = "block";
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", previous);
});

shipsBtn.addEventListener("click", () => 
{
    api = apiShips;
    numButtons.innerHTML = "";
    table.innerHTML = "";
    counter = 1;
    getShips(apiShips);
    create()
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
    loader.style.display = "block";
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", previous);
});

function previous()
{
    loader.style.display = "block";
    counter -= 1
    api = api.replace(/.$/, counter)
    table.innerHTML = ""
    limit == 9? getPeople() : getShips();
    nextBtn.style.display = "block"
    if(counter == 1)prevBtn.style.display = "none"
}

function next()
{
    loader.style.display = "block";
    counter += 1;
    api = api.replace(/.$/, counter);
    table.innerHTML = "";
    limit == 9? getPeople() : getShips();
    prevBtn.style.display = "block";
    if(counter == limit)nextBtn.style.display = "none"
}

function create ()
{
    let button;
    limit = api == apiPeople? 9 : 4;

    for (let i=1; i<=limit; i++)
    {
        button = document.createElement("button");
        numButtons.appendChild(button);
        button.className += "btn btn-warning";
        button.innerText = i;
        button.addEventListener("click", () =>
        {
            loader.style.display = "block";
            counter = i;
            api = api.replace(/.$/, counter);
            table.innerHTML = "";
            limit == 9? getPeople() : getShips();
            prevBtn.style.display = "block";
            counter == limit? nextBtn.style.display = "none": nextBtn.style.display = "block";
            counter == 1? prevBtn.style.display = "none": prevBtn.style.display = "block";
        });
    };
};

function getPeople() 
{
    fetch(api)
    .then((response) => 
    {
        return response.json();
    })
    .then((people) => 
    {
        console.log("The request secceeded!")
        let firstRow = table.insertRow()
            firstRow.style.color = "yellow"
            firstRow.style.fontSize = "20px"
            firstRow.insertCell().innerText = `Name:`
            firstRow.insertCell().innerText = `Height:`
            firstRow.insertCell().innerText = `Mass:`
            firstRow.insertCell().innerText = `Gender:`
            firstRow.insertCell().innerText = `Birth Year:`
            firstRow.insertCell().innerText = `Appearances:`
        let displayPeople = people.results;
        for (let i = 0; i < displayPeople.length; i++)
        {
            let secondRow = table.insertRow()
                secondRow.insertCell().innerText = displayPeople[i].name
                secondRow.insertCell().innerText = displayPeople[i].height + "cm"
                secondRow.insertCell().innerText = displayPeople[i].mass + "kg"
                secondRow.insertCell().innerText = displayPeople[i].gender
                secondRow.insertCell().innerText = displayPeople[i].birth_year
                secondRow.insertCell().innerText = displayPeople[i].films.length
        }
        loader.style.display = "none"
    })
    .catch((err) => 
    {
        console.log("The request has failed!");
        console.log(err);
    })
}

function getShips() 
{
    fetch(api)
    .then((response) => 
    {
        return response.json();
    })
    .then((ships) => 
    {
        console.log("The request secceeded!")
        let firstRow = table.insertRow()
            firstRow.style.color = "yellow"
            firstRow.style.fontSize = "20px"
            firstRow.insertCell().innerText = `Name:`
            firstRow.insertCell().innerText = `Model:`
            firstRow.insertCell().innerText = `Manufacturer:`
            firstRow.insertCell().innerText = `Cost:`
            firstRow.insertCell().innerText = `People Capacity:`
            firstRow.insertCell().innerText = `Class:`
        let displayShips = ships.results;
        for (let i = 0; i < displayShips.length; i++)
        {
            let secondRow = table.insertRow()
                secondRow.insertCell().innerText = displayShips[i].name
                secondRow.insertCell().innerText = displayShips[i].model
                secondRow.insertCell().innerText = displayShips[i].manufacturer
                secondRow.insertCell().innerText = displayShips[i].cost_in_credits
                secondRow.insertCell().innerText = `${displayShips[i].crew} crew & ${displayShips[i].passengers} passengers`
                secondRow.insertCell().innerText = displayShips[i].starship_class
        }
        loader.style.display = "none"
    })
    .catch((err) => 
    {
        console.log("The request has failed!");
        console.log(err);
    })
}
