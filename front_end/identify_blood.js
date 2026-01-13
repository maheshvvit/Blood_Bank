const API_BASE_URL = 'http://localhost:3000/api';

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

export async function getMatchingDonors(bloodGroup) {
    const token = getAuthToken();
    if (!token) {
        alert("Please login first");
        window.location.href = "/Login.html";
        return [];
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students/blood-group/${bloodGroup}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch donors');
        }

        return data.data || [];
        
    } catch (error) {
        console.error('Error fetching donors:', error);
        alert(error.message || "Failed to fetch donors");
        return [];
    }
}