const API_BASE_URL = 'http://localhost:3000/api';

// Get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

export async function submitStudentRegistration() {
    const name = document.getElementById("s_name").value;
    const age = parseInt(document.getElementById("s_age").value, 10);
    const id = document.getElementById("s_id").value.trim();
    const email = document.getElementById("s_email").value;
    const phoneNo = document.getElementById("s_phone_no").value.trim();
    const department = document.getElementById("s_deparment").value;
    const year = parseInt(document.getElementById("s_year").value, 10);
    const bloodGroup = document.getElementById("s_blood_group").value;

    if (!email.includes("@gmail.com")) {
        alert("The Email is Invalid. Please enter a valid Gmail address.");
        console.error("The Email is Invalid. Please enter a valid Gmail address.");
        return;
    }

    if (!bloodGroup) {
        alert("Please select a blood group.");
        console.error("Please select a blood group.");
        return;
    }

    const token = getAuthToken();
    if (!token) {
        console.error("Please login first");
        window.location.href = "/Login.html";
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                s_name: name,
                s_age: age,
                s_id: id,
                s_email: email,
                s_phone_no: phoneNo,
                s_deparment: department,
                s_year: year,
                s_blood_group: bloodGroup
            })
        });

        const data = await response.json();

        if (!response.ok) {
            let errorMsg = data.message || 'Registration failed';
            if (data.errors && data.errors.length > 0) {
                errorMsg = data.errors.map(e => e.msg).join('\n');
            }
            throw new Error(errorMsg);
        }

        // Clear form
        document.getElementById("s_name").value = "";
        document.getElementById("s_age").value = "";
        document.getElementById("s_id").value = "";
        document.getElementById("s_email").value = "";
        document.getElementById("s_phone_no").value = "";
        document.getElementById("s_deparment").value = "";
        document.getElementById("s_year").value = "";
        document.getElementById("s_blood_group").value = "";
        document.getElementById("bloodGroupDropdown").innerHTML = '<i class="fas fa-caret-down"></i> Select Blood Group';
        
        alert("Success! Student registered successfully.");
        console.log(data.message || "Student registered successfully!");
        
        // Trigger dashboard update
        window.dispatchEvent(new Event("student-updated"));
        
    } catch (error) {
        console.error('Error registering student:', error);
        alert("Error: " + error.message);
    }
}