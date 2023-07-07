document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#page-container').style.display = 'none';
    
    fetch("/jobs")
    .then(response => response.json())
    .then(jobs =>{
        console.log(jobs);
        jobs = jobs.jobs;
        jobs.forEach(createExperienceDiv);
    })

    document.querySelector('#nametag').addEventListener('click', ()=>{
        document.querySelector('#openpage').className = 'fades';
        document.querySelector('#openpage').addEventListener('animationend',()=>{
            document.querySelector('#page-container').style.display = 'block';
            document.querySelector('#page-container').className = 'fadein';
            document.querySelector('#openpage').style.display = 'none';
        })
    })



    document.querySelector('#sub-heading').addEventListener('animationend',()=>{
        const info = document.querySelectorAll(".info p");
        statement(info, 0);
        
    })
    
/*     let countEx = 0;
    let countSk = 0;
 */
   /*  const div1Lists = document.querySelectorAll('#div1');
    console.log(div1Lists);
    
    for(let i = 1; i < div1Lists.length; i++){
        const lists = div1Lists[i].querySelectorAll('p');
        console.log(lists);
        for(let j = 0; j < lists.length; j++){
            console.log(countEx);
            
            //lists[j].style.color = 'rgb(68, 65, 65)';
           
            window.addEventListener('scroll', ()=>{
                countEx++;
                if(countEx <= lists.length){
                console.log('scroll');
                //lists[j].style.color = 'white';
                lists[j].className = 'typed';
                lists[j].addEventListener('animationend', ()=>{
                    lists[j].className="";
                })
            }
            })
            
        }
        
    } */
    

    /* const div2Lists = document.querySelectorAll('#div2');
    console.log(div2Lists);
    for(let i = 1; i < div2Lists.length; i++){
        const lists = div2Lists[i].querySelectorAll('li');
        console.log(lists);
        for(let j = 0; j < lists.length; j++){
            //lists[j].style.color = 'white';
            
            lists[j].addEventListener('mouseover', ()=>{
                if(countSk < lists.length){
                //lists[j].style.color = 'black';
                lists[j].className = 'typed';
                lists[j].addEventListener('animationend', ()=>{
                    countSk++;
                    
                })
                }
            })
        }
    } */

    let experienceDiv = document.querySelector('.experience');
    let jobs = experienceDiv.querySelectorAll('div');
    jobs.forEach(add_modal);

    let customise = true;
    try{
    document.querySelector("#customize-btn").addEventListener('click', ()=>{
            let options = document.querySelectorAll(".edit")
            console.log(options)
            options.forEach(toggleCustomOptions);
            if (customise === true){
                customise = false;
                document.querySelector("#customize-btn").className = "btn btn-primary";
                document.querySelector("#customize-btn").innerHTML = "Customize"
            }
            else{
                customise = true;
                document.querySelector("#customize-btn").className = "btn btn-light";
                document.querySelector("#customize-btn").innerHTML = "View Page";

            }
        
        })
    }
    catch(error){
        console.log("Not admin");
    }
    
    fetch("custom/all")
    .then(response => response.json())
    .then(divs =>{
        console.log(divs)
        
        for(let i = 0; i < divs[0].length; i++){
            try{
            document.querySelector(`#${divs[0][i].name}font`).innerHTML = divs[0][i].font;
            document.querySelector(`#${divs[0][i].name}fontcolour`).innerHTML = divs[0][i].fontcolour;
            document.querySelector(`#${divs[0][i].name}backgroundcolour`).innerHTML = divs[0][i].backgroundcolour;
            document.querySelector(`#${divs[0][i].name}alignment`).innerHTML = divs[0][i].align;
            if(divs[0][i].name === "statement" || divs[0][i].name === "experience"){
                if(divs[0][i].textstyle === null){
                    continue;
                }
                else{
                document.querySelector(`#${divs[0][i].name}textstyle`).innerHTML = divs[0][i].textstyle;
                }
            }
    
            }
            catch(error){
                console.log("Not admin");
            }
            document.querySelector(`#${divs[0][i].name}`).style.background = divs[0][i].backgroundcolour;
            document.querySelector(`#${divs[0][i].name}`).style.textAlign = divs[0][i].align;

            let div;
            if(i === 0){
                div = document.querySelectorAll(`#${divs[0][i].name} div`);
            }
            else{
                div = document.querySelectorAll(`#${divs[0][i].name}`);
            }
            div.forEach((customise) =>{
                customise.style.color = divs[0][i].fontcolour;
                customise.style.fontFamily = divs[0][i].font;
                customise.style.background = divs[0][i].backgroundcolour;
                if(divs[0][i].name == 'statement'){
                    if(divs[0][i].textstyle === "list"){
                    makeList(divs[0][i].name, document.querySelector(`#${divs[0][i].name}div p`))
                }
                }

                if(divs[0][i].name == 'experience'){
                    let models = document.querySelectorAll('.modal');
                    console.log({"message": models})
                    models.forEach((model)=>{
                        model.style.color = message.backgroundcolour;
                        model.style.background = message.fontcolour;
                    })    
                    let exdivs = document.querySelectorAll(".experience-div");
                    console.log(exdivs);
                    exdivs.forEach((exdiv)=>{
                        exdiv.addEventListener('mouseover', ()=>{
                            exdiv.style.background = divs[0][i].fontcolour;
                            exdiv.style.color= divs[0][i].backgroundcolour;
                        })
                        exdiv.addEventListener('mouseout', ()=>{
                            exdiv.style.background = divs[0][i].backgroundcolour;
                            exdiv.style.color= divs[0][i].fontcolour;
                        })
                    })
                }
    
            })
    
        }
    })
    
    try{
    document.querySelector("#headedit button").addEventListener('click',()=>{
        fetch("custom/head", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
              },
            body: JSON.stringify({  
              font: document.querySelector("#headedit #font").value,
              fontcolour:  document.querySelector("#headedit #fontcolour").value,
              backgroundcolour:  document.querySelector("#headedit #backgroundcolour").value,
              alignment:  document.querySelector("#headedit #alignment").value

            })
        })
        .then(response => response.json())
        .then(message =>{
            console.log(document.querySelectorAll(".headinge"))
            document.querySelector(".headinge").style.background = message.backgroundcolour;
            document.querySelector(".headinge").style.textAlign = message.alignment;

            let div = document.querySelectorAll(".headinge div");
            div.forEach((customise) =>{
                customise.style.color = message.fontcolour;
                customise.style.fontFamily = message.font;
                customise.style.background = message.backgroundcolour;
                
            })

        })
    })

    document.querySelector("#statementedit button").addEventListener('click',()=>{
        fetch("custom/statement", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
              },
            body: JSON.stringify({  
              font: document.querySelector("#statementedit #font").value,
              fontcolour:  document.querySelector("#statementedit #fontcolour").value,
              backgroundcolour:  document.querySelector("#statementedit #backgroundcolour").value,
              alignment:  document.querySelector("#statementedit #alignment").value,
              textstyle:  document.querySelector("#statementedit #textstyle").value


            })
        })
        .then(response => response.json())
        .then(message =>{
            console.log(document.querySelectorAll("#statement"))
            document.querySelector("#statement").style.background = message.backgroundcolour;
            document.querySelector("#statement").style.textAlign = message.alignment;

            let div = document.querySelector("#statement");
            //div.forEach((customise) =>{
                div.style.color = message.fontcolour;
                div.style.fontFamily = message.font;
                div.style.background = message.backgroundcolour;
                if(message.textstyle === "list"){
                    makeList("statement", div.querySelector("p"));
                }
                else{
                    let text = document.createElement("p")
                    text.innerHTML = message.text;
                    div.querySelector("#statementdiv").innerHTML = "";
                    div.querySelector("#statementdiv").append(text);
                }
                
            //})

        })
    })
    
    document.querySelector("#employmenthistoryedit button").addEventListener('click',()=>{
        fetch("custom/employmenthistory", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
              },
            body: JSON.stringify({  
              font: document.querySelector("#employmenthistoryedit #font").value,
              fontcolour:  document.querySelector("#employmenthistoryedit #fontcolour").value,
              backgroundcolour:  document.querySelector("#employmenthistoryedit #backgroundcolour").value,
              alignment:  document.querySelector("#employmenthistoryedit #alignment").value

            })
        })
        .then(response => response.json())
        .then(message =>{
            console.log(document.querySelectorAll("#employmenthistory"))
            document.querySelector("#employmenthistory").style.background = message.backgroundcolour;
            document.querySelector("#employmenthistory").style.textAlign = message.alignment;

            let div = document.querySelector("#employmenthistory");
            //div.forEach((customise) =>{
                div.style.color = message.fontcolour;
                div.style.fontFamily = message.font;
                div.style.background = message.backgroundcolour;
                
            //})

        })
    })
    document.querySelector("#experienceedit button").addEventListener('click',()=>{
        fetch("custom/experience", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
              },
            body: JSON.stringify({  
              font: document.querySelector("#experienceedit #font").value,
              fontcolour:  document.querySelector("#experienceedit #fontcolour").value,
              backgroundcolour:  document.querySelector("#experienceedit #backgroundcolour").value,
              alignment:  document.querySelector("#experienceedit #alignment").value,
              textstyle:  document.querySelector("#experienceedit #textstyle").value

            })
        })
        .then(response => response.json())
        .then(message =>{
            console.log(document.querySelectorAll("#experience"))
            document.querySelector("#experience").style.background = message.backgroundcolour;

            let div = document.querySelector("#experience");
            //div.forEach((customise) =>{
                div.style.color = message.fontcolour;
                div.style.fontFamily = message.font;
                div.style.background = message.backgroundcolour;

                let exdivs = document.querySelectorAll(".experience-div");
                console.log(exdivs);
                exdivs.forEach((exdiv)=>{
                    exdiv.style.background = "";
                    exdiv.style.color= message.fontcolour;

                    exdiv.addEventListener('mouseover', ()=>{
                        exdiv.style.background = message.fontcolour;
                        exdiv.style.color= message.backgroundcolour;
                    })
                    exdiv.addEventListener('mouseout', ()=>{
                        exdiv.style.background = "";
                        exdiv.style.color= message.fontcolour;
                    })
                })

        })
    })

    document.querySelector("#educationedit button").addEventListener('click',()=>{
        fetch("custom/education", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
              },
            body: JSON.stringify({  
              font: document.querySelector("#educationedit #font").value,
              fontcolour:  document.querySelector("#educationedit #fontcolour").value,
              backgroundcolour:  document.querySelector("#educationedit #backgroundcolour").value,
              alignment:  document.querySelector("#educationedit #alignment").value

            })
        })
        .then(response => response.json())
        .then(message =>{
            console.log(document.querySelectorAll("#education"))
            document.querySelector("#education").style.background = message.backgroundcolour;
            document.querySelector("#education").style.textAlign = message.alignment;

            let div = document.querySelector("#education");
            //div.forEach((customise) =>{
                div.style.color = message.fontcolour;
                div.style.fontFamily = message.font;
                div.style.background = message.backgroundcolour;
                
            //})

        })
    })
}
catch(error){
    console.log("Not logged in");
}

