// * Adding dynamic date to the footer
function currentYear () {
    return new Date().getFullYear();
}
document.getElementById('year').innerHTML = currentYear();

// * show/hide mobile nav
let toggleIcon = document.getElementById("icon");
let mobileNav = document.querySelector('.mobile-nav');

function toggleNav(){
    const style = mobileNav.style.display === "flex" ? "none" : "flex";
    mobileNav.style.display = style;
    toggleIcon.classList.toggle('bi-list');
    toggleIcon.classList.toggle('bi-x');
}

// * Switch between light & dark themes
let mobile = document.getElementById("themeIconMobile");
let desktop = document.getElementById("themeIconDesktop");
let allElements = document.getElementsByTagName("*");

// * The following 6 lines of code detect the user's device theme and adjusts accordingly
if (window.matchMedia('(prefers-color-scheme: dark)').matches){
    for (var i = 0; i < allElements.length; i++) {
            allElements[i].setAttribute('dark', true);
    }
} else {
    for (var i = 0; i < allElements.length; i++) {
            allElements[i].removeAttribute('dark');
    }
}

// * This function switches the theme manually using the the icons in the header
function switchTheme (userDevice) {
    const theme = userDevice.classList.contains('bi-moon') ? 'dark' : 'light';
    if (theme === 'dark') {
        // console.log('theme changed to dark')
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].setAttribute('dark', true);
        }
        userDevice.classList.toggle('bi-moon');
        userDevice.classList.toggle('bi-brightness-high');
    } else {
        // console.log('theme changed to light')
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].removeAttribute('dark');
        }   
        userDevice.classList.toggle('bi-moon');
        userDevice.classList.toggle('bi-brightness-high');
    }
}

// * Add box shadow to header and make scrollUp button visible when user scrolls 
window.onscroll = function() {
    whenUserScrolls();
};

function whenUserScrolls() {
  let header = document.getElementById("header");
  let button = document.getElementById("scroll");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add('shadow');
  } else {
    header.classList.remove('shadow');
  }

  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
  }
}

// * scroll to Top when page loads or when user clicks the scroll up button
function scrollToTop() { 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// window.onload = () => {
//     scrollToTop();
// }


// ! Swiper Image Slider
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  // mousewheel: true,
	// keyboard: true,
});

// TODO Email.js integration
const name = document.querySelector('input');
const email = document.getElementById('email');
const message = document.getElementById('message');
const feedback = document.getElementById('feedback');

// Function to display feedback message
function sendFeedback(type, message) {
  feedback.innerHTML = message;
  feedback.style.color = type === 'success' ? 'green' : 'red';
  feedback.style.display = 'block';
  setTimeout(() => {
    feedback.style.display = 'none';
  }, 2000);
}

// clear contact form after a message is sent
function clearForm() {
  name.value = '';
  email.value = '';
  message.value = '';
}


// Function to send email
function sendEmail() {
  if (name.value !== '' && email.value !== '' && message.value !== '') {
    let params = {
      senderName: name.value,
      senderEmail: email.value,
      message: message.value
    };
    emailjs.send('default_service', 'template_2omp1ye', params)
      .then(function(response) {
        //  console.log('SUCCESS!', response.text);
        clearForm();
        sendFeedback('success', ' <i class="bi bi-check2-circle"></i> Thank you for sending a message, will be in contact shortly!')
      }, function(error) {
        //  console.log('Failed to send message...', error);
         sendFeedback('error', ' <i class="bi bi-envelope-exclamation"></i> Failed to send message, try again later!');
      });
  } else {
    sendFeedback('error', 'Please fill all fields correctly then send message!');
  }
}