const API_BASE_URL = 'http://localhost:3000/api';

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

let bloodChart, deptChart, yearChart;

export async function loadDashboard() {
    const token = getAuthToken();
    if (!token) {
        alert("Please login first");
        window.location.href = "/";
        return;
    }

    try {
        // Fetch dashboard statistics
        const statsResponse = await fetch(`${API_BASE_URL}/students/dashboard/stats`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const statsData = await statsResponse.json();

        if (!statsResponse.ok) {
            throw new Error(statsData.message || 'Failed to load dashboard stats');
        }

        // Fetch all students
        const studentsResponse = await fetch(`${API_BASE_URL}/students`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const studentsData = await studentsResponse.json();

        if (!studentsResponse.ok) {
            throw new Error(studentsData.message || 'Failed to load students');
        }

        // Store all students globally for search functionality
        window.allStudents = studentsData.data || [];
        document.getElementById("resultCount").textContent = window.allStudents.length;

        updateDashboardUI(statsData);
        window.displayStudentTable(studentsData.data || []);
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert(error.message || "Failed to load dashboard");
    }
}

function updateDashboardUI(data) {
    // Update total students
    const totalEl = document.getElementById("totalStudents");
    if (totalEl) {
        totalEl.textContent = data.total || 0;
    }

    // Update blood group chart
    updateBloodStats(data.bloodStats || []);
    
    // Update department chart
    updateDeptStats(data.deptStats || []);
    
    // Update year chart
    updateYearStats(data.yearStats || []);
}

function updateBloodStats(bloodStats) {
    const labels = bloodStats.map(item => item.s_blood_group);
    const data = bloodStats.map(item => item.count);

    const ctx = document.getElementById("bloodChart");
    if (!ctx) return;

    if (bloodChart) {
        bloodChart.destroy();
    }

    bloodChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Blood Group Count',
                data: data,
                backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
                    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function updateDeptStats(deptStats) {
    const labels = deptStats.map(item => item.s_deparment);
    const data = deptStats.map(item => item.count);

    const ctx = document.getElementById("deptChart");
    if (!ctx) return;

    if (deptChart) {
        deptChart.destroy();
    }

    deptChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Department Count',
                data: data,
                backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function updateYearStats(yearStats) {
    const labels = yearStats.map(item => `Year ${item.s_year}`);
    const data = yearStats.map(item => item.count);

    const ctx = document.getElementById("yearChart");
    if (!ctx) return;

    if (yearChart) {
        yearChart.destroy();
    }

    yearChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Year/Level Count',
                data: data,
                backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function updateStudentTable(students) {
    // Now handled by window.displayStudentTable in the HTML
    // This function kept for backward compatibility
    if (window.displayStudentTable) {
        window.displayStudentTable(students);
    }
}

// Initial load
loadDashboard();