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


    //document.querySelector("#experience-button").addEventListener('click', ()=>{
        //TODO
    //})

    document.querySelector('#sub-heading').addEventListener('animationend',()=>{
        const info = document.querySelectorAll(".info p");
        statement(info, 0);
        
    })
    
    let countEx = 0;
    let countSk = 0;

    const div1Lists = document.querySelectorAll('#div1');
    console.log(div1Lists);
    
    for(let i = 1; i < div1Lists.length; i++){
        const lists = div1Lists[i].querySelectorAll('p');
        console.log(lists);
        for(let j = 0; j < lists.length; j++){
            console.log(countEx);
            
            lists[j].style.color = 'rgb(68, 65, 65)';
           
            window.addEventListener('scroll', ()=>{
                countEx++;
                if(countEx <= lists.length){
                console.log('scroll');
                lists[j].style.color = 'white';
                lists[j].className = 'typed';
                lists[j].addEventListener('animationend', ()=>{
                    lists[j].className="";
                })
            }
            })
            
        }
        
    }
    

    const div2Lists = document.querySelectorAll('#div2');
    console.log(div2Lists);
    for(let i = 1; i < div2Lists.length; i++){
        const lists = div2Lists[i].querySelectorAll('li');
        console.log(lists);
        for(let j = 0; j < lists.length; j++){
            lists[j].style.color = 'white';
            
            lists[j].addEventListener('mouseover', ()=>{
                if(countSk < lists.length){
                lists[j].style.color = 'black';
                lists[j].className = 'typed';
                lists[j].addEventListener('animationend', ()=>{
                    countSk++;
                    
                })
                }
            })
        }
    }

    let experienceDiv = document.querySelector('.experience');
    let jobs = experienceDiv.querySelectorAll('div');
    jobs.forEach(add_modal);


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
            array[i].style.color = 'black';
            array[i].className = 'info fadein';
            array[i].addEventListener('animationend', ()=>{
            array[i].className="";
            i++;
            statement(array, i);
        })
    }
}

function modal(job){
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



    let resp = document.createElement('h5');
    resp.innerHTML = job.responsibilities;
    modalDiv.append(jobTitle, timeWorked);
    modalDiv.append(resp);


    // Append modalContentDiv to modalDialogDiv
    //modalDialogDiv.appendChild(modalContentDiv);

    // Append modalDialogDiv to modalDiv
    modalDiv.appendChild(modalDialogDiv);

    // Append modalDiv to the document body
    document.querySelector('#page-container').appendChild(modalDiv);


    // Create a new instance of Bootstrap Modal
    let modal = new bootstrap.Modal(modalDiv);

    modal.show();
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

      function scrollToDiv(targetDiv) {
        document.querySelector(targetDiv).scrollIntoView({
            behavior: 'smooth'
        });
    }
});