/* try{
    document.querySelector("#statementeditbtn").addEventListener('click', ()=>{
        let statementtext = document.querySelector("#statementdiv").innerHTML;
        let textarea = document.createElement('textarea');
        textarea.innerHTML = statementtext;
        document.querySelector("#statementdiv").innerHTML = "";
        document.querySelector("#statementdiv").append(textarea);
        document.querySelector("#statementeditbtn").style.display = 'none';
        let savebtn = document.createElement('button');
        savebtn.innerHTML = "Save";
        savebtn.className = 'btn btn-primary';
        document.querySelector("#statement").append(savebtn);
        document.querySelector("#customize-btn").disabled = true;

        savebtn.addEventListener('click', ()=>{
            fetch("edit/statement", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                  },
                body: JSON.stringify({  

                    text: textarea.value
                })
            })
            .then(response => response.json())
            .then(message =>{
                console.log(message)
                
                document.querySelector("#statementdiv").innerHTML = message.text;
                savebtn.remove();
                document.querySelector("#statementeditbtn").style.display = 'block';
                document.querySelector("#customize-btn").disabled = false;
    
            })
        })

    })
}
catch(error){
    console.log("Not logged in")
} */

    function add_modal(divs){
        divs.addEventListener('click',()=>{
            modal();
        })
    }

    function statement(array, i){
        if (i === (array.length)){
            return 0;
        }
        else{
            //array[i].style.color = 'black';
            //array[i].className = 'info fadein';
            array[i].addEventListener('animationend', ()=>{
            array[i].className="";
            i++;
            statement(array, i);
        })
    }
}

