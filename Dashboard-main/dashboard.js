
       const issueDetails = {
            1024: {
                id: 1024,
                category: "Road",
                location: "Ranchi",
                reportedBy: "Amitabh",
                status: "Pending",
                description: "Large pothole on Main Road near Gandhi Chowk causing traffic issues and vehicle damage. The pothole is approximately 2 feet wide and 6 inches deep, making it dangerous for vehicles, especially during nighttime.",
                dateReported: "2023-10-15",
                image: "https://th-i.thgim.com/public/opinion/op-ed/wurhjx/article24436285.ece/alternates/FREE_1200/17THPOTHOLE",
                assignedTo: "Not assigned",
                priority: "High",
                address: "Main Road, Gandhi Chowk, Ranchi, Jharkhand"
            },
            1023: {
                id: 1023,
                category: "Water",
                location: "Dhanbad",
                reportedBy: "Sumita",
                status: "Resolved",
                description: "Water leakage from main pipeline in Sector 4 area for past 3 days. The leakage is causing water wastage and road damage in the area.",
                dateReported: "2023-10-14",
                image: "https://www.lianshing.com.sg/wp-content/uploads/2019/12/pipeline-leak-detection-lian-shing.jpg",
                assignedTo: "Water Dept. Team",
                priority: "Medium",
                address: "Sector 4, Dhanbad, Jharkhand",
                resolutionDate: "2023-10-16",
                resolutionNotes: "Pipeline joint replaced and area repaired."
            },
            1022: {
                id: 1022,
                category: "Garbage",
                location: "Jamshedpur",
                reportedBy: "Rajesh",
                status: "Reeling",
                description: "Garbage accumulation near Sakchi market causing unhygienic conditions and foul smell. The garbage has not been collected for over a week.",
                dateReported: "2023-10-13",
                image: "https://static.toiimg.com/thumb/msid-101472202,width-1280,height-720,resizemode-72/101472202.jpg",
                assignedTo: "Sanitation Team A",
                priority: "High",
                address: "Sakchi Market, Jamshedpur, Jharkhand"
            },
            1021: {
                id: 1021,
                category: "Electricity",
                location: "Deoghar",
                reportedBy: "Priya",
                status: "Resolved",
                description: "Power outage in Baidyanath Nagar area for more than 8 hours daily. The outage is affecting residential areas and local businesses.",
                dateReported: "2023-10-12",
                image: "https://hastingsutilities.ca/wp-content/uploads/2025/01/blown-transformer.webp",
                assignedTo: "Electrical Maintenance",
                priority: "Critical",
                address: "Baidyanath Nagar, Deoghar, Jharkhand",
                resolutionDate: "2023-10-14",
                resolutionNotes: "Transformer issue fixed and power restored."
            }
        };

       
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize map centered on Jharkhand, India
            const map = L.map('issueMap').setView([23.6345, 85.3803], 8);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Add markers for issue locations (using Jharkhand cities)
            const issueLocations = [
                { lat: 23.3441, lng: 85.3096, name: 'Ranchi', issue: 'Road Damage' },
                { lat: 23.7957, lng: 86.4304, name: 'Dhanbad', issue: 'Water Supply' },
                { lat: 22.8046, lng: 86.2029, name: 'Jamshedpur', issue: 'Garbage Accumulation' },
                { lat: 24.4820, lng: 86.6990, name: 'Deoghar', issue: 'Power Outage' },
                { lat: 23.7438, lng: 85.3616, name: 'Bokaro', issue: 'Sewage Problem' },
                { lat: 22.7196, lng: 85.3847, name: 'Chandil', issue: 'Road Repair' }
            ];
            
            // Custom icon for issues
            const issueIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            // Add markers to map
            issueLocations.forEach(location => {
                L.marker([location.lat, location.lng], { icon: issueIcon })
                    .addTo(map)
                    .bindPopup(`<b>${location.name}</b><br>${location.issue}`);
            });

            
            const statValues = document.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                stat.textContent = '0';
                
                let current = 0;
                const increment = finalValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        current = finalValue;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.round(current);
                }, 30);
            });

            // Animate bar charts
            setTimeout(() => {
                const barFills = document.querySelectorAll('.bar-fill');
                barFills.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }, 500);
        });

        // Mobile menu functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('overlay');
        
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
            document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Update active link on click
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelector('.sidebar-item.active').classList.remove('active');
                this.classList.add('active');
                
                // On mobile, close sidebar after selection
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('show');
                    overlay.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });

        // Search functionality
        document.querySelector('.search-bar').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('#issuesTable tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // Action button handlers
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const action = this.textContent;
                const row = this.closest('tr');
                const id = row.querySelector('td').textContent;
                
                if (action === 'Assign') {
                    alert(`Assigning issue #${id} to administrator...`);
                    this.textContent = 'Assigned';
                    this.classList.remove('btn-assign');
                    this.classList.add('btn-view');
                } else if (action === 'View') {
                    showIssueDetails(id);
                }
            });
        });

        // Table row click handler to show issue details
        document.querySelectorAll('#issuesTable tr').forEach(row => {
            row.addEventListener('click', function() {
                const issueId = this.getAttribute('data-id');
                showIssueDetails(issueId);
            });
        });

        
        const modal = document.getElementById('issueModal');
        const closeModalBtn = document.querySelector('.close-modal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const modalAssignBtn = document.getElementById('modalAssignBtn');
        
        // Close modal when clicking on close button
        closeModalBtn.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);
        
        // Close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Assign button in modal
        modalAssignBtn.addEventListener('click', function() {
            const issueId = this.getAttribute('data-id');
            alert(`Assigning issue #${issueId} to administrator...`);
            closeModal();
        });
        
        // Function to show issue details in modal
        function showIssueDetails(issueId) {
            const issue = issueDetails[issueId];
            if (!issue) return;
            
            const modalBody = document.getElementById('modalBody');
            
            // Create HTML for issue details
            modalBody.innerHTML = `
                <div class="issue-detail">
                    <div class="issue-detail-label">Issue ID</div>
                    <div class="issue-detail-value">${issue.id}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Category</div>
                    <div class="issue-detail-value">${issue.category}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Location</div>
                    <div class="issue-detail-value">${issue.location}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Address</div>
                    <div class="issue-detail-value">${issue.address || 'Not specified'}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Reported By</div>
                    <div class="issue-detail-value">${issue.reportedBy}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Date Reported</div>
                    <div class="issue-detail-value">${issue.dateReported}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Status</div>
                    <div class="issue-detail-value">
                        <span class="status-badge status-${issue.status.toLowerCase()}">${issue.status}</span>
                    </div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Priority</div>
                    <div class="issue-detail-value">${issue.priority}</div>
                </div>
                <div class="issue-detail">
                    <div class="issue-detail-label">Assigned To</div>
                    <div class="issue-detail-value">${issue.assignedTo}</div>
                </div>
                ${issue.resolutionDate ? `
                <div class="issue-detail">
                    <div class="issue-detail-label">Resolution Date</div>
                    <div class="issue-detail-value">${issue.resolutionDate}</div>
                </div>
                ` : ''}
                <div class="issue-detail">
                    <div class="issue-detail-label">Description</div>
                    <div class="issue-detail-value">${issue.description}</div>
                </div>
                ${issue.resolutionNotes ? `
                <div class="issue-detail">
                    <div class="issue-detail-label">Resolution Notes</div>
                    <div class="issue-detail-value">${issue.resolutionNotes}</div>
                </div>
                ` : ''}
                <div class="issue-detail">
                    <div class="issue-detail-label">Image</div>
                    ${issue.image ? `
                    <div class="issue-image-container">
                        <img src="${issue.image}" alt="Issue Image" class="issue-image">
                    </div>
                    ` : `
                    <div class="image-placeholder">No image available</div>
                    `}
                </div>
            `;
            
            // Set data attribute for assign button
            modalAssignBtn.setAttribute('data-id', issueId);
            
            // Show the modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        // Function to close modal
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        // Table sorting functionality
        document.querySelectorAll('th').forEach(header => {
            header.addEventListener('click', function() {
                const columnIndex = Array.prototype.indexOf.call(
                    this.parentElement.children, this
                );
                const table = this.closest('table');
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                const isAscending = this.classList.contains('asc');
                this.classList.toggle('asc', !isAscending);
                this.classList.toggle('desc', isAscending);
                
                rows.sort((a, b) => {
                    const aValue = a.children[columnIndex].textContent;
                    const bValue = b.children[columnIndex].textContent;
                    
                    const aNum = parseFloat(aValue);
                    const bNum = parseFloat(bValue);
                    
                    if (!isNaN(aNum) && !isNaN(bNum)) {
                        return isAscending ? aNum - bNum : bNum - aNum;
                    } else {
                        return isAscending 
                            ? aValue.localeCompare(bValue) 
                            : bValue.localeCompare(aValue);
                    }
                });
                
                // Remove existing rows
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }
                
                // Add sorted rows
                rows.forEach(row => tbody.appendChild(row));
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            // If screen size changes to larger than mobile, ensure sidebar is visible
            if (window.innerWidth > 768) {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
   