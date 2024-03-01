let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText = () =>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000);


//active menu////////////
let menuli = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuli.forEach(sec => sec.classList.remove("active"));
    menuli[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll",activeMenu);

//sticky navbar ////////////
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",this.window.scrollY > 50)
});



// JavaScript for toggling navigation menu icon between menu and "X"
const menuContainer = document.getElementById("menu-container");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const navList = document.querySelector("header .navlist");

menuContainer.addEventListener("click", function() {
    menuContainer.classList.toggle("rotate");
});

// Function to toggle navigation menu icon
menuIcon.addEventListener("click", function() {
    toggleNav();
});

closeIcon.addEventListener("click", function() {
    toggleNav();
});

// Function to toggle navigation menu and icons
function toggleNav() {
    navList.classList.toggle("active");
    menuIcon.style.display = menuIcon.style.display === "none" ? "block" : "none";
    closeIcon.style.display = closeIcon.style.display === "none" ? "block" : "none";
}

// Function to handle scroll event
function handleScroll() {
    const scrollPosition = window.scrollY;

    // Adjust behavior based on scroll position
    if (scrollPosition > 0) {
        // If scrolled, hide navigation list and show menu icon
        navList.classList.remove("active");
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
    }
}

// Add scroll event listener to window
window.addEventListener("scroll", handleScroll);
/////////////////////////////////////////////////////////////////



// Define the options for the IntersectionObserver
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0 
};

// Define the callback function for the IntersectionObserver
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    } else {
      entry.target.classList.remove('animated');
    }
  });
}

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(handleIntersection, options);

// Select all sections
const sections = document.querySelectorAll('section');

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});


  
  // Function to handle navigation link clicks and smooth scrolling
  function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1); // Get the target section ID
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Add event listener for navigation link clicks to trigger smooth scrolling
  const navLinks = document.querySelectorAll('.navlist a');
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  


// Function to set up slideshow
function setupSlideshow(images, slideshowClassName) {
  var slideshowImages = document.querySelectorAll("." + slideshowClassName);

  slideshowImages.forEach(function(image, index) {
    function nextSlide() {
      image.style.opacity = 0; // Fade out the image
      setTimeout(function() {
        index = (index + 1) % images.length; // Update the index
        image.src = images[index];
        image.style.opacity = 1; // Fade in the new image
      }, 1000); // Wait for 1 second before changing the image (half of the transition time)
    }

    // Call nextSlide every 3 seconds (adjust the interval as needed)
    setInterval(nextSlide, 3000);
  });
}

// Slideshow for project images
var projectImages = ["images/photos/BI-intro.png", "images/photos/PowerBI.png", "images/photos/BI-linechart.png", "images/photos/BI-piechart.png", "images/photos/UON-barchart.png", "images/photos/BI-conclu.png"];
setupSlideshow(projectImages, "bi-image");

// Slideshow for main images
var images = ["images/photos/UON-home.png", "images/photos/UON-tdl.png", "images/photos/UON-community.png", "images/photos/UON-foodcourt.png", "images/photos/UON-location.png", "images/photos/UON-admin.png", "images/photos/UON-cms.png"];
setupSlideshow(images, "uon-image");

var movieImages = ["images/photos/MovieRenting.png", "images/photos/mov-series.png", "images/photos/mov-cont.png", "images/photos/mov-terms.png"]
setupSlideshow(movieImages, "mov-img");




// Add event listener to the "Ok" button in the popup
document.getElementById("popup").querySelector("button").addEventListener("click", function() {
  showPopup(false, true); // Close the popup and reset the form
});

// Check if popup state is stored in localStorage on page load
window.addEventListener("load", function() {
  var popupShown = localStorage.getItem('popupShown');
  if (popupShown === 'true') {
    showPopup(true, false); // Show the popup without resetting the form
  }
});

// Function to show or hide the popup and optionally reset the form
function showPopup(bool, resetForm) {
  var popup = document.getElementById('popup');
  if (bool) {
    popup.style.visibility = 'visible';
    // Store popup state in localStorage
    localStorage.setItem('popupShown', 'true');
    // Delay closing the popup by 7 seconds
    setTimeout(function() {
      showPopup(false, resetForm); // Close the popup and optionally reset the form
      document.getElementById("contact-form").reset();
    }, 7000); // 7 seconds in milliseconds
  } else {
    popup.style.visibility = 'hidden';
    // Reset the form if requested
    if (resetForm) {
      document.getElementById("contact-form").reset();
    }
    // Clear popup state from localStorage
    localStorage.removeItem('popupShown');
  }
}

// Add event listener to the contact form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
  showPopup(true);
  // Prevent the default form submission

});









