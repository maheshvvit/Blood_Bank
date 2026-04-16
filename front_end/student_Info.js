const API_BASE_URL = '/api';

function getAuthToken() {
    return localStorage.getItem('authToken');
}

export async function addStudentInfo(s_name, s_age, s_id, s_email, s_phone_no, s_deparment, s_year, s_blood_group) {
    const token = getAuthToken();
    if (!token) {
        alert('Please login first');
        window.location.href = '/';
        return;
    }

    const student = {
        s_name,
        s_age,
        s_id,
        s_email,
        s_phone_no,
        s_deparment,
        s_year,
        s_blood_group
    };

    const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Registration failed' }));
        throw new Error(error.message || 'Registration failed');
    }

    const result = await response.json();
    console.log('Student added:', result.data || result.student);

    await fetchStudentData();
    window.dispatchEvent(new Event('student-updated'));
    return result.data || result.student;
}

// Fetch student list from backend
export async function fetchStudentData() {
    const token = getAuthToken();
    if (!token) {
        alert('Please login first');
        window.location.href = '/';
        return [];
    }

    const response = await fetch(`${API_BASE_URL}/students`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to load student data');
    }
    const students = await response.json();
    console.log('Fetched students:', students);
    return students.data || students;
}
