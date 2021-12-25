/* 
aly4goku@gmail.com 
 */

//
const fragment = document.createDocumentFragment();

const navMenu = document.querySelector('#navbar__list');

// Get all elements with class section
const sections = document.querySelectorAll('section');

// Function to create <a>element</a> for every section with id & data-nav 
function createNav(id, name){
    const code = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return code;
};

//Calculate section size   
const place = function (section){

    return Math.floor(section.getBoundingClientRect().top);};


// Build the nav
function buildNav(){
//Loop to create sections as num of sections in HTML file
    for (let i=0; i < sections.length; i++){
        const newMenuItem = document.createElement('li');

        const sectionId = sections[i].getAttribute('id');

        const sectionName = sections[i].getAttribute('data-nav');

        newMenuItem.innerHTML = createNav(sectionId, sectionName);
       
//Add sections to fragment document
        fragment.appendChild(newMenuItem);
    }
//Add fragment document to ul in HTML file
    const navBarList = document.getElementById('navbar__list')

    navBarList.appendChild(fragment);
};

const addActive = function(conditional, section){
    if(conditional){
        section.classList.add('your-active-class');

//Create box shadow and border around active section 
        section.style.cssText = "box-shadow:20px 20px 40px 20px #6080a6; border:1px solid green; border-radius:75px";
        
//Active section id and -1 cuz childNodes is array start from 0
        const sectionId= section.id.slice(7,8) -1;
       
//Add background-color to active navigation 
        navMenu.childNodes[sectionId].style.cssText="background-color:rgb(254, 255, 130);";
    };
};
const removeActive = function (section){
    
    section.classList.remove('your-active-class');
    
//Remove box shadow from inactive section 
    section.style.cssText = "box-shadow:none; border:none; border-radius:none";
    const sectionId= section.id.slice(7,8) -1;
    
//Remove background-color from inactive navigation 
        navMenu.childNodes[sectionId].style.cssText="background-color:rgb(175, 168, 161);";

};

const sectionActivation = function(){
    for(section of sections) {
        const elementPlace = place(section);

        inViewport = () => elementPlace < 250 && elementPlace >= -250;

        removeActive(section);

        addActive(inViewport(), section);
    };
};

function scrollToElement(event){
    if(event.target.nodeName === 'A'){

        const sectionScroll = event.target.getAttribute('data-id');

        const section = document.getElementById(sectionScroll);

        section.scrollIntoView({behavior: "smooth"});
    }
}

navMenu.addEventListener('click', function(event){
    scrollToElement(event)
})

buildNav();

window.addEventListener('scroll', sectionActivation);
/* 
  aly4goku@gmail.com
   */