 
       // Store all issues for filtering
        let allIssues = [];
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Store all issues from the table
            const issueRows = document.querySelectorAll('#issuesTableBody tr');
            allIssues = Array.from(issueRows);
            
            // Set up event listeners for filters
            document.getElementById('categoryFilter').addEventListener('change', applyFilters);
            document.getElementById('locationFilter').addEventListener('change', applyFilters);
            document.getElementById('statusFilter').addEventListener('change', applyFilters);
            document.getElementById('priorityFilter').addEventListener('change', applyFilters);
            document.getElementById('searchInput').addEventListener('input', applyFilters);
            
            // Mobile menu toggle
            document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
                const headerNav = document.querySelector('.header-nav');
                headerNav.classList.toggle('mobile-open');
                
                // Change icon
                const icon = this.querySelector('i');
                if (headerNav.classList.contains('mobile-open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Function to refresh data
        function refreshData() {
            const refreshBtn = document.querySelector('.refresh-btn');
            const originalHTML = refreshBtn.innerHTML;
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
            refreshBtn.disabled = true;
            
            // Simulate data refresh
            setTimeout(() => {
                refreshBtn.innerHTML = originalHTML;
                refreshBtn.disabled = false;
                
                // Show notification
                showNotification('Data refreshed successfully!', 'success');
            }, 1500);
        }

        // Function to refresh messages
        function refreshMessages() {
            const refreshBtn = document.querySelector('.communication-section .action-btn.btn-secondary');
            const originalHTML = refreshBtn.innerHTML;
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
            refreshBtn.disabled = true;
            
            // Simulate message refresh
            setTimeout(() => {
                refreshBtn.innerHTML = originalHTML;
                refreshBtn.disabled = false;
                
                // Add a sample new message
                const messageList = document.getElementById('messageList');
                const newMessage = document.createElement('div');
                newMessage.className = 'message-item';
                newMessage.innerHTML = `
                    <div class="message-header">
                        <span class="message-sender">System</span>
                        <span class="message-time">Just now</span>
                    </div>
                    <div class="message-content">
                        Messages refreshed. No new messages.
                    </div>
                `;
                messageList.prepend(newMessage);
                
                // Show notification
                showNotification('Messages refreshed!', 'success');
            }, 1000);
        }

        // Function to send a message
        function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const messageText = messageInput.value.trim();
            
            if (messageText === '') {
                showNotification('Please enter a message', 'error');
                return;
            }
            
            const messageList = document.getElementById('messageList');
            const newMessage = document.createElement('div');
            newMessage.className = 'message-item';
            newMessage.innerHTML = `
                <div class="message-header">
                    <span class="message-sender">You</span>
                    <span class="message-time">Just now</span>
                </div>
                <div class="message-content">${messageText}</div>
            `;
            
            messageList.prepend(newMessage);
            messageInput.value = '';
            
            // Scroll to top to see the new message
            messageList.scrollTop = 0;
            
            // Show notification
            showNotification('Message sent!', 'success');
        }

        // Function to apply filters
        function applyFilters() {
            const categoryValue = document.getElementById('categoryFilter').value.toLowerCase();
            const locationValue = document.getElementById('locationFilter').value.toLowerCase();
            const statusValue = document.getElementById('statusFilter').value.toLowerCase();
            const priorityValue = document.getElementById('priorityFilter').value.toLowerCase();
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            
            const tableBody = document.getElementById('issuesTableBody');
            let visibleCount = 0;
            
            // Clear the table
            tableBody.innerHTML = '';
            
            // Filter issues and add matching ones to the table
            allIssues.forEach(issue => {
                const category = issue.getAttribute('data-category');
                const location = issue.getAttribute('data-location');
                const status = issue.getAttribute('data-status');
                const priority = issue.getAttribute('data-priority');
                const title = issue.cells[1].textContent.toLowerCase();
                const id = issue.cells[0].textContent.toLowerCase();
                
                const categoryMatch = !categoryValue || category.includes(categoryValue);
                const locationMatch = !locationValue || location.includes(locationValue);
                const statusMatch = !statusValue || status.includes(statusValue);
                const priorityMatch = !priorityValue || priority.includes(priorityValue);
                const searchMatch = !searchValue || 
                                  title.includes(searchValue) || 
                                  id.includes(searchValue);
                
                if (categoryMatch && locationMatch && statusMatch && priorityMatch && searchMatch) {
                    tableBody.appendChild(issue.cloneNode(true));
                    visibleCount++;
                }
            });
            
            // Show notification
            showNotification(`Filters applied! ${visibleCount} issues found.`, 'success');
        }

        // Function to clear filters
        function clearFilters() {
            document.getElementById('categoryFilter').value = '';
            document.getElementById('locationFilter').value = '';
            document.getElementById('statusFilter').value = '';
            document.getElementById('priorityFilter').value = '';
            document.getElementById('searchInput').value = '';
            
            // Restore all issues to the table
            const tableBody = document.getElementById('issuesTableBody');
            tableBody.innerHTML = '';
            allIssues.forEach(issue => {
                tableBody.appendChild(issue.cloneNode(true));
            });
            
            // Show notification
            showNotification('Filters cleared!', 'success');
        }

        // Function to view details
        function viewDetails(issueId) {
            showNotification(`Viewing details for issue #${issueId}`, 'info');
            // In a real application, this would open a modal or navigate to a details page
        }

        // Function to show notification
        function showNotification(message, type) {
            // Remove any existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => {
                notification.remove();
            });
            
            // Create notification element
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.classList.add('notification', type);
            
            // Add to page
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease-in-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Allow sending message with Enter key
        document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
   