function toggleCustomOptions(option){
    if (customise === true){
        option.style.display = "none"
    }
    else{
        option.style.display = "flex" ;
        
    }

}

function modal(job){

    let existingModal = document.querySelector('.modal');
    if (existingModal) {
    existingModal.remove();
    }

    // Create the modal elements
    let modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade';

    let modalDialogDiv = document.createElement('div');
    modalDialogDiv.classList.add('modal-dialog');
    //modalDialogDiv.classList.add('modal-dialog-centered');
    modalDialogDiv.classList.add('modal-dialog-scrollable');
    modalDialogDiv.style.width = "70%";
    //let modalContentDiv = document.createElement('div');
    //modalContentDiv.classList.add('modal-content');
    let jobTitle = document.createElement('h2');
    jobTitle.innerHTML = job.fulljob;
    modalDiv.style.textAlign = 'center';

    let timeWorked = document.createElement('h3');

    let endDate = job.enddate ? `${job.enddate.slice(0, 4)}` : "Present";
    
    let start_month = getMonthName(job.startdate.slice(5, 7));
    if(endDate != "Present"){
        let end_month = getMonthName(job.enddate.slice(5, 7))
        timeWorked.innerHTML = `${start_month} ${job.startdate.slice(0, 4)} - ${end_month} ${endDate}`;
    }
    else{
        timeWorked.innerHTML = `${start_month} ${job.startdate.slice(0, 4)} - ${endDate}`;
    }

    let btn = document.createElement('btn');
    btn.className = 'btn-close';
    btn.addEventListener('click',()=>{
        modalView.hide();
    })
    btn.style.float ='right';

    let resp = document.createElement('p');
    resp.innerHTML = job.responsibilities;
    resp.id = "resp"
    modalDiv.id = `modaldiv${job.id}`;
    modalDiv.append(btn,jobTitle, timeWorked);

    fetch("custom/all")
    .then(response => response.json())
    .then(message => {
        console.log(message);
        document.querySelector(`#modaldiv${job.id}`).style.background = message[0][3].backgroundcolour;
        document.querySelector(`#modaldiv${job.id}`).style.color = message[0][3].fontcolour;
        document.querySelector(`#modaldiv${job.id}`).style.fontFamily = message[0][3].font;
        document.querySelector(`#modaldiv${job.id}`).style.textAlign = message[0][3].align;
        
        if(message[0][3].textstyle === "list"){
            makeList(`modaldiv${job.id}`, resp);
        }
        else{
            resp.innerHTML = job.responsibilities;
        }
        
    
    })

    modalDiv.append(resp);

    // Append modalContentDiv to modalDialogDiv
    //modalDialogDiv.appendChild(modalContentDiv);

    // Append modalDialogDiv to modalDiv
    modalDiv.appendChild(modalDialogDiv);

    // Append modalDiv to the document body
    document.querySelector('#page-container').appendChild(modalDiv);


    // Create a new instance of Bootstrap Modal
    

    var modalView = new bootstrap.Modal(modalDiv);
    modalView.show();

}
    

    function createExperienceDiv(job){
        let div = document.createElement('div');
        div.id = job.id;
        div.className = 'experience-div';
        let jobtitle = document.createElement('p');
        jobtitle.innerHTML = job.fulljob
        let timeWorked = document.createElement('p');
        
        let endDate = job.enddate ? job.enddate.slice(0, 4) : "Present";
        
        let start_month = getMonthName(job.startdate.slice(5, 7));
        if(endDate != "Present"){
            let end_month = getMonthName(job.enddate.slice(5, 7))
            timeWorked.innerHTML = `${start_month} ${job.startdate.slice(0, 4)} - ${end_month} ${endDate}`;
        }
        else{
            timeWorked.innerHTML = `${start_month} ${job.startdate.slice(0, 4)} - ${endDate}`;
        }

        div.append(jobtitle, timeWorked); 
        div.addEventListener('click',()=>{
            fetch("/jobs",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                  },
                  body: JSON.stringify({
                    id: div.id
                })
            })
            .then(response => response.json())
              .then(job => {
                console.log(job);
                modal(job.job)
            })
        })
        document.querySelector('.experience').append(div);
    }

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        //using the visitor's default locale
        return date.toLocaleString([], {
          month: 'long',
        });
      }

     function makeList(section, text){
        let count = 0;
        //len = paragraph.innerHTML.length;
        //document.querySelector(`#${section}div p`).innerHTML = "";
        for(let i = 0; i < text.innerHTML.length; i++)
        {
            if(text.innerHTML[i] === ".")
            {
                
                let lis = document.createElement('li');
                
                for(let j = count; j <= i; j++)
                {
                    
                    lis.append(text.innerHTML[j]);

                }
                if(section === "statement"){
                document.querySelector(`#${section}div`).append(lis);
                }
                else{
                    document.querySelector(`#${section}`).append(lis);
                }
                count = i + 1;
                
            }

     }
     if(section == "statement"){
        document.querySelector(`#${section}div p`).innerHTML = "";
    }
    else{
        document.querySelector(`#${section} p`).innerHTML = "";

    }

    }
});