/**
 * (Begin) Global Variables 
 * 
 * */

    // ENV Variable
    // Personal API Key for OpenWeatherMap API
    const apiKey = "8c7ddf3770b4a5f183f3b5cb06ad45a7";

    // inputs
    const zipInput     = querySelector("#zip");
    const contentInput = querySelector("#feelings");
    const button       = querySelector("#generate");

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = ( d.getMonth() + 1 )+'.'+ d.getDate()+'.'+ d.getFullYear();
    
    // Handle Errors
    let errors = []; // fieldName: string <field name>, error: string <error message>
    let RequestStatus = 200;

/**
 * (End) Global Variables 
 * (Begin) Helper Functions 
 * 
 * */
    function querySelector(selector, invoke="") {

        if( invoke.toLowerCase() === "all" ) {
            return document.querySelectorAll(selector);
            
        }

        return document.querySelector(selector);
    }


    function checkValidation({ zip, content }) {
        errors = []
        if(!zip.trim()) {
            errors.push({fieldName: "zip", error: "Zip code is required"});
            

        }else if(!Number(zip) || (zip.length !== 5 && Number(zip))) {
            errors.push({fieldName: "zip", error: "Invalid Zip Code"});

        }

        if(!content.trim()) {
            errors.push({fieldName: "feelings", error: "Feelings is Required"});

        }

        renderErrors();
    }

    function renderErrors() {
        const holders = querySelector('.error', "all");

        holders.forEach(holder => {
            const errorcontainer = holder.querySelector("#errorMessage");
            holder.classList.remove("error");
            errorcontainer.textContent = ""
        });

        errors.forEach((err, i) => {
            const {fieldName, error} = err;
            const holder = querySelector(`#${ fieldName }`).parentElement;
            const errorcontainer = holder.querySelector("#errorMessage");

            if(i === 0) {
                querySelector(`#${ fieldName }`).focus()
            }

            if( !holder.classList.contains("error") ){
                holder.classList.add("error");
                errorcontainer.textContent = error
            }
        })
    }

    
/**
 * (End) Helper Functions 
 * (Begin) Main Functions
 * 
 * */
    async function getTemp(zipCode) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${ zipCode }&appid=${ apiKey }&units=imperial`) //94040
        
        try {
            RequestStatus = response.status;
            const parsedData = await response.json();

            return parsedData.main.temp;
        }catch(error) {
            querySelector(".entry .title").style.display = "flex";
            querySelector(".entry #entryHolder").style.display = "none";
            console.log(error);
        }
    }

    async function postData(url, body) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        try {
            const parsedData = await response.json();
            return parsedData;

        }catch(error) {
            console.log(error);
        }
    }


    const retrieveData = async () => {
        const response = await fetch("/all");

        if(RequestStatus !== 200) {
            console.log("Please check the zip code and try again!");
            return;
        }
        
        try {
            const allData = await response.json();
            const { date, temp, content } = allData.projectData;

            querySelector(".entry .title").style.display = "none";
            querySelector(".entry #entryHolder").style.display = "block";
            
            querySelector("#date").innerHTML    = `🗓 ${ date.split(".").join("-") }`;
            querySelector("#temp").innerHTML    = `🌡 ${ temp } degrees`;
            querySelector("#content").innerHTML = `&nbsp;♥ ${ content }`;
        }catch(error) {
            console.log(error);
        }
    }

    function handleSubmit() {
        const zip     = zipInput.value; // required, number
        const content = contentInput.value; // required
        const date    = newDate;
        
        button.innerHTML = '<div class="loader"></div>';
        button.setAttribute("disabled", "true");

        checkValidation({ zip, content });
        
        if(errors.length) {
            
            button.removeAttribute("disabled");
            button.innerHTML = 'Generate ⚙';
            return;
        }


        getTemp(zip).then( temp => {
            postData("/add", { content, date, temp } );

            retrieveData();
            button.innerHTML = 'Generate ⚙';
            button.removeAttribute("disabled");
            zipInput.value = "";
            contentInput.value = "";
        });
    }

/**
 * (End) Main Functions 
 * (Begin) Invokation
 * 
 * */

    // Handle form submit
    button.addEventListener( "click", handleSubmit );
