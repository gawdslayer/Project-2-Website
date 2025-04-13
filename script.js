// This is a simple tip calculator that calculates the total amount to be paid including the tip based on the bill amount and tip percentage entered by the user.
const btnEl = document.getElementById("calculate");
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const totalspan = document.getElementById("total");

function calculateTotal() {
 const billvalue = billInput.value;
 const tipvalue = tipInput.value;
 const totalValue = billvalue * (1 + tipvalue / 100);
 totalspan.innerText = totalValue.toFixed(2);
}

btnEl.addEventListener("click", calculateTotal);

// Tip Calculator Functionality
function initializeTipCalculator() {
    const calculateBtn = document.getElementById('calculate');
    const billInput = document.getElementById('bill');
    const tipInput = document.getElementById('tip');
    const totalSpan = document.getElementById('total');

    calculateBtn.addEventListener('click', function() {
        const bill = parseFloat(billInput.value);
        const tip = parseFloat(tipInput.value);

        if (isNaN(bill) || isNaN(tip)) {
            alert('Please enter valid numbers for bill and tip');
            return;
        }

        const tipAmount = (bill * tip) / 100;
        const total = bill + tipAmount;
        totalSpan.textContent = `$${total.toFixed(2)}`;
    });
}

// Js for random Image generator
const imageContainerEl = document.querySelector(".image-container");
const btnImageEl = document.querySelector(".btn");
const imageWrapperEl = document.querySelector(".images-wrapper"); 

btnImageEl.addEventListener("click", () => {
    imageNum = 7;
    generateRandomImage(imageNum);
});

function generateRandomImage(imageNum) {
    for (let index = 0; index < imageNum; index++) {
        const newImageEl = document.createElement("img");
        newImageEl.src = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 2000)}`;
        imageWrapperEl.appendChild(newImageEl);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        generateRandomImage(5);
    }
});



// Random Image generator Functionality
function initializeRandomImageLoader() {
    const loadMoreBtn = document.querySelector('.image-container .btn');
    const imagesWrapper = document.querySelector('.images-wrapper');
    let currentImageCount = 7;

    loadMoreBtn.addEventListener('click', function() {
        for (let i = 0; i < 4; i++) {
            currentImageCount++;
            const img = document.createElement('img');
            img.src = `https://picsum.photos/200/300?random=${currentImageCount}`;
            img.alt = `Random Image ${currentImageCount}`;
            imagesWrapper.appendChild(img);
        }
    });
}

// Weather App Functionality
function initializeWeatherApp() {
    const weatherSearch = document.getElementById('search-weather');
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const date = document.getElementById('date');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');

    // Update date
    const today = new Date();
    date.textContent = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    weatherSearch.addEventListener('click', async function() {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4a57362ab28d26683e0fefa8740b9fe1`);
            const data = await response.json();

            if (data.cod === '404') {
                alert('City not found!');
                return;
            }

            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} m/s`;
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        }
    });
}

// Movie Search App Functionality
function initializeMovieSearchApp() {
    const movieSearch = document.getElementById('search-movie');
    const movieInput = document.getElementById('movie-input');
    const movieResults = document.getElementById('movie-results');

    movieSearch.addEventListener('click', async function() {
        const query = movieInput.value.trim();
        if (!query) return;

        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=6c4b5a9c`);
            const data = await response.json();

            if (data.Response === 'False') {
                movieResults.innerHTML = '<p>No movies found</p>';
                return;
            }

            movieResults.innerHTML = '';
            data.Search.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                movieCard.innerHTML = `
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}" alt="${movie.Title}">
                    <div class="movie-info">
                        <h4>${movie.Title}</h4>
                        <p>${movie.Year}</p>
                    </div>
                `;
                movieResults.appendChild(movieCard);
            });
        } catch (error) {
            console.error('Error fetching movie data:', error);
            alert('Error fetching movie data. Please try again.');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

// Dark Mode Toggle Functionality
function initializeDarkModeToggle() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);
}

function toggleTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
toggleSwitch.addEventListener('change', (e) => toggleTheme(e.target.checked));

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Theme Toggle
const themeSwitch = document.querySelector('#checkbox');
const body = document.body;

// Check saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    initializeTipCalculator();
    initializeRandomImageLoader();
    initializeWeatherApp();
    initializeMovieSearchApp();
    initializeSmoothScrolling();
    initializeDarkModeToggle();
});
