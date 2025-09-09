
       let currentData = {
            status: 'acknowledged',
            department: 'public-works',
            priority: 'medium',
            notes: ''
        };

        // Map variables
        let map;
        let marker;

        // Function to calculate deadline based on priority
        function calculateDeadline(priority) {
            const now = new Date();
            const daysToAdd = {
                'low': 3,
                'medium': 2,
                'high': 1,
                'urgent': 0
            };
            
            // Add days based on priority
            const deadline = new Date(now);
            deadline.setDate(deadline.getDate() + daysToAdd[priority]);
            
            // Format the date for display
            const options = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            
            return deadline.toLocaleDateString('en-US', options);
        }

        // Function to update deadline display
        function updateDeadlineDisplay() {
            const priority = document.getElementById('prioritySelect').value;
            const deadlineText = calculateDeadline(priority);
            document.getElementById('deadlineText').textContent = deadlineText;
        }

        // Initialize and add the map
        function initMap() {
           
            const mapElement = document.getElementById('map');
            mapElement.innerHTML = '';
            
            // The location of Ranchi, NH-33 near sector 5
            const ranchiLocation = [23.3441, 85.3096];
            
            // Initialize the map
            map = L.map('map').setView(ranchiLocation, 15);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(map);
            
            // Add custom marker icon
            const customIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            
            // Add marker to the map
            marker = L.marker(ranchiLocation, {icon: customIcon}).addTo(map);
            
            // Add popup to the marker
            marker.bindPopup(`
                <div style="line-height: 1.5;">
                    <strong>Pothole Report #12345</strong><br>
                    Ranchi, NH-33 near sector 5<br>
                    <em>Large pothole causing traffic jam</em>
                </div>
            `).openPopup();
            
            // Add some styling to the map controls
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }

        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize deadline display
            updateDeadlineDisplay();
            
            // Initialize map
            setTimeout(initMap, 100);
        });

        // Open fullscreen map
        function openFullscreenMap() {
            const url = `https://www.openstreetmap.org/?mlat=23.3441&mlon=85.3096#map=15/23.3441/85.3096`;
            window.open(url, '_blank');
        }

        // Get directions
        function getDirections() {
            const url = `https://www.google.com/maps/dir/?api=1&destination=23.3441,85.3096&travelmode=driving`;
            window.open(url, '_blank');
        }

        // Show confirmation modal
        function showConfirmationModal() {
            document.getElementById('confirmationModal').classList.add('active');
        }

        // Hide confirmation modal
        function hideConfirmationModal() {
            document.getElementById('confirmationModal').classList.remove('active');
        }

        // Close report function - REDIRECTS TO DASHBOARD
        function closeReport() {
            // Hide modal before redirect
            hideConfirmationModal();

            // Show notification
            showNotification('Report closed. Redirecting to dashboard...', 'info');
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
               
               showNotification('Redirected to dashboard (simulated)', 'success');
                
                window.location.href = 'index.html';
            }, 1000);
        }

        // Update status with visual feedback
        function updateStatus() {
            const select = document.getElementById('statusSelect');
            const value = select.value;
            currentData.status = value;
            
            // Remove all status classes
            select.classList.remove('status-acknowledged', 'status-in-progress', 'status-resolved', 'status-pending', 'status-rejected');
            
            // Add appropriate class
            select.classList.add(`status-${value}`);
            
            showNotification('Status updated to ' + value, 'info');
            
            // Add to history
            addHistoryItem('Status changed to "' + value + '"', 'By Current User');
        }

        // Update department
        function updateDepartment() {
            const select = document.getElementById('departmentSelect');
            currentData.department = select.value;
            showNotification('Department updated to ' + select.options[select.selectedIndex].text, 'info');
            
            // Add to history
            addHistoryItem('Assigned to ' + select.options[select.selectedIndex].text, 'By Current User');
        }

        // Update priority with visual feedback
        function updatePriority() {
            const select = document.getElementById('prioritySelect');
            const value = select.value;
            currentData.priority = value;
            
            // Remove all priority classes
            select.classList.remove('priority-low', 'priority-medium', 'priority-high', 'priority-urgent');
            
            // Add appropriate class
            select.classList.add(`priority-${value}`);
            
            // Update deadline based on priority
            updateDeadlineDisplay();
            
            showNotification('Priority updated to ' + value, 'info');
            
            // Add to history
            addHistoryItem('Priority changed to "' + value + '"', 'By Current User');
        }

        // Save notes
        function saveNotes() {
            const textarea = document.getElementById('internalNotes');
            currentData.notes = textarea.value;
            
            // Auto-save functionality
            clearTimeout(window.notesTimeout);
            window.notesTimeout = setTimeout(() => {
                if (currentData.notes.trim()) {
                    showNotification('Notes saved', 'info');
                }
            }, 1000);
        }

        // Update report status - main action
        function updateReportStatus() {
            const button = document.querySelector('.action-button.primary');
            
            // Show loading state
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                button.innerHTML = originalText;
                button.disabled = false;
                
                // Show success message
                showNotification('Report updated successfully!', 'success');
                
                // Log the data that would be sent to server
                console.log('Report data updated:', {
                    reportId: '12345',
                    ...currentData,
                    timestamp: new Date().toISOString()
                });
                
                // Add to history
                addHistoryItem('Report updated', 'Changes saved by Current User');
            }, 1500);
        }

        // Add item to history
        function addHistoryItem(action, details) {
            const historySection = document.querySelector('.history-section');
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-icon">
                    <i class="fas fa-edit"></i>
                </div>
                <div class="history-content">
                    <div class="history-action">${action}</div>
                    <div class="history-details">${details}</div>
                    <div class="history-time">Just now</div>
                </div>
            `;
            
            historySection.appendChild(historyItem);
        }

        // Utility function to show notifications
        function showNotification(message, type = 'info') {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            let icon = 'fa-info-circle';
            if (type === 'success') icon = 'fa-check-circle';
            if (type === 'error') icon = 'fa-exclamation-circle';
            
            toast.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            // Trigger reflow
            void toast.offsetWidth;
            
            // Show toast
            toast.classList.add('show');
            
            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toastContainer.removeChild(toast);
                }, 300);
            }, 3000);
        }

        // Open photo modal
        function openPhotoModal(imageUrl) {
            const modal = document.getElementById('photoModal');
            const modalImage = document.getElementById('modalImage');
            
            modalImage.src = imageUrl;
            modal.classList.add('active');
            
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        // Close photo modal
        function closePhotoModal() {
            const modal = document.getElementById('photoModal');
            modal.classList.remove('active');
            
            // Re-enable background scrolling
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside the image
        document.getElementById('photoModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closePhotoModal();
            }
        });

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial values
            document.getElementById('statusSelect').value = currentData.status;
            document.getElementById('departmentSelect').value = currentData.department;
            document.getElementById('prioritySelect').value = currentData.priority;
            
            // Add keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey || e.metaKey) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        updateReportStatus();
                    } else if (e.key === 's') {
                        e.preventDefault();
                        saveNotes();
                        showNotification('Notes saved', 'info');
                    }
                }
                
                if (e.key === 'Escape') {
                    showConfirmationModal();
                }
            });
            
            console.log('Report Details page initialized');
        });
    