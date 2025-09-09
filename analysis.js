
        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize map centered on a default location
            const map = L.map('issueMap').setView([20.5937, 78.9629], 5); // Center on India
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Sample issue locations with different priorities
            const issueLocations = [
                { lat: 28.6139, lng: 77.2090, name: 'New Delhi', issue: 'Road Damage', priority: 'high' },
                { lat: 19.0760, lng: 72.8777, name: 'Mumbai', issue: 'Water Supply', priority: 'medium' },
                { lat: 13.0827, lng: 80.2707, name: 'Chennai', issue: 'Garbage Accumulation', priority: 'high' },
                { lat: 12.9716, lng: 77.5946, name: 'Bengaluru', issue: 'Power Outage', priority: 'medium' },
                { lat: 22.5726, lng: 88.3639, name: 'Kolkata', issue: 'Sewage Problem', priority: 'low' },
                { lat: 17.3850, lng: 78.4867, name: 'Hyderabad', issue: 'Road Repair', priority: 'medium' },
                { lat: 26.9124, lng: 75.7873, name: 'Jaipur', issue: 'Park Maintenance', priority: 'low' }
            ];
            
            // Create custom icons for different priority levels
            const highPriorityIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            const mediumPriorityIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            const lowPriorityIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            // Add markers to map based on priority
            issueLocations.forEach(location => {
                let icon;
                switch(location.priority) {
                    case 'high':
                        icon = highPriorityIcon;
                        break;
                    case 'medium':
                        icon = mediumPriorityIcon;
                        break;
                    case 'low':
                        icon = lowPriorityIcon;
                        break;
                    default:
                        icon = mediumPriorityIcon;
                }
                
                L.marker([location.lat, location.lng], { icon })
                    .addTo(map)
                    .bindPopup(`
                        <b>${location.name}</b><br>
                        ${location.issue}<br>
                        Priority: ${location.priority.charAt(0).toUpperCase() + location.priority.slice(1)}
                    `);
            });

            // Header scroll effect
            const header = document.querySelector('.header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navContainer = document.querySelector('.nav-container');
            
            mobileMenuBtn.addEventListener('click', function() {
                navContainer.classList.toggle('open');
                mobileMenuBtn.innerHTML = navContainer.classList.contains('open') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });

            // User dropdown toggle
            const userProfile = document.querySelector('.user-profile');
            userProfile.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('open');
            });

            // Close dropdown when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (!userProfile.contains(e.target)) {
                    userProfile.classList.remove('open');
                }
            });

            // Animate metric cards on page load
            const metricCards = document.querySelectorAll('.metric-card');
            metricCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            });

            // Category item click events
            const categoryItems = document.querySelectorAll('.category-item');
            categoryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const category = this.dataset.category;
                    alert(`Showing detailed report for ${category} category`);
                });
            });

            // Time filter change event
            const timeFilter = document.querySelector('.time-filter');
            timeFilter.addEventListener('change', function() {
                updateDashboardData(this.value);
            });

            // Navigation link active state management
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Close mobile menu after selection
                    if (window.innerWidth <= 768) {
                        navContainer.classList.remove('open');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });

            // Search functionality
            const searchInput = document.querySelector('.search-input');
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    alert(`Searching for: ${this.value}`);
                    this.value = '';
                }
            });

            // Add smooth scrolling for better UX
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // Animate progress bars on page load
            setTimeout(() => {
                const bars = document.querySelectorAll('.category-bar');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }, 500);
        });

        function updateDashboardData(timePeriod) {
            // Simulate data update based on time period
            const metrics = {
                'Last 7 Days': { total: 284, avgTime: '1.8 Days', pending: 42 },
                'Last 30 Days': { total: 1204, avgTime: '2.5 Days', pending: 187 },
                'Last 90 Days': { total: 3567, avgTime: '3.2 Days', pending: 298 },
                'Last Year': { total: 14250, avgTime: '2.8 Days', pending: 456 }
            };

            const data = metrics[timePeriod];
            if (data) {
                const metricValues = document.querySelectorAll('.metric-value');
                metricValues[0].textContent = data.total.toLocaleString();
                metricValues[1].textContent = data.avgTime;
                metricValues[2].textContent = data.pending.toLocaleString();

                // Add animation to show the update
                metricValues.forEach(value => {
                    value.style.transform = 'scale(1.1)';
                    value.style.color = '#1976d2';
                    setTimeout(() => {
                        value.style.transform = 'scale(1)';
                        value.style.color = '#2c3e50';
                    }, 300);
                });
            }
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .metric-card {
                animation: fadeInUp 0.6s ease forwards;
                animation-delay: 0.1s;
                opacity: 0;
            }

            .chart-card {
                animation: fadeInUp 0.8s ease forwards;
                animation-delay: 0.3s;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